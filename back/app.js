const express = require("express");
const path = require("path");
const ssgCrawler = require("./crawler/ssgCrawler");
const coupangCrawler = require("./crawler/coupangCrawler");
const naverCrawler = require("./crawler/naverCrawler");
const cors = require("cors");
const accecptURL = "http:/localhost:3000";
const db = require("./config/db_config");
const bcrypt = require("bcrypt");
const {createToken} = require("./middlewares/auth");
const HASH_ROUND = 10;
const { verifyToken } = require("./middlewares/verify");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const moment = require("moment");
const middlewares = require('./middlewares/middlewares');
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
middlewares(app);
//raw로 작성된 query module화 해서 가져올 것.
//URL 환경변수 처리

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use("/", testAPIRouter);
// app.use(express.json()); //body-parser 대신사용할수있음.

const port = process.env.PORT || 8080;
let testAPIRouter = require("./routes/testAPI");

//템플릿엔진 ejs 설정 __dirname +'views'랑 같음
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.send("hello World");
});

app.get("/api", (req, res) => {
  res.render("../views/index", { title: "api page" });
});

//닉네임 중복체크를 post로 던져서 select, 중복체크, false리턴
// 그 값에 따라서 alert 반환

//app.get("/mylink", cors(), verifyToken, (req,res,next)) => 사용자가 mylink를 클릭했을때
//get요청을보내서 login ID에 해당하는 결과물을 가져올 수 있도록
//로그인이 되지않았다면 에러를 반환해서 alert창 출력하도록하면 될듯
//DB설계를 해야겠네

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
const jwt = require("jsonwebtoken");

function test(req, res, next) {
  console.log('로그인 성공 후 next')
}
app.post(
  "/login",
  cors(accecptURL),
  createToken,
  test,
  (req, res, next) => {
    test();
    return res.status(400);
  }
);

app.post("/addcategory", cors(accecptURL), verifyToken, (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  console.log("전달받은 카테고리 명 : " + req.body.category);
  //현재 로그인된 id의 id를 외래키로 사용하는 categories 테이블에 user_id를 삽입하고
  //front에서 전달받은 category명을 테이블에 삽입함
  //카테고리 id도 외래키 userId로 얻을 수 있음
  let sql = `insert into categories (users_id, title) values 
  ((SELECT id from users WHERE nickname = ?), ?);
  `;
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
  let sql = `insert into links (title, price, link, info, categories_id, users_id, registerTime) values (?, ?, ?, ?, (select id from categories where title = '${currentCategory}'
    and users_id = (select id from users where nickname = '${req.currentUserNickname}')),
    (select id from users where nickname = '${req.currentUserNickname}'), ?)`;

  db.query(sql, [title, price, link, info, KST], (dbError, result) => {
    if (dbError) throw dbError;
  });
  return res.status(200).json({ message: "링크 추가 SUCCESS" });
});

app.get("/api/mylink", cors(accecptURL), verifyToken, (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("`Access-Control-Allow-Credentials", "http://localhost:3000");
  let sql = `select  categories.title as category, links.title as linkTitle , links.price as linkPrice, links.info as linkInfo,
  links.link as link,links.registerTime as registerTime,
  crawl.title as crawlTitle,
  crawl.price as crawlPrice,
  crawl.source as crawlSource,
  crawl.link as crawlLink,
  crawl.imgsrc as crawlImgSrc
 from users
 LEFT join categories on users.id = categories.users_id
 LEFT  join links on categories.id = links.categories_id
 LEFT  join crawl on links.id = crawl.links_id
 where users.nickname = '${req.currentUserNickname}'
 ORDER BY registerTime DESC`;

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
    { category, linkTitle, link, linkPrice, linkInfo, registerTime }
  ) => {
    categoryMap.get(category).push({
      title: linkTitle,
      link: link,
      price: linkPrice,
      info: linkInfo,
      date: registerTime,
      ssg: [],
      coupang: [],
      naver: [],
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
          };
          //해당링크카드(추가된 마지막 카드)에 ssg, coupang, naver키에 크롤데이터 push
          categoryMap
            .get(element.category)
            [categoryMap.get(element.category).length - 1][
              element.crawlSource
            ].push(tmp);
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
  let searchText = req.body.currentLinkTitle;

  //0 : 실패
  //1 : 성공
  //2 : 검색결과 없음

  let findLinkId = `select id from links where users_id =
  (select id from users where nickname = '${req.currentUserNickname}'
  and title ='${searchText}'
  )`;

  let sql = `
  select  categories.title as category, links.title as linkTitle , links.price as linkPrice, links.info as linkInfo,
  links.link as link,links.registerTime as registerTime,
  crawl.title as crawlTitle,
  crawl.price as crawlPrice,
  crawl.source as crawlSource,
  crawl.link as crawlLink,
  crawl.imgsrc as crawlImgSrc
 from users
 LEFT join categories on users.id = categories.users_id
 LEFT  join links on categories.id = links.categories_id
 LEFT  join crawl on links.id = crawl.links_id
 where links.title = '${searchText}' ORDER BY registerTime DESC;`;
  //데이터가 있다면 크롤러 수행하지 않고 그대로 저장
  db.query(sql, (err, result) => {
    if (result) {
      console.log("*****************");
      // console.log(result);
      console.log("*****************");
    }
  });
  db.query(findLinkId, (dbErr, dbResult) => {
    console.log("findID : ", dbResult[0].id);

    const crawlers = [
      ssgCrawler(searchText, dbResult[0].id),
      coupangCrawler(searchText, dbResult[0].id),
      naverCrawler(searchText, dbResult[0].id),
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
  const userId = req.currentUserNickname;
  const linkCardId = `select id from links where users_id =
  (select id from users where nickname = '${userId}'
  and title ='${title}'
  )`;
  db.query(linkCardId, (dbErr, dbResult) => {
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

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
