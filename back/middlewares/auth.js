const jwt = require("jsonwebtoken");
let db = require("../config/db_config");
const bcrypt = require("bcrypt");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const createToken = async function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const { nickName, password } = req.body;
  try {
    let sql = `select * from users where nickname = '${nickName}'`;
    db.query(sql, (error, result) => {
      const {
        id: dbId,
        nickname: dbNickname,
        password: dbPassword,
      } = result[0];

      if (result && dbNickname === nickName) {
        bcrypt.compare(password, dbPassword, (err, hash) => {
          if (hash) {
            const token = jwt.sign(
              {
                id: dbId,
                nickname: nickName,
              },
              "piTeam",
              {
                expiresIn: "1d",
              }
            );
            return res.json({
              status: 200,
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
