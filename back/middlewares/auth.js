const jwt = require("jsonwebtoken");
let db = require("../config/db_config");
const bcrypt = require("bcrypt");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.createToken = async function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  try {
    //front에서 보낸요청과 db에서 꺼낸 데이터가 일치하는지 확인하고
    //일치하면 토큰발행
    let sql = `select * from users where nickname = '${req.body.user_nickname}'`;

    db.query(sql, (error, result) => {
      if (error) console.error(error);
      if (result[0] && result[0].nickname === req.body.user_nickname) {
        bcrypt.compare(req.body.user_password, result[0].password, function (
          err,
          hash
        ) {
          if (err) {
            throw err;
          }

          if (hash) {
            console.log(req.body.user_password);
            console.log(result[0].password);
            const token = jwt.sign(
              {
                nickname: req.body.user_nickname,
              },
              "piTeam",
              {
                expiresIn: "1m",
              }
            );
            console.log(token);
            res.cookie("user", token);
            res.status(200).json({
              result: "ok",
              token,
            });
            console.log("토큰발행성공");
          } else {
            res.status(400).json({ error: "invalid user" });
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};
