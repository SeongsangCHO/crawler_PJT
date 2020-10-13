const puppeteer = require("puppeteer");
let db = require("../config/db_config");

const coupangCrawler = async () => {
  let start = await new Date().getTime();
  //Common part start//
  const browser = await puppeteer.launch({ headless: true });
  await browser.userAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
  );

  const page = await browser.newPage();
  process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
    browser.close();
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  );
  await page.setExtraHTTPHeaders({
    "accept-charset": "euc-kr", //한글 깨지는 문제를 해결해보려고 charset을 바꿔봤는데 해결안됨
  });
  page.on("request", (request) => {
    if (request.resourceType() === "font") request.abort();
    else request.continue();
  });
  //링크 title을 요청받아와서 사용
  let searchText = "쌀 2kg";
  //searchText로 db에 저장하고
  //이를 외래키로 지정해서 하위 데이터들을 추가시켜주어야하네..a1

  //시간제한 없애기 start//
  try {
    await page.setRequestInterception(true);

    await page.setDefaultNavigationTimeout(0);
    //동시에 여러 페이지 newPage로 띄워서  promise.all로 각각 페이지를 모듈로 나눠서 크롤링실행해야겠다.
    await page.goto(
      `https://www.coupang.com/np/search?q=${searchText}&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=72&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=1&rocketAll=false&searchIndexingToken=1=4&backgroundColor=`,
      //page로 넘기면 검색가능
      { waitUntil: "networkidle2" }
    );
  } catch (error) {
    console.error(error);
  }
  //시간제한 없애기 end //

  //Common part  end//

  // lastPage넘버 set start //
  try {
    await page.waitForSelector("div.search-pagination a.btn-last.disabled");
  } catch (error) {
    console.error(error);
  }

  const lastPageNumber = await page.$eval(
    "div.search-pagination a.btn-last.disabled",
    (element) => element.textContent
  );
  // lastPage넘버 set end//

  console.log(lastPageNumber);

  //crawling part start//
  try {
    let productData = [];
    let priority = 1;
    //1 ~ 3페이지까지 크롤링
    for (
      let pageNumber = 1;
      pageNumber <= lastPageNumber - (lastPageNumber - 3);
      pageNumber++
    ) {
      if (pageNumber != 1) {
        await page.goto(
          `https://www.coupang.com/np/search?q=${searchText}&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=72&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=${pageNumber}&rocketAll=false&searchIndexingToken=1=4&backgroundColor=`,
          //page로 넘기면 검색가능
          { waitUntil: "networkidle2" }
        );
      }
      //페이지당 광고 삭제
      await page.evaluate(() => {
        let badge = document.querySelector(".search-product__ad-badge");
        if (badge) badge.remove();
      });

      //페이지당 상품 갯수 => 페이지당 광고를 삭제하고나서 해당 페이지에 존재하는 상품갯수
      let productAmountPerPage = await page.evaluate(() => {
        return document.querySelectorAll(`#productList li`).length;
      });

      //요소가 존재하는지 확인해야함- > 에러체크
      for (let idx = 1; idx <= productAmountPerPage; idx++) {
        let productObj = {};

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
        //데이터가 존재할때만 추가함.
        if (productObj.title && productObj.price && productObj.link)
          productData.push(productObj);
        //존재하지않으면 우선순위 증가하지 않도록 --
        else priority--;
      }
    }
  } catch (error) {
    console.error(error);
  }

  //crawling part end //

  let end = await new Date().getTime();
  console.log("쿠팡크롤러 time :" + (end - start) / 1000);

  await page.close(); // 페이지 닫기
  await browser.close(); // 브라우저 닫기
};
module.exports = coupangCrawler;
