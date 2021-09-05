const { verifyToken } = require("../middlewares/verify");
const { insertLinkCardQuery } = require("../query/insertQuery");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const accecptURL = "http:/localhost:3000";

const router = require("express").Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/addlink", cors(accecptURL), verifyToken, (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  let { title, price, link, info, currentCategory, registerTime } = req.body;
  let KST = new Date(registerTime.toString());
  KST.setHours(KST.getHours() + 9);
  let sql = insertLinkCardQuery(req, currentCategory);
  db.query(sql, [title, price, link, info, KST], (dbError, result) => {
    if (dbError) throw dbError;
  });
  return res.status(200).json({ message: "링크 추가 SUCCESS" });
});

router.post("/categories", cors(accecptURL), verifyToken, (req, res) => {
  console.log("in categories");

  const clientToken = req.headers.authorization.substring(7);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  let { id, nickname } = jwt.decode(clientToken, "piTeam");
  // db.query()
});

module.exports = router;
