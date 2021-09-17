const express = require("express");
const ssgCrawler = require("./crawler/ssgCrawler");
const coupangCrawler = require("./crawler/coupangCrawler");
const naverCrawler = require("./crawler/naverCrawler");
const cors = require("cors");
const accecptURL = "http:/localhost:3000";
const db = require("./config/db_config");
const { verifyToken } = require("./middlewares/verify");
const jwt = require("jsonwebtoken");

const {
  selectCrawlTargetLinkCardIdQuery,
  selectCardCrawledDataQuery,
  selectLinkCardIdQuery,
  selectUserDataQuery,
} = require("./query/selectQuery");
const {
  insertCategoryQuery,
  insertLinkCardQuery,
} = require("./query/insertQuery");
const { deleteProductCardQuery } = require("./query/deleteQuery");

require("dotenv").config();
const app = express();
const moment = require("moment");
const middlewares = require("./middlewares/middlewares");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
middlewares(app);
//raw로 작성된 query module화 해서 가져올 것.
//URL 환경변수 처리
const routes = require("./routes");
app.use("/", routes);

const port = process.env.PORT || 8080;

app.post("/addlink", cors(accecptURL), verifyToken, (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log("server addlink call");
  let { title, price, link, info, currentCategory, registerTime } = req.body;
  let KST = new Date(registerTime.toString());
  KST.setHours(KST.getHours() + 9);
  let sql = insertLinkCardQuery(req, currentCategory);
  db.query(sql, [title, price, link, info, KST], (dbError, result) => {
    if (dbError) throw dbError;
  });
  return res.status(200).json({ message: "링크 추가 SUCCESS" });
});

app.get("/api/mylink", cors(accecptURL), verifyToken, (req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("`Access-Control-Allow-Credentials", true);

  let sql = selectUserDataQuery(req);

  let mylinkData = {
    category: [],
  };
  let categoryMap = new Map();

  const makeCategoryKey = (categoryMap, { category }) => {
    //카테고리가 없으면 카테고리명:[] 생성
    if (!categoryMap.get(category)) {
      categoryMap.set(category, []);
    }
  };
  const makeLinkCard = (
    categoryMap,
    { linkId, category, linkTitle, link, linkPrice, linkInfo, registerTime }
  ) => {
    categoryMap.get(category).push({
      id: linkId,
      title: linkTitle,
      link: link,
      price: linkPrice,
      info: linkInfo,
      date: registerTime,
      ssg: [],
      coupang: [],
      naver: [],
      crawl: [],
    });
    //링크카드 생성
    //카테고리:[{},{},{}] 카드데이터 채우기
  };
  const isMakeLinkCard = (categoryMap, { category, link }) => {
    //반복이 크롤카드갯수만큼 일어남.
    //같은 아이템에 대한 반복이 일어나므로, 카드생성시 link중복을 고려해 이전,다음링크가 들어왔을때만 카드생성
    if (
      !(
        categoryMap.get(category)[categoryMap.get(category).length - 1] ==
          undefined ||
        categoryMap.get(category)[categoryMap.get(category).length - 1].link !==
          link
      )
    ) {
      return false;
    }
    return true;
  };
  db.query(sql, (err, result) => {
    if (result) {
      result.map((element, idx) => {
        makeCategoryKey(categoryMap, element);

        if (isMakeLinkCard(categoryMap, element)) {
          makeLinkCard(categoryMap, element);
        }
        //링크카드에 대한 크롤링 데이터 생성
        if (element.crawlTitle !== null) {
          let tmp = {
            title: element.crawlTitle,
            price: element.crawlPrice,
            link: element.crawlLink,
            imgsrc: element.crawlImgSrc,
            source: element.crawlSource,
          };
          //해당링크카드(추가된 마지막 카드)에 ssg, coupang, naver키에 크롤데이터 push
          categoryMap
            .get(element.category)
            [categoryMap.get(element.category).length - 1][
              element.crawlSource
            ].push(tmp);

          categoryMap
            .get(element.category)
            [categoryMap.get(element.category).length - 1].crawl.push(tmp);
        }
      });
    }
    //맵을 key,value쌍으로 갖는 obj로 변환
    let obj = Object.fromEntries(categoryMap);
    for (let key of Object.keys(obj)) {
      let tmp = {};
      tmp[key] = obj[key];
      mylinkData.category.push(tmp);
    }
    res.json(mylinkData);
  });
});

app.post("/crawler", cors(accecptURL), verifyToken, (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  let searchTitle = req.body.currentLinkTitle;
  console.log(req.body, "crawler요청");

  //0 : 실패
  //1 : 성공
  //2 : 검색결과 없음

  let crawlTargetLinkCardId = selectCrawlTargetLinkCardIdQuery(
    req,
    searchTitle
  );

  let sql = selectCardCrawledDataQuery(searchTitle);
  //TODO : 데이터가 있다면 크롤러 수행하지 않고 그대로 저장
  // db.query(sql, (err, result) => {
  //   if (result) {
  //     console.log("*****************");
  //     // console.log(result);
  //     console.log("*****************");
  //   }
  // });
  db.query(crawlTargetLinkCardId, (dbErr, dbResult) => {
    console.log("findID : ", dbResult[0].id);
    console.log(dbResult[0], "crawler요청, dbResult");

    const crawlers = [
      ssgCrawler(searchTitle, dbResult[0].id),
      coupangCrawler(searchTitle, dbResult[0].id),
      naverCrawler(searchTitle, dbResult[0].id),
    ];
    Promise.all(crawlers).then((result) => {
      console.log(result);
      return res.status(200).json({ message: "크롤링 성공" });
    });
  });
});

app.post("/reload", cors(accecptURL), verifyToken, (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const title = req.body.linkTitle;
  const sql = selectLinkCardIdQuery(req, title);
  db.query(sql, (dbErr, dbResult) => {
    console.log("findID : ", dbResult[0].id);
    db.query(
      `delete from crawl where links_id = ${dbResult[0].id}`,
      (error, result) => {
        const crawlers = [
          ssgCrawler(title, dbResult[0].id),
          coupangCrawler(title, dbResult[0].id),
          naverCrawler(title, dbResult[0].id),
        ];
        Promise.all(crawlers).then((result) => {
          console.log(result);
          return res.status(200).json({ message: "성공" });
        });
      }
    );
  });
});

app.get("/api/logout", verifyToken, (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.clearCookie("user");
  console.log(req.cookies);
  return res.status(200).json({ message: "logout SUCCESS" });
});

app.delete("/postdelete/:id", verifyToken, (req, res) => {
  const deleteId = req.params.id;
  console.log(deleteId);

  const sql = deleteProductCardQuery(deleteId);
  try {
    db.query(sql, (err, result) => {
      if (err) throw err;
    });
  } catch (err) {
    return res.status(404).json({ ok: false });
  }
  return res.status(200).json({ ok: true });
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
