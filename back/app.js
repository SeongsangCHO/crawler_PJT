const express = require("express");
const path = require("path");
const ssgCrawler = require("./crawler/ssgCrawler");
const coupangCrawler = require("./crawler/coupangCrawler");
const naverCrawler = require("./crawler/naverCrawler");
const cors = require("cors");
const accecptURL = "http:/localhost:3000";
const db = require("./config/db_config");
const bcrypt = require("bcrypt");
const { createToken } = require("./middlewares/auth");
const HASH_ROUND = 10;
const { verifyToken } = require("./middlewares/verify");
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

const port = process.env.PORT || 8080;
//템플릿엔진 ejs 설정 __dirname +'views'랑 같음
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.send("hello World");
});

app.get("/api", (req, res) => {
  res.render("../views/index", { title: "api page" });
});

app.post("/doublecheck", cors(accecptURL), (req, res, next) => {
  //res.set이아닌 setHeader로 했어야함.
  console.log("double check post request 받음");
  console.log(req.body.user_nickname);
  let sql = `select * from users where nickname = '${req.body.user_nickname}'`;
  //setHeader를 이미 선언하면, body를 다 작성했다는 의미
  //그리고나서 res.status로 상태코드를 지정하면 에러가 발생할 것
  //
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  db.query(sql, (error, result) => {
    console.log(result);
    if (result == "") {
      return res.status(200).json({ message: "중복체크 success" });
    }
    if (result[0].nickname == req.body.user_nickname) {
      console.log("select한 결과 있음");
      console.log(result);
      return res.status(400).json({ error: "message" });
    }
  });
  //res.statusCode = 400, 401로 상태코드응답
  //userData의 password를 bcrpt로 해싱
});

//가입버튼 클릭시 - 가입요청을 받는 부분
app.post("/register", cors(accecptURL), (req, res, next) => {
  //res.set이아닌 setHeader로 했어야함.
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log(req.body);
  try {
    bcrypt.hash(
      req.body.user_password,
      HASH_ROUND,
      (bcryptError, hashPassword) => {
        let sql = `insert into users (nickname, password) values(?, ?)`;
        db.query(
          sql,
          [req.body.user_nickname, hashPassword],
          (dbError, result) => {
            if (dbError) {
              throw dbError;
            }
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
  }
  return res.status(200).json({ message: "가입 success" });
});

function test(req, res, next) {
  console.log("로그인 성공 후 next");
}
app.post("/login", cors(accecptURL), createToken, test, (req, res, next) => {
  test();
  return res.status(400);
});

app.post("/addcategory", cors(accecptURL), verifyToken, (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  console.log("전달받은 카테고리 명 : " + req.body.category);
  //현재 로그인된 id의 id를 외래키로 사용하는 categories 테이블에 user_id를 삽입하고
  //front에서 전달받은 category명을 테이블에 삽입함
  //카테고리 id도 외래키 userId로 얻을 수 있음
  let sql = insertCategoryQuery();
  db.query(
    sql,
    [req.currentUserNickname, req.body.category],
    (dbError, result) => {
      if (dbError) {
        throw dbError;
      }
    }
  );

  return res.status(200).json({ message: "카테고리 추가  success" });
});

app.post("/addlink", cors(accecptURL), verifyToken, (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log("server addlink call");
  let { title, price, link, info, currentCategory, registerTime } = req.body;
  let KST = new Date(registerTime.toString());
  KST.setHours(KST.getHours() + 9);

  //한국표준시에 맞추기
  //데이터 중복이 아닐 때 카드 추가
  let sql = insertLinkCardQuery(req, currentCategory);

  db.query(sql, [title, price, link, info, KST], (dbError, result) => {
    if (dbError) throw dbError;
  });

  return res.status(200).json({ message: "링크 추가 SUCCESS" });
});

app.get("/api/mylink", cors(accecptURL), verifyToken, (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  let searchTitle = req.body.currentLinkTitle;

  //0 : 실패
  //1 : 성공
  //2 : 검색결과 없음

  let crawlTargetLinkCardId = selectCrawlTargetLinkCardIdQuery(
    req,
    searchTitle
  );

  let sql = selectCardCrawledDataQuery(searchTitle);
  //데이터가 있다면 크롤러 수행하지 않고 그대로 저장
  db.query(sql, (err, result) => {
    if (result) {
      console.log("*****************");
      // console.log(result);
      console.log("*****************");
    }
  });
  db.query(crawlTargetLinkCardId, (dbErr, dbResult) => {
    console.log("findID : ", dbResult[0].id);

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
      if(err) throw err;
    });
  } catch (err) {
    return res.status(404).json({ok : false});
  }
  return res.status(200).json({ok : true});
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
