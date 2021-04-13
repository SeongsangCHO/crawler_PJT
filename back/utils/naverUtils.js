const removeAd = async (page, LIST_SIZE) => {
  for (let idx = 0; idx < LIST_SIZE; idx++) {
    // await page.waitForSelector(
    //   `.list_basis > div > div:nth-child(${idx + 1}) img`
    // );
    await page.evaluate(() => {
      let adCard = document.querySelector("li.ad");
      if (adCard) {
        adCard.parentElement.remove();
        //광고상품 카운트
      }
    });
  }
};
const getProductData = async (page, productAmountPerPage) => {
  let productData = [];
  let priority = 1;
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
            ? element.innerText
                .slice(2, element.innerText.indexOf("원"))
                .split(",")
                .join("")
            : element.innerText
                .slice(0, element.innerText.indexOf("원"))
                .split(",")
                .join("") || "가격정보 링크에서 확인";
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
  return productData;
};
exports.removeAd = removeAd;
exports.getProductData = getProductData;
