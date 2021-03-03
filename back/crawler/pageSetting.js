
const pageInit = async (searchText, page,LIST_SIZE) => {
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  );
  await page.setExtraHTTPHeaders({
    "accept-charset": "euc-kr", //한글 깨지는 문제를 해결해보려고 charset을 바꿔봤는데 해결안됨=> 폰트문제일 확률 높음.
  });
  page.on("request", (request) => {
    if (request.resourceType() === "font") request.abort();
    else request.continue();
  });

  try {
    await page.setRequestInterception(true);

    await page.setDefaultNavigationTimeout(0);
    //동시에 여러 페이지 newPage로 띄워서  promise.all로 각각 페이지를 모듈로 나눠서 크롤링실행해야겠다.
    await page.goto(
      `https://www.coupang.com/np/search?q=${searchText}&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=${LIST_SIZE}&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=1&rocketAll=false&searchIndexingToken=1=4&backgroundColor=`,
      //page로 넘기면 검색가능
      { waitUntil: "networkidle2" }
    );
  } catch (error) {
    console.error(error);
  }
}

exports.pageInit = pageInit;