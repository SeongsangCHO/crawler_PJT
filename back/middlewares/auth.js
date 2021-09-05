const jwt = require("jsonwebtoken");
let db = require("../config/db_config");
const bcrypt = require("bcrypt");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const createToken = async function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { nickName, password } = req.body;
  console.log(nickName, password);

  try {
    //front에서 보낸요청과 db에서 꺼낸 데이터가 일치하는지 확인하고
    //일치하면 토큰발행
    let sql = `select * from users where nickname = '${nickName}'`;

    db.query(sql, (error, result) => {
      console.log(result, password);

      if (result[0] && result[0].nickname === nickName) {
        bcrypt.compare(password, result[0].password, function (err, hash) {
          if (hash) {
            const token = jwt.sign(
              {
                nickname: nickName,
              },
              "piTeam",
              {
                expiresIn: "1h",
              }
            );
            res.cookie("user", token, {
              httpOnly: false,
              expires: new Date(Date.now() + 1 * 3600000), // cookie will be removed after 8 hours
            });

            return res.status(200, {}).json({
              result: "ok",
              token,
            });
          } else {
            console.log("다름");

            return res.status(400).json({ error: "비밀번호가 달라요" });
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

exports.createToken = createToken;
