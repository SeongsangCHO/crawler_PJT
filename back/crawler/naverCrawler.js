const puppeteer = require("puppeteer");
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

const pageDown = async (page) => {
  const scrollHeight = "document.body.scrollHeight";
  let previousHeight = await page.evaluate(scrollHeight);
  await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
  await delay(5000);
  try {
    //한번에 맨 밑으로 내려갔을때, 무한 스크롤에 한번 걸리는 경우가 없을때
    //에러가 생기는데, 음
    await page.waitForFunction(`${scrollHeight} > ${previousHeight}`, {
      timeout: 2000,
    });
  } catch (error) {
    console.error(error);
  }
};

const naverCrawler = async (searchTitle, linkId) => {
  let start = await new Date().getTime();
  let productData = [];

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
  try {
    //특정 검색어 했을때 못찾는 에러가 발생함.

    const isSearchResult = await page.$eval(`#powerlink-div`, (element) => {
      return element.childNodes.length;
    });
    console.log(isSearchResult);

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

      let priority = 1;
      let lastPageNumber = CRAWL_PAGES;

      //전체페이지가 크롤링할 페이지 수 보다 적을경우 검색페이지를 최대 페이지만큼 하도록 지정
      if (totalPages - CRAWL_PAGES < 0) lastPageNumber = totalPages;

      console.log(lastPageNumber);

      for (let pageNumber = 1; pageNumber <= lastPageNumber; pageNumber++) {
        console.log("지맘대로여");

        if (pageNumber != 1) {
          await page.goto(
            `https://search.shopping.naver.com/search/all?frm=NVSHATC&origQuery=%EB%AC%BC&pagingIndex=${pageNumber}&pagingSize=40&productSet=total&query=%EB%AC%BC&sort=rel&timestamp=&viewType=list`,
            //page로 넘기면 검색가능
            { waitUntil: "networkidle2" }
          );
          //페이지 맨 밑 스크롤
          await pageDown(page);
        }
        //광고 지우기
        for (let idx = 0; idx < LIST_SIZE; idx++) {
          console.log(idx);
          
          await page.waitForSelector(
            `.list_basis > div > div:nth-child(${idx + 1}) img`
          );
          await page.evaluate(() => {
            let adCard = document.querySelector("li.ad");
            if (adCard) {
              adCard.parentElement.remove();
              //광고상품 카운트
            }
          });
        }
        //광고 제거 후 페이지당 품목 갯수
        let productAmountPerPage = await page.evaluate(() => {
          return document.querySelectorAll(`.list_basis > div > div`).length;
        });
        console.log(productAmountPerPage);

        for (let idx = 1; idx <= productAmountPerPage; idx++) {
          let productObj = {};
          try {
            productObj["priority"] = priority++;
            productObj["title"] = await page.$eval(
              `.list_basis > div > div:nth-child(${idx}) > li > div > div:nth-child(2) div a`,
              (element) => {
                return element.innerText || "";
              }
            );
            productObj["price"] = await page.$eval(
              `.list_basis > div > div:nth-child(${idx}) > li > div > div:nth-child(2) div:nth-child(2) strong`,
              (element) => {
                return element.innerText.includes("최저")
                  ? element.innerText.slice(
                      2,
                      element.innerText.indexOf("원") + 1
                    )
                  : element.innerText || "";
              }
            );
            productObj["link"] = await page.$eval(
              `.list_basis > div > div:nth-child(${idx}) > li > div > div:nth-child(2) div:nth-child(1) a`,
              (element) => {
                return element.href || "";
              }
            );
            productObj[
              "imgsrc"
            ] = await page.$eval(
              `.list_basis > div > div:nth-child(${idx}) img`,
              (element) => element.getAttribute("src")
            );
            if (productObj.title && productObj.price && productObj.link)
              productData.push(productObj);
            //존재하지않으면 우선순위 증가하지 않도록 --
            else {
              priority--;
              continue;
            }
          } catch (error) {
            console.error(error);
          }
        }
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
  if (dataInsert(productData, linkId) == FAILURE) return FAILURE;
  await page.close(); // 페이지 닫기
  await browser.close(); // 브라우저 닫기
  let end = await new Date().getTime();
  console.log("네이버 크롤러 time :" + (end - start) / 1000);
  return SUCCESS;
};

function dataInsert(crawlerData, linkId) {
  crawlerData
    .filter((obj) => {
      return obj.priority <= 3;
    })
    .forEach((filtered) => {
      db.query(
        //insert time, update time 넣기, now()
        `
      INSERT INTO crawl(links_id, title, price, priority, source, link)
      VALUES(?, ?, ?, ?, ?, ?)
      `,
        [
          linkId,
          filtered.title,
          filtered.price,
          filtered.priority,
          "naver",
          filtered.link,
          filtered.imgsrc,
        ],
        function (error, result) {
          if (error) {
            console.error(error);
            return FAILURE;
          }
        }
      );
    });
  return SUCCESS;
}

module.exports = naverCrawler;
