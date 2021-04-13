const puppeteer = require("puppeteer");
let db = require("../config/db_config");
const pageSet = require("../config/pageSetting");
const ssgUtils = require("../utils/ssgUtils");
const ssgQuery = require("../query/ssgQuery");

const CRAWL_PAGES = 1;
const NO_SEARCH_DATA = 2;
const SUCCESS = 1;
const FAILURE = 0;

//품목기반으로 검색한 크롤링을 해야하는데,
//크롤링에 인자전달하는 방법
//db에서 select한 결과를 갖고 크롤링을 해야할듯
const ssgCrawler = async (searchText, linkId) => {
  let start = await new Date().getTime();
  //배포시 headless true로 설정해야함.
  //에러핸들링 추가해야함., 블록스코프에 맞춰서
  const browser = await puppeteer.launch({ headless: true });
  await browser.userAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
  );
  const page = await browser.newPage();
  await pageSet.pageInit(page);

  //동시에 여러 페이지 newPage로 띄워서  promise.all로 각각 페이지를 모듈로 나눠서 크롤링실행해야겠다.
  await page.goto(
    `http://www.ssg.com/search.ssg?target=all&query=${searchText}&page=1`,
    { waitUntil: "networkidle2" }
  );

  const ulContentSelector = `#divProductImg > #idProductImg li`;

  const productAmountPerPage = await page.evaluate((SELECTOR) => {
    //page당 아이템 갯수 출력 80개
    return document.querySelectorAll(SELECTOR).length;
  }, ulContentSelector);
  if (productAmountPerPage <= 0) {
    //li 태그의 길이가 없다 == 검색결과 없을때 크롤링종료
    console.log("ssg_ li length is zero");
    await page.close(); // 페이지 닫기
    await browser.close(); // 브라우저 닫기
    return NO_SEARCH_DATA; // 검색결과 없을때
  }

  let productData = [];
  let lastPageNumber = await ssgUtils.getLastPageNumber(
    page,
    browser,
    productAmountPerPage
  );
  console.log(productAmountPerPage);
  //페이지가 10개이상일때 last버튼 찾도록 지정

  if (lastPageNumber >= 10) {
    lastPageNumber = await page.$eval(`.btn_last`, (element) => {
      //btn Last가 없을수도있구나.
      return element.getAttribute("data-filter-value").split("=")[1];
    });
  }

  try {
    //첫페이지 ~ 3페이지까지 크롤링
    for (let pageNumber = 1; pageNumber <= CRAWL_PAGES; pageNumber++) {
      if (pageNumber != 1) {
        await page.goto(
          `http://www.ssg.com/search.ssg?target=all&query=${searchText}&page=${pageNumber}`,
          { waitUntil: "networkidle2" }
        );
      }
      productData = await ssgUtils.getProductData(page, productAmountPerPage);
    }
  } catch (error) {
    if (error) console.error(error);
  }

  console.log(
    "쓱 크롤러 걸린시간 : " + ((await new Date().getTime()) - start) / 1000
  );

  await page.close(); // 페이지 닫기
  await browser.close(); // 브라우저 닫기
  if (ssgQuery.dataInsert(productData, linkId) === SUCCESS) {
    return SUCCESS;
  }
  return FAILURE;
};

module.exports = ssgCrawler;
