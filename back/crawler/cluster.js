const puppeteer = require("puppeteer");
const { Cluster } = require("puppeteer-cluster");

let db = require("../config/db_config");
let iconv = require("iconv-lite");

function ssgDataInsert(crawlerData) {
  console.log("DataInsert function");

  // crawlerData.forEach((obj) => {
  //   db.query(
  //     `INSERT INTO product(title, price, link, priority)
  //   VALUES(?,?,?,?)`,
  //     [obj.title, obj.price, obj.link, obj.priority],
  //     function (error, result) {
  //       if (error) console.error(error);
  //     }
  //   );
  // });
}
function coupangDataInsert(crawlerData) {
  console.log("coupang DataInsert function");

  // crawlerData.forEach((obj) => {
  //   db.query(
  //     `INSERT INTO product(title, price, link, priority)
  //   VALUES(?,?,?,?)`,
  //     [obj.title, obj.price, obj.link, obj.priority],
  //     function (error, result) {
  //       if (error) console.error(error);
  //     }
  //   );
  // });
}

const ssgCrawler = async (page, searchText) => {
  try {
    await page.setDefaultNavigationTimeout(0);

    const ulContentSelector = `#divProductImg > #idProductImg li`;

    const liLength = await page.evaluate((SELECTOR) => {
      //page당 아이템 갯수 출력 80개
      return document.querySelectorAll(SELECTOR).length;
    }, ulContentSelector);
    if (liLength <= 0) {
      //li 태그의 길이가 없다 == 검색결과 없을때 크롤링종료
      console.log("ssg_ li length is zero");
    } else {
      //마지막 페이지 번호를 구함
      const lastPageNumber = await page.$eval(`.btn_last`, (element) => {
        return element.getAttribute("data-filter-value").split("=")[1];
      });
      try {
        let productData = [];

        //첫페이지 ~ 3페이지까지 크롤링
        //맨처음 들어오는 값이 page=1임,

        for (
          let pageNumber = 1;
          pageNumber <= lastPageNumber - (lastPageNumber - 3);
          pageNumber++
        ) {
          if (pageNumber != 1) {
            await page.goto(
              `http://www.ssg.com/search.ssg?target=all&query=${searchText}&page=${pageNumber}`,
              { waitUntil: "networkidle2" }
            );
          }
          for (let idx = 1; idx <= liLength; idx++) {
            let productObj = {};
            productObj["priority"] = idx + (pageNumber - 1) * liLength;

            productObj["title"] = await page.$eval(
              `#idProductImg li:nth-child(${idx}) div.title a em.tx_ko`,
              (element) => element.textContent
            );

            productObj["price"] = await page.$eval(
              `#idProductImg li:nth-child(${idx}) em.ssg_price`,
              (element) => element.textContent + "원"
            );
            productObj["link"] = await page.$eval(
              `#idProductImg li:nth-child(${idx}) div.title a`,
              (element) => element.href
            );
            productData.push(productObj);
          }
        }
        ssgDataInsert(productData);
      } catch (error) {
        if (error) console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const coupangCrawler = async (page, searchText) => {
  console.log("쿠팡 크롤러 in");
  try {
    await page.setDefaultNavigationTimeout(0);

    await page.waitForSelector("div.search-pagination");
    const lastPageNumber = await page.$eval(`.btn-last`, (element) => {
      return element.textContent;
    });

    //crawling part
    try {
      console.log("in");

      let productData = [];
      let priority = 1;
      //1 ~ 3페이지까지 크롤링
      for (
        let pageNumber = 1;
        pageNumber <= lastPageNumber - (lastPageNumber - 3);
        pageNumber++
      ) {
        await page.waitForSelector("div.search-pagination");

        if (pageNumber != 1) {
          await page.goto(
            `https://www.coupang.com/np/search?q=${searchText}&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=72&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=${pageNumber}&rocketAll=false&searchIndexingToken=1=4&backgroundColor=`,
            //page로 넘기면 검색가능
            { waitUntil: "networkidle2" }
          );
        }
        //페이지당 광고 삭제
        await page.evaluate(() => {
          $(`.search-product__ad-badge`).remove();
        });

        //페이지당 상품 갯수
        let productAmountPerPage = await page.evaluate(() => {
          return document.querySelectorAll(`#productList li`).length;
        });

        //요소가 존재하는지 확인해야함- > 에러체크
        for (let idx = 1; idx <= productAmountPerPage; idx++) {
          let productObj = {};
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
          if (productObj.title && productObj.price && productObj.link)
            productData.push(productObj);
          else priority--;
        }
      }
      coupangDataInsert(productData);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};
// https://www.coupang.com/np/search?q=%EC%8C%80+2kg&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=36&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=2&rocketAll=false&searchIndexingToken=1=4&backgroundColor=
// https://www.coupang.com/np/search?component=&q=%EC%8C%80+2kg&channel=user
const cluster = async () => {
  console.log("클러스터 수행");

  try {
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 2,
    });
    let searchText = encodeURI("쌀 2kg");

    const ssgSearchURI = `http://www.ssg.com/search.ssg?target=all&query=${searchText}&page=1`;
    const coupangSearchURI = `https://www.coupang.com/np/search?q=${searchText}&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=36&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=1&rocketAll=false&searchIndexingToken=1=4&backgroundColor=`;

    // Define a task (in this case: screenshot of page)
    await cluster.task(async ({ page, data: url }) => {
      await page.setExtraHTTPHeaders({
        "accept-charset": "euc-kr", //한글 깨지는 문제를 해결해보려고 charset을 바꿔봤는데 해결안됨
      });
      await page.setDefaultNavigationTimeout(0);
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        if (
          request.resourceType() === "image" ||
          request.resourceType() === "font" ||
          request.resourceType() == "stylesheet"
        )
          request.abort();
        else request.continue();
      });
      await page.goto(url, { waitUntil: "networkidle0" });

      switch (url) {
        case ssgSearchURI: {
          let data = await ssgCrawler(page, searchText);
          break;
        }
        case coupangSearchURI: {
          let data = await coupangCrawler(page, searchText);
          break;
        }

        default: {
          console.log("디폴트");
          console.log(url);
          break;
        }
      }
    });

    // Add some pages to queue
    cluster.queue(coupangSearchURI);
    cluster.queue(ssgSearchURI);

    // Shutdown after everything is done
    await cluster.idle();
    await cluster.close();
  } catch (error) {
    console.error(error);
  }
  console.log("클러스터 끗");
};
module.exports = cluster;
