const router = require("express").Router();
const { verifyToken } = require("../middlewares/verify");
const cors = require("cors");
const db = require("../config/db_config");
const jwt = require("jsonwebtoken");
const {
  selectCrawlTargetLinkCardIdQuery,
  selectCrawlList,
} = require("../query/selectQuery");
const ssgCrawler = require("../crawler/ssgCrawler");
const naverCrawler = require("../crawler/naverCrawler");
const coupangCrawler = require("../crawler/coupangCrawler");
const accecptURL = "http:/localhost:3000";

router.post("/run", cors(accecptURL), verifyToken, (req, res) => {
  const clientToken = req.headers.authorization.substring(7);
  let { id } = jwt.decode(clientToken, "piTeam");
  let searchTitle = req.body.currentLinkTitle;

  const sql = selectCrawlTargetLinkCardIdQuery(id, searchTitle);
  db.query(sql, (dbErr, result) => {
    const crawlers = [
      ssgCrawler(searchTitle, result[0].id),
      coupangCrawler(searchTitle, result[0].id),
      naverCrawler(searchTitle, result[0].id),
    ];
    //0 : 실패
    //1 : 성공
    //2 : 검색결과 없음
    Promise.all(crawlers).then((result) => {
      console.log("crawl결과", result);
      return res.status(200).json({ message: "크롤링 성공" });
    });
  });
});

router.get("/list/:id", cors(accecptURL), verifyToken, (req, res) => {
  const { id } = req.params; // links Id
  console.log("crawl/list:id", id, req.params);
  const sql = selectCrawlList(id);
  db.query(sql, (dbErr, result) => {
    if (dbErr) {
      return res.status(500).json({ message: "ListError" });
    }
    console.log("crawl/list/:id", result);
    return res.status(200).json({ crawlList: result });
  });
});

module.exports = router;
