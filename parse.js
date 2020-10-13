const dummy =
  //사용자가 추가할 category
  {
    category: [
      {
        생필품: [
          {
            title: "생수",
            link: "생수 링크",
            price: "생수 가격",
            크롤링데이터: {
              크롤링제목: "생수크롤링제목",
              크롤링링크: "크롤링 링크",
              크롤링가격: "크롤링가격",
            },
          },
          {
            title: "탄산수",
            link: "탄산수 링크",
            price: "탄산수  가격",
            크롤링데이터: {
              크롤링제목: "탄산수 크롤링제목",
              크롤링링크: "탄산수 크롤링 링크",
              크롤링가격: "탄산수 크롤링가격",
            },
          },
        ],
      },
      {
        옷: [
          {
            title: "후드티",
            link: "후드티 링크",
            price: "후드티 가격",
            크롤링데이터: {
              크롤링제목: "후드티 크롤링제목",
              크롤링링크: "후드티 크롤링 링크",
              크롤링가격: "후드티 크롤링가격",
            },
          },
          {
            title: "자켓",
            link: "자켓 링크",
            price: "자켓  가격",
            크롤링데이터: {
              크롤링제목: "자켓 크롤링제목",
              크롤링링크: "자켓 크롤링 링크",
              크롤링가격: "자켓 크롤링가격",
            },
          },
        ],
      },
    ],
  };

function findCategory() {
  dummy.category.map((cate, idx) =>
    cate[Object.keys(cate)].map((element) => console.log(element.title))
  );
}

findCategory();



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
