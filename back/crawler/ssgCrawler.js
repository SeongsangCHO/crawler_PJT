const puppeteer = require("puppeteer");
let db = require("../config/db_config");
let iconv = require("iconv-lite");
const CRAWL_PAGES = 1;

//품목기반으로 검색한 크롤링을 해야하는데,
//크롤링에 인자전달하는 방법
//db에서 select한 결과를 갖고 크롤링을 해야할듯
const ssgCrawler = async (searchTitle, linkId) => {
  const NO_SEARCH_DATA = 2;
  const SUCCESS = 1;
  const FAILURE = 0;

  let start = await new Date().getTime();
  //배포시 headless true로 설정해야함.
  //에러핸들링 추가해야함., 블록스코프에 맞춰서
  const browser = await puppeteer.launch({ headless: true, args:['--no-sandbox'] });
  await browser.userAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
  );
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    "accept-charset": "euc-kr", //한글 깨지는 문제를 해결해보려고 charset을 바꿔봤는데 해결안됨
  });
  //이미지,폰트,스타일시트 로딩 블락, 속도향상
  await page.setRequestInterception(true);
  //image를 안불러와서 image src를 받을 수 없었음?
  page.on("request", (request) => {
    if (
      // request.resourceType() === "image" ||
      request.resourceType() === "font" ||
      request.resourceType() == "stylesheet"
    )
      request.abort();
    else request.continue();
  });

  //시간제한 없애기
  await page.setDefaultNavigationTimeout(0);
  //동시에 여러 페이지 newPage로 띄워서  promise.all로 각각 페이지를 모듈로 나눠서 크롤링실행해야겠다.
  await page.goto(
    `http://www.ssg.com/search.ssg?target=all&query=${searchTitle}&page=1`,
    { waitUntil: "networkidle2" }
  );

  const ulContentSelector = `#divProductImg > #idProductImg li`;
  let productData = [];
  let lastPageNumber;
  const liLength = await page.evaluate((SELECTOR) => {
    //page당 아이템 갯수 출력 80개
    return document.querySelectorAll(SELECTOR).length;
  }, ulContentSelector);
  if (liLength <= 0) {
    //li 태그의 길이가 없다 == 검색결과 없을때 크롤링종료
    console.log("ssg_ li length is zero");
    await page.close(); // 페이지 닫기
    await browser.close(); // 브라우저 닫기
    return NO_SEARCH_DATA; // 검색결과 없을때
  } else {
    //마지막 페이지 번호를 구함
    let totalProduct = await page.$eval(
      `div#area_itemCount > .tx_ko`,
      (element) => {
        return element.innerText.replace(/,/gi, "").split(" ")[0];
      }
    );
    lastPageNumber = Math.ceil(totalProduct / liLength);

    //페이지가 10개이상일때 last버튼 찾도록 지정
    if (lastPageNumber >= 10) {
      lastPageNumber = await page.$eval(`.btn_last`, (element) => {
        //btn Last가 없을수도있구나.
        return element.getAttribute("data-filter-value").split("=")[1];
      });
    }

    try {
      let priority = 1;
      //첫페이지 ~ 3페이지까지 크롤링
      for (
        let pageNumber = 1;
        pageNumber <= lastPageNumber - (lastPageNumber - CRAWL_PAGES);
        pageNumber++
      ) {
        if (pageNumber != 1) {
          await page.goto(
            `http://www.ssg.com/search.ssg?target=all&query=${searchTitle}&page=${pageNumber}`,
            { waitUntil: "networkidle2" }
          );
        }
        for (let idx = 1; idx <= liLength; idx++) {
          let productObj = {};
          productObj["priority"] = priority++;

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
          productObj[
            "imgsrc"
          ] = await page.$eval(`#idProductImg li:nth-child(${idx}) img`,
           (element) => element.getAttribute('src')
          );
          
          productData.push(productObj);
        }
      }
    } catch (error) {
      if (error) console.error(error);
    }
  }

  let end = await new Date().getTime();
  console.log("쓱 크롤러 걸린시간 : " + (end - start) / 1000);

  await page.close(); // 페이지 닫기
  await browser.close(); // 브라우저 닫기
  if (dataInsert(productData, linkId) === "SUCCESS") {
    return SUCCESS;
  }
  return FAILURE;
};

function dataInsert(crawlerData, linkId) {
  //필터로 갯수 조절하면 될듯
  //성공하면 return되도록
  console.log("링크 아이디", linkId);

  crawlerData
    .filter((obj) => {
      return obj.priority <= 3;
    })
    .forEach((filterd) => {
      db.query(
        `
    INSERT INTO crawl(links_id, title, price,  priority, source, link,imgsrc)
    VALUES(?, ?, ?, ?, ?, ?,? )`,
        [
          linkId,
          filterd.title,
          filterd.price,
          filterd.priority,
          "ssg",
          filterd.link,
          filterd.imgsrc,
        ],
        function (error, result) {
          if (error) {
            console.error(error);
            return "FAILURE";
          }
        }
      );
    });
  return "SUCCESS";

  // crawlerData.forEach((obj) => {
  //   db.query(
  //     `INSERT INTO product(title, price, link, priority)
  //   VALUES(?,?,?,?)`,
  //     [obj.title, obj.price, obj.link, obj.priority],
  //     function (error, result) {
  //       if (error){ console.error(error);
  //       return "FAILURE"}
  //     }
  //   );
  // });
  // return "SUCCESS";
}

module.exports = ssgCrawler;
