const puppeteer = require("puppeteer");
const pageSet = require("../config/pageSetting");
const coupangUtils = require("../utils/coupangUtils");
const coupangQuery = require("../query/coupangQuery");
let db = require("../config/db_config");

const CRAWL_PAGES = 1;
const NO_SEARCH_DATA = 2;
const SUCCESS = 1;
const FAILURE = 0;
const LIST_SIZE = 72;

const coupangCrawler = async (searchText, linkId) => {
  let start = await new Date().getTime();

  const browser = await puppeteer.launch({ headless: true });
  await browser.userAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
  );

  const page = await browser.newPage();
  process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
    browser.close();
  });
  await pageSet.pageInit(page);
  await page.goto(
    `https://www.coupang.com/np/search?q=${searchText}&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=${LIST_SIZE}&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=1&rocketAll=false&searchIndexingToken=1=4&backgroundColor=`,
    //page로 넘기면 검색가능
    { waitUntil: "networkidle2" }
  );
  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
  async function infiniteScroll(page) {
    let previousHeight = await page.evaluate(`document.body.scrollHeight`);
    let currentScroll = 0;
    while (currentScroll <= previousHeight) {
      currentScroll += 150;
      previousHeight = await page.evaluate(`document.body.scrollHeight`);
      await page.evaluate(`window.scrollTo(0, ${currentScroll})`);
    }
    return 1;
  }
  await infiniteScroll(page);
  // let lastPageNumber;
  const searchRange = await coupangUtils.getSearchRange(page);
  let totalProducts = searchRange.totalProducts;
  //페이지수를 늘렸을 때 사용될 변수 : 전체 페이지 수
  let lastPageNumber = searchRange.lastPageNumber;


  //crawling part start//
  let productData = [];

  try {
    //특정 페이지 수 만큼 크롤링해오기 현재 : 1
    for (let pageNumber = 1; pageNumber <= 1; pageNumber++) {
      if (pageNumber != 1) {
        //CRAWL_PAGES만큼 페이지 이동
        await page.goto(
          `https://www.coupang.com/np/search?q=${searchText}&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=72&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=${pageNumber}&rocketAll=false&searchIndexingToken=1=4&backgroundColor=`,
          { waitUntil: "networkidle0" }
        );
      }

      await coupangUtils.removeAd(page);
      //페이지당 상품 갯수 => 페이지당 광고를 삭제하고나서 해당 페이지에 존재하는 상품갯수
      let productAmountPerPage = await page.evaluate(() => {
        return document.querySelectorAll(`#productList li`).length;
      });
      productData = await coupangUtils.getProductData(page, productAmountPerPage);
    }
  } catch (error) {
    console.error(error);
  }

  await page.close(); // 페이지 닫기
  await browser.close(); // 브라우저 닫기

  console.log("쿠팡크롤러 time :" + (await new Date().getTime() - start) / 1000);

  if (coupangQuery.dataInsert(productData, linkId) == FAILURE) {
    return FAILURE;
  }
  return SUCCESS;
};

module.exports = coupangCrawler;
