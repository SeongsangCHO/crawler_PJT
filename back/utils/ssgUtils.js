const getLastPageNumber = async (page, productAmountPerPage) => {

  if (productAmountPerPage <= 0) {
    //li 태그의 길이가 없다 == 검색결과 없을때 크롤링종료
    console.log("ssg_ li length is zero");
    await page.close(); // 페이지 닫기
    await browser.close(); // 브라우저 닫기
    return NO_SEARCH_DATA; // 검색결과 없을때
  }

  //마지막 페이지 번호를 구함
  let totalProduct = await page.$eval(
    `div#area_itemCount > .tx_ko`,
    (element) => {
      return element.innerText.replace(/,/gi, "").split(" ")[0];
    }
  );
  lastPageNumber = Math.ceil(totalProduct / productAmountPerPage);

  return lastPageNumber;
};

const getProductData = async (page, productAmountPerPage) => {
  let priority = 1;
  let productData = [];
  for (let idx = 1; idx <= productAmountPerPage; idx++) {
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
  return productData;
}

  exports.getProductData = getProductData;
  exports.getLastPageNumber = getLastPageNumber;
