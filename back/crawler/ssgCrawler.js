const puppeteer = require("puppeteer");
let db = require("../config/db_config");
let iconv = require("iconv-lite");

function encodeText(str) {
  let euckrObj = iconv.encode(str, "euc-kr"); //스트링을 euc-kr로 인코딩
  let result = "";
  for (const code of euckrObj) {
    result += "%" + code.toString(16); //인코딩된(euc-kr용 숫자로 바뀐) 숫자를 16진법으로 변환한 뒤 %와 결합해서 URL용 EUC-KR버전으로 바꿈
  }
  return result;
}

//품목기반으로 검색한 크롤링을 해야하는데,
//크롤링에 인자전달하는 방법
//db에서 select한 결과를 갖고 크롤링을 해야할듯
const ssgCrawler = async () => {
  let start = await new Date().getTime();
  //배포시 headless true로 설정해야함.
  //에러핸들링 추가해야함., 블록스코프에 맞춰서
  const browser = await puppeteer.launch({ headless: true });
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
      request.resourceType() === "font" ||
      request.resourceType() == "stylesheet"
    )
      request.abort();
    else request.continue();
  });
  //링크 title을 요청받아와서 사용
  let searchText = "쌀 2kg";
  //searchText로 db에 저장하고
  //이를 외래키로 지정해서 하위 데이터들을 추가시켜주어야하네..a1

  let encodedSearchText = encodeText(searchText);

  //시간제한 없애기
  await page.setDefaultNavigationTimeout(0);
  //동시에 여러 페이지 newPage로 띄워서  promise.all로 각각 페이지를 모듈로 나눠서 크롤링실행해야겠다.
  await page.goto(
    `http://www.ssg.com/search.ssg?target=all&query=${searchText}&page=1`,
    // http://www.ssg.com/search.ssg?target=all&query=%EB%AC%BC&sort=sale 판매량순
    // http://www.ssg.com/search.ssg?target=all&query=%EB%AC%BC&page=1
    //page로 넘기면 검색가능
    { waitUntil: "networkidle2" }
  );

  const ulContentSelector = `#divProductImg > #idProductImg li`;
  let productData = [];

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
    console.log(lastPageNumber);

    try {
      //첫페이지 ~ 3페이지까지 크롤링
      for (
        let pageNumber = 2;
        pageNumber <= lastPageNumber - (lastPageNumber - 3);
        pageNumber++
      ) {
        for (let idx = 1; idx <= liLength; idx++) {
          let productObj = {};
          productObj["priority"] = idx + (pageNumber - 2) * liLength;

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
        await page.goto(
          `http://www.ssg.com/search.ssg?target=all&query=${searchText}&page=${pageNumber}`,
          { waitUntil: "networkidle2" }
        );
      }
    } catch (error) {
      if (error) console.error(error);
    }
  }

  dataInsert(productData);
  let end = await new Date().getTime();
  console.log("쓱 크롤러 걸린시간 : " + (end - start) / 1000);

  await page.close(); // 페이지 닫기
  await browser.close(); // 브라우저 닫기
};

function dataInsert(crawlerData) {
  crawlerData.forEach((obj) => {
    // db.query(
    //   `INSERT INTO product(title, price, link, priority)
    // VALUES(?,?,?,?)`,
    //   [obj.title, obj.price, obj.link, obj.priority],
    //   function (error, result) {
    //     if (error) console.error(error);
    //   }
    // );
  });
}

module.exports = ssgCrawler;
