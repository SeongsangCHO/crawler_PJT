const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
let db = require("../config/db_config");
let iconv = require("iconv-lite");

const multi = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    let searchText = "쌀 2kg";

    await browser.userAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
    );
    const [ssgCrawler, coupangCrawler] = await Promise.all([
      browser.newPage(),
      browser.newPage(),
    ]);
    //불필요한 요소 로딩 블락
    await ssgCrawler.setRequestInterception(true);
    ssgCrawler.on("request", (request) => {
      if (
        request.resourceType() === "image" ||
        request.resourceType() === "font" ||
        request.resourceType() == "stylesheet"
      )
        request.abort();
      else request.continue();
    });
    await coupangCrawler.setRequestInterception(true);
    coupangCrawler.on("request", (request) => {
      if (request.resourceType() === "image" ||
      request.resourceType() == "font") request.abort();
      else request.continue();
    });

    await ssgCrawler.setDefaultNavigationTimeout(0);
    await coupangCrawler.setDefaultNavigationTimeout(0);

    await Promise.all([
      await ssgCrawler.goto(
        `http://www.ssg.com/search.ssg?target=all&query=${searchText}&page=1`
      ,{ waitUntil: "networkidle2" }),
      //
      await coupangCrawler.goto(
        `https://www.coupang.com/np/search?q=${searchText}&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=36&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=1&rocketAll=false&searchIndexingToken=1=4&backgroundColor=`
      ,{ waitUntil: "networkidle2" }),
    ]);
  } catch (error) {
    console.error(error);
  }
};

module.exports = multi;
