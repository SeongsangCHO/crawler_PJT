let express = require("express");
let path = require("path");
let ssgCrawler = require("./crawler/ssgCrawler");
let coupangCrawler = require("./crawler/coupangCrawler");
let multi = require("./crawler/multi");
let cluster = require("./crawler/cluster");
var cors = require("cors");
const accecptURL = "http:/localhost:3000";
let db = require("./config/db_config");
const bcrypt = require("bcrypt");
const loginAuth = require("./middlewares/auth");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "piTeam";
const HASH_ROUND = 10;
const { verifyToken } = require("./middlewares/verify");
var cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

const port = process.env.PORT || 80;
let testAPIRouter = require("./routes/testAPI");
const { start } = require("repl");
const naverCrawler = require("./crawler/naverCrawler");

//템플릿엔진 ejs 설정 __dirname +'views'랑 같음
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", testAPIRouter);
app.use(express.json()); //body-parser 대신사용할수있음.
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

  //userData의 password를 bcrpt로 해싱
  // res.render("../views/userRegister", {user_data: req.body});
});
//클릭시 처리를 어떻게 해야할까
//https://stackoverflow.com/questions/55647287/how-to-send-request-on-click-react-hooks-way

//클릭데이터를 서버에 전달해야하는뎀.

//login시 auth에서 로그인데이터가 일치할시 jwt발행, 발급받은 데이터 front에 전달..
app.post(
  "/login",
  cors(accecptURL),
  loginAuth.createToken,
  (req, res, next) => {
    return res.status(400);
  }
);

app.post("/addcategory", cors(accecptURL), verifyToken, (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  console.log("현재 로그인된 사용자 아이디: " + res.locals.userNickname);
  console.log("전달받은 카테고리 명 : " + req.body.category);
  //현재 로그인된 id의 id를 외래키로 사용하는 categories 테이블에 user_id를 삽입하고
  //front에서 전달받은 category명을 테이블에 삽입함
  //카테고리 id도 외래키 userId로 얻을 수 있음
  let sql = `insert into categories (users_id, title) values 
  ((SELECT id from users WHERE nickname = ?), ?);
  `;
  db.query(
    sql,
    [res.locals.userNickname, req.body.category],
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
  const { title, price, link, info, currentCategory } = req.body;

  let sql = `insert into links (title, price, link, info, categories_id, users_id) values (?, ?, ?, ?, (select id from categories where title = '${currentCategory}'
  and users_id = (select id from users where nickname = '${res.locals.userNickname}')),
  (select id from users where nickname = '${res.locals.userNickname}'))`;

  db.query(sql, [title, price, link, info], (dbError, result) => {
    if (dbError) throw dbError;
  });
  return res.status(200).json({ message: "링크 추가 SUCCESS" });
});

//크롤러는 하나임, 데이터를 저장할 크롤러 하나 뿐
//링크박스 추가시 크롤러데이터를 저장할 부분과 클릭할 때 이를 가져올 부분을 따로 작성해야함.
//링크박스가 저장될때마다 ,요청이 발생할때마다 호출할 함수 crawler
//링크박스의 제목을 기반으로 크롤러 수행
//크롤러 데이터를 db에 저장함
//
app.get("/api/mylink", cors(accecptURL), verifyToken, (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  let sql = `select  categories.title as category, links.title as linkTitle , links.price as linkPrice, links.info as linkInfo,
  links.link as link,
  crawl.title as crawlTitle,
  crawl.price as crawlPrice,
  crawl.source as crawlSource,
  crawl.link as crawlLink
 from users
 LEFT join categories on users.id = categories.users_id
 LEFT  join links on categories.id = links.categories_id
 LEFT  join crawl on links.id = crawl.links_id
 where users.nickname = '${res.locals.userNickname}';`;
  console.log(res.locals.userNickname);

  let mylinkData = {
    category: [],
  };

  let categoryMap = new Map();

  db.query(sql, (err, result) => {
    if (result) {
      result.map((element, idx) => {
        if (!categoryMap.get(element.category)) {
          categoryMap.set(element.category, []);
        }
        let tmpLink = element.link;

        if (
          categoryMap.get(element.category)[
            categoryMap.get(element.category).length - 1
          ] == undefined ||
          categoryMap.get(element.category)[
            categoryMap.get(element.category).length - 1
          ].link !== tmpLink
        ) {
          // console.log("in",categoryMap.get(element.category)[
          //   categoryMap.get(element.category).length - 1
          // ]);

          categoryMap.get(element.category).push({
            title: element.linkTitle,
            link: element.link,
            price: element.linkPrice,
            info: element.linkInfo,
            ssg: [],
            coupang: [],
            naver: [],
          });
        }
        if (element.crawlTitle !== null) {
          let tmp = {
            title: element.crawlTitle,
            price: element.crawlPrice,
            link: element.crawlLink,
          };
          // console.log(tmp);

          categoryMap
            .get(element.category)
            [categoryMap.get(element.category).length - 1][
              element.crawlSource
            ].push(tmp);
        }
      });
    }
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
  let status = "쓱 ,쿠팡 크롤러";

  //0 : 실패
  //1 : 성공
  //2 : 검색결과 없음

  let findLinkId = `select id from links where users_id =
  (select id from users where nickname = '${res.locals.userNickname}'
  and title ='${searchText}'
  )`;
  db.query(findLinkId, (dbErr, dbResult) => {
    console.log("findID : ", dbResult[0].id);

    // ssgCrawler(searchText, dbResult[0].id).then((result) => {
    //   //끝나면 리턴받긴하네
    //   //크롤러들의 수행이 끝나면 성공값을 리턴해야함.

    //   console.log(result);
    // });
    // coupangCrawler(searchText, dbResult[0].id).then((result) => {
    //   console.log(result);
    //   return res.status(200).json({ message: "성공?" });
    // });
    const crawlers = [
      ssgCrawler(searchText, dbResult[0].id),
      coupangCrawler(searchText, dbResult[0].id),
      naverCrawler(searchText, dbResult[0].id),
    ];
    Promise.all(crawlers).then((result) => {
      console.log(result);
      return res.status(200).json({ message: "성공" });
    });
  });
  console.log("이걸안기다려주네");
});

app.get("/coupang", (req, res) => {
  let status = "쿠팡크롤러";
  coupangCrawler();
  res.send(status);
});
app.get("/multi", (req, res) => {
  let status = "멀티플 크롤러";
  naverCrawler("물",19);
  res.send(status);
});

app.get("/cluster", (req, res) => {
  let status = "클러스터 크롤러";
  cluster();
  res.send(status);
});
app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
