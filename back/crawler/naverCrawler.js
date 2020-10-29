const puppeteer = require("puppeteer");
let db = require("../config/db_config");
const CRAWL_PAGES = 1;
const NO_SEARCH_DATA = 2;
const SUCCESS = 1;
const FAILURE = 0;

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

const pageDown = async (page) => {
  const scrollHeight = "document.body.scrollHeight";
  let previousHeight = await page.evaluate(scrollHeight);
  await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
  await delay(1000);
  try{
    console.log(scrollHeight, previousHeight);
    //한번에 맨 밑으로 내려갔을때, 무한 스크롤에 한번 걸리는 경우가 없을때
    //에러가 생기는데, 음
    await page.waitForFunction(`${scrollHeight} > ${previousHeight}`, {
      timeout: 2000,
    });
}catch(error){
  console.error(error);
}
};

const naverCrawler = async (searchTitle, linkId) => {
  let start = await new Date().getTime();

  const browser = await puppeteer.launch({ headless: false });
  await browser.userAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
  );
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    "accept-charset": "euc-kr", //한글 깨지는 문제를 해결해보려고 charset을 바꿔봤는데 해결안됨
  });
  //이미지,폰트,스타일시트 로딩 블락, 속도향상
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (
      request.resourceType() === "image" ||
      request.resourceType() === "font"
      // request.resourceType() === "stylesheet"
    )
      request.abort();
    else request.continue();
  });

  //시간제한 없애기
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    `https://search.shopping.naver.com/search/all?frm=NVSHATC&origQuery=top&pagingIndex=1&pagingSize=40&productSet=total&query=${searchTitle}&sort=rel&timestamp=&viewType=list
    `,
    { waitUntil: "networkidle2" }
  );
  //맨 밑으로 스크롤링
  await pageDown(page);

  //검색결과가 없다면 2 리턴

  const isSearchResult = await page.$eval(
    `#__next > div > div:nth-child(2) > div > div:nth-child(3) > div`,
    (element) => {
      return element.childNodes.length;
  });
  console.log(isSearchResult);
  
  if (isSearchResult != 1) {
    //검색결과가 있을 때 수행해야 하는 `부분
    //전체 상품갯수
    const totalProducts = await page.evaluate(() => {
      return document
        .querySelector(`.seller_filter_area li span`)
        .innerText.replace(/,/gi, "");
    });
    //페이지당 상품 갯수
    const productsPerPages = await page.evaluate(() => {
      return document.querySelectorAll(`.list_basis > div > div`).length;
    });
    //총 페이지 수
    const totalPages = Math.floor(+totalProducts / productsPerPages);
    console.log(productsPerPages);
    console.log(totalProducts);
    console.log(totalPages);
  } else {
    console.log("검색 결과가 없어요");
    
    await page.close(); // 페이지 닫기
    await browser.close(); // 브라우저 닫기
    return NO_SEARCH_DATA;
  }

  await page.close(); // 페이지 닫기
  await browser.close(); // 브라우저 닫기

  //둘의 결과가 너무 다른데,, 검색결과 0이라는 것도 없고
  //힌트가,,
};

module.exports = naverCrawler;
