const LIST_SIZE = 72;

const getProductData = async (page, productAmountPerPage) => {
  let productData = [];
  let priority = 1;

  for (let idx = 1; idx <= productAmountPerPage; idx++) {
    let productObj = {};
    try {
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
          return element.textContent.split(",").join("") || "중고물품";
        }
      );
      productObj["link"] = await page.$eval(
        `#productList li:nth-child(${idx}) a`,
        (element) => {
          return element.href || "";
        }
      );
      productObj["imgsrc"] = await page.$eval(
        `#productList li:nth-child(${idx}) img`,
        (element) => {
          if(element.getAttribute("src").slice(-3)==="gif")
            return element.getAttribute("data-img-src");
          return element.getAttribute("src");
        }
      );
      
    } catch (error) {
      console.error(error);
    }
    //데이터가 존재할때만 추가함.
    if (productObj.title && productObj.price && productObj.link)
      productData.push(productObj);
    //존재하지않으면 우선순위 증가하지 않도록 --
    else {
      priority--;
      continue;
    }
  }
  return productData;
};

//페이지당 광고 삭제
const removeAd = async (page) => {
  for (let i = 0; i < LIST_SIZE; i++) {
    await page.evaluate(() => {
      let badge = document.querySelector(".search-product__ad-badge");
      if (badge) badge.remove();
    });
  }
};

//전체 상품갯수, 전체 페이지 숫자 구하기
const getSearchRange = async (page) => {
  let totalProducts = 0;
  let lastPageNumber = 0;
  try {
    totalProducts = await page.$eval(
      `
    #searchOptionForm > div.search-header strong`,
      (element) => {
        return element.innerText
          .slice(1, element.innerText.length - 1)
          .replace(/,/gi, "");
      }
    );

    lastPageNumber = Math.ceil(totalProducts / LIST_SIZE);
    if (+totalProducts === 0) {
      //검색결과가 없음
      console.log("검색결과가 없습니다.");
      await page.close(); // 페이지 닫기
      await browser.close(); // 브라우저 닫기
      return {
        totalProducts: NO_SEARCH_DATA,
        lastPageNumber: NO_SEARCH_DATA,
      };
    }
  } catch (error) {
    console.error(error);
  }
  return {
    totalProducts: totalProducts,
    lastPageNumber: totalProducts / LIST_SIZE,
  };
};

exports.getProductData = getProductData;
exports.removeAd = removeAd;
exports.getSearchRange = getSearchRange;
