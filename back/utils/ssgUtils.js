const getLastPageNumber = async (page, browser, productAmountPerPage) => {
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
      (element) => element.textContent.split(",").join("")
    );
    productObj["link"] = await page.$eval(
      `#idProductImg li:nth-child(${idx}) div.title a`,
      (element) => element.href
    );
    productObj[
      "imgsrc"
    ] = await page.$eval(`#idProductImg li:nth-child(${idx}) img`, (element) =>
      element.getAttribute("src")
    );

    productData.push(productObj);
  }
  return productData;
};

exports.getProductData = getProductData;
exports.getLastPageNumber = getLastPageNumber;
