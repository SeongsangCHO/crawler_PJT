const db = require("../config/db_config");
var express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const cors = require("cors");
const { createToken } = require("../middlewares/auth");
const HASH_ROUND = 10;

const accecptURL = "http:/localhost:3000";

router.post("/doublecheck", cors(accecptURL), (req, res, next) => {
  console.log("요청옴");

  const { nickName } = req.body;
  let sql = `select * from users where nickname = '${nickName}'`;
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  db.query(sql, (error, result) => {
    console.log(result);
    if (result == "") {
      return res.status(200).json({ message: "중복체크 success" });
    }
    if (result[0].nickname == nickName) {
      console.log("select한 결과 있음");
      console.log(result);
      return res.status(400).json({ error: "message" });
    }
  });
});

router.post("/register", cors(accecptURL), (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { nickName, password } = req.body;

  try {
    bcrypt.hash(password, HASH_ROUND, (bcryptError, hashPassword) => {
      let sql = `insert into users (nickname, password) values(?, ?)`;
      db.query(sql, [nickName, hashPassword], (dbError, result) => {
        if (dbError) {
          throw dbError;
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
  return res.status(200).json({ message: "가입 success" });
});

router.post("/login", cors(accecptURL), createToken, (req, res, next) => {
  return res.status(400);
});

module.exports = router;
