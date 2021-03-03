const puppeteer = require("puppeteer");
const pageSet = require("./pageSetting");
let db = require("../config/db_config");

const CRAWL_PAGES = 1;
const NO_SEARCH_DATA = 2;
const SUCCESS = 1;
const FAILURE = 0;
const LIST_SIZE = 72;

//페이지당 광고 삭제
const removeAd = async (page) => {
  for (let i = 0; i < LIST_SIZE; i++) {
    await page.evaluate(() => {
      let badge = document.querySelector(".search-product__ad-badge");
      if (badge) badge.remove();
    });
  }
};

//전체 상품갯수, 전체 페이지 숫자 구하기
const getSearchRange = async (page) => {
  let totalProducts = 0;
  let lastPageNumber = 0;
  try {
    totalProducts = await page.$eval(
      `
    #searchOptionForm > div.search-header strong`,
      (element) => {
        return element.innerText
          .slice(1, element.innerText.length - 1)
          .replace(/,/gi, "");
      }
    );

    lastPageNumber = Math.ceil(totalProducts / LIST_SIZE);
    if (+totalProducts === 0) {
      //검색결과가 없음
      console.log("검색결과가 없습니다.");
      await page.close(); // 페이지 닫기
      await browser.close(); // 브라우저 닫기
      return {
        totalProducts: NO_SEARCH_DATA,
        lastPageNumber: NO_SEARCH_DATA,
      };
    }
  } catch (error) {
    console.error(error);
  }
  return {
    totalProducts: totalProducts,
    lastPageNumber: lastPageNumber,
  };
};

const coupangCrawler = async (searchText, linkId) => {
  let start = await new Date().getTime();

  const browser = await puppeteer.launch({ headless: false });
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

  // let lastPageNumber;
  const searchRange = await getSearchRange(page);
  let totalProducts = searchRange.totalProducts;
  let lastPageNumber = searchRange.lastPageNumber;

  if (lastPageNumber >= 10) {
    //page가 10개 이상일 때 마지막 페이지 수를 구하기 위함.
    await page.waitForSelector("div.search-pagination a.btn-last.disabled");
    lastPageNumber = await page.$eval(
      "div.search-pagination a.btn-last.disabled",
      (element) => element.textContent
    );
  }

  //crawling part start//
  let productData = [];

  try {
    let priority = 1;
    //1 ~ 3페이지까지 크롤링
    for (let pageNumber = 1; pageNumber <= CRAWL_PAGES; pageNumber++) {
      if (pageNumber != 1) {
        //CRAWL_PAGES만큼 페이지 이동
        await page.goto(
          `https://www.coupang.com/np/search?q=${searchText}&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=72&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=${pageNumber}&rocketAll=false&searchIndexingToken=1=4&backgroundColor=`,
          { waitUntil: "networkidle2" }
        );
      }

      await removeAd(page);
      //페이지당 상품 갯수 => 페이지당 광고를 삭제하고나서 해당 페이지에 존재하는 상품갯수
      let productAmountPerPage = await page.evaluate(() => {
        return document.querySelectorAll(`#productList li`).length;
      });

      for (let idx = 1; idx <= productAmountPerPage; idx++) {
        let productObj = {};
        try {
          //우선순위, 제목, 가격, link 를 찾아서 추가해주는 part, TODO : unit-price도 추가해야할지 고민
          productObj["priority"] = priority++;
          productObj["title"] = await page.$eval(
            `#productList li:nth-child(${idx}) div.name`,
            (element) => {
              return element.textContent || "";
            }
          );
          productObj["price"] = await page.$eval(
            `#productList li:nth-child(${idx}) .price-value`,
            (element) => {
              return element.textContent || "";
            }
          );
          productObj["link"] = await page.$eval(
            `#productList li:nth-child(${idx}) a`,
            (element) => {
              return element.href || "";
            }
          );
          productObj["imgsrc"] = await page.$eval(
            `#productList li:nth-child(${idx}) img`,
            (element) => {
              return element.getAttribute("src");
            }
          );
        } catch (error) {
          console.error(error);
        }
        //데이터가 존재할때만 추가함.
        if (productObj.title && productObj.price && productObj.link)
          productData.push(productObj);
        //존재하지않으면 우선순위 증가하지 않도록 --
        else {
          priority--;
          continue;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  await page.close(); // 페이지 닫기
  await browser.close(); // 브라우저 닫기

  let end = await new Date().getTime();
  console.log("쿠팡크롤러 time :" + (end - start) / 1000);

  if (dataInsert(productData, linkId) == FAILURE) {
    return FAILURE;
  }
  return SUCCESS;
  //crawling part end //
};

function dataInsert(crawlerData, linkId) {
  crawlerData
    .filter((obj) => {
      return obj.priority <= 3;
    })
    .forEach((filterd) => {
      db.query(
        `
      INSERT INTO crawl(links_id, title, price, priority, source, link, imgsrc)
      VALUES(?, ?, ?, ?, ?, ?, ?)
    `,
        [
          linkId,
          filterd.title,
          filterd.price,
          filterd.priority,
          "coupang",
          filterd.link,
          filterd.imgsrc,
        ],
        function (error,) {
          if (error) {
            console.error(error);
            return FAILURE;
          }
        }
      );
    });
  return SUCCESS;
}
module.exports = coupangCrawler;
