const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    if(!req.cookies.user){
      throw err;
    }
    console.log("토큰 확인");
    const clientToken = req.cookies.user;
    const decoded = jwt.verify(clientToken, "piTeam");
    req.currentUserNickname = decoded.nickname;
    //서버 로컬로 유저닉네임을 정하면 안됨. 매 로그인마다 값이 바뀌게 될 것임.

    if (decoded) {
      // res.locals.userNickname = decoded.nickname;
      next();
    } else {
      res.status(401).json({ error: "unauthorized" });
    }
  } catch (err) {
    res.status(401).json({ error: "token expired" });
  }
};

exports.verifyToken = verifyToken;
