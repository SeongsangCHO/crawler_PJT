const jwt = require("jsonwebtoken");
let db = require("../config/db_config");
const bcrypt = require("bcrypt");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const createToken = async function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", true);

  try {
    //front에서 보낸요청과 db에서 꺼낸 데이터가 일치하는지 확인하고
    //일치하면 토큰발행
    let sql = `select * from users where nickname = '${req.body.user_nickname}'`;

    db.query(sql, (error, result) => {
      if (error) console.error(error);
      if (result[0] && result[0].nickname === req.body.user_nickname) {
        bcrypt.compare(
          req.body.user_password,
          result[0].password,
          function (err, hash) {
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
                  expiresIn: "1m",
                }
              );
              //날짜를 지정해주지 않아서 만료시간없이 session으로 저장되었음.
              //서버에 저장할게 아니라 이 토큰자체를 fe로 전달해서 fe내 로컬스토리지 또는 쿠키에 저장해야함.
              //프론트에서 받은 토큰으로
              res.cookie("user", token, {
                maxAge: 1*3600*1000,
                httpOnly:false
                // expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
              });

              return res.status(200,{
              }).json({
                result: "ok",
                token,
              });
            } else {
              return res.status(400).json({ error: "비밀번호가 달라요" });
            }
          }
        );
      } else {
        return res.status(400).json({ error: "그런 닉네임은 없어요" });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

exports.createToken = createToken;
