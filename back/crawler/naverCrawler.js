const puppeteer = require("puppeteer");
const pageSet = require("../config/pageSetting");
const naverQuery = require("../query/naverQuery");
const naverUtils = require("../utils/naverUtils");

let db = require("../config/db_config");
const CRAWL_PAGES = 1;
const NO_SEARCH_DATA = 2;
const LIST_SIZE = 40;
const SUCCESS = 1;
const FAILURE = 0;

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function infiniteScroll(page) {
  let previousHeight = await page.evaluate(`document.body.scrollHeight`);
  let currentScroll = 0;
  while (currentScroll <= previousHeight) {
    currentScroll += 50;
    previousHeight = await page.evaluate(`document.body.scrollHeight`);
    await page.evaluate(`window.scrollTo(0, ${currentScroll})`);
    delay(200);
  }
  return 1;
}

const naverCrawler = async (searchText, linkId) => {
  let start = await new Date().getTime();
  let productData = [];

  const browser = await puppeteer.launch({
    headless: true,
  });
  await browser.userAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
  );

  const page = await browser.newPage();
  await pageSet.pageInit(page, LIST_SIZE);

  await page.goto(
    `https://search.shopping.naver.com/search/all?frm=NVSHATC&origQuery=top&pagingIndex=1&pagingSize=40&productSet=total&query=${searchText}&sort=rel&timestamp=&viewType=list
    `,
    { waitUntil: "networkidle2" }
  );

  const scrollResult = await infiniteScroll(page);

  try {
    const isSearchResult = await page.$eval(`#powerlink-div`, (element) => {
      return element.childNodes.length;
    });

    if (isSearchResult && isSearchResult != 0) {
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

      let lastPageNumber = CRAWL_PAGES;

      //전체페이지가 크롤링할 페이지 수 보다 적을경우 검색페이지를 최대 페이지만큼 하도록 지정
      if (totalPages - CRAWL_PAGES < 0) lastPageNumber = totalPages;

      for (let pageNumber = 1; pageNumber <= lastPageNumber; pageNumber++) {
        if (pageNumber != 1) {
          await page.goto(
            `https://search.shopping.naver.com/search/all?frm=NVSHATC&origQuery=%EB%AC%BC&pagingIndex=${pageNumber}&pagingSize=40&productSet=total&query=%EB%AC%BC&sort=rel&timestamp=&viewType=list`,
            //page로 넘기면 검색가능
            { waitUntil: "networkidle2" }
          );
          //페이지 맨 밑 스크롤
        }
        //광고 지우기
        await naverUtils.removeAd(page, LIST_SIZE);

        //광고 제거 후 페이지당 품목 갯수
        let productAmountPerPage = await page.evaluate(() => {
          return document.querySelectorAll(`.list_basis > div > div`).length;
        });
        productData = await naverUtils.getProductData(
          page,
          productAmountPerPage
        );
      }
    } else {
      console.log("검색 결과가 없어요");
      await page.close(); // 페이지 닫기
      await browser.close(); // 브라우저 닫기
      return NO_SEARCH_DATA;
    }
  } catch (error) {
    console.error(error);
  }

  if (naverQuery.dataInsert(productData, linkId) == FAILURE) {
    await page.close(); // 페이지 닫기
    await browser.close(); // 브라우저 닫기
    return FAILURE;
  }

  try {
    //페이지 탐색 완료시
    await page.close(); // 페이지 닫기
    await browser.close(); // 브라우저 닫기
  } catch (error) {
    console.error(error);
  }
  console.log(
    "네이버 크롤러 time :" + ((await new Date().getTime()) - start) / 1000
  );
  return SUCCESS;
};

module.exports = naverCrawler;
