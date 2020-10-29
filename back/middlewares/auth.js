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
            const token = jwt.sign(
              {
                nickname: req.body.user_nickname,
              },
              "piTeam",
              {
                expiresIn: "30m",
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
            console.log("비밀번호달라");
            
            return res.status(400).json({ error: "비밀번호가 달라요" });
          }
        });
      }
      else{
        return res.status(400).json({ error: "그런 닉네임은 없어요" });

      }
    });
  } catch (error) {
    console.error(error);
  }
};
