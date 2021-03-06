const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  try {
    console.log("토큰 확인");

    console.log(req.cookies);
    const clientToken = req.cookies.user;
    const decoded = jwt.verify(clientToken, "piTeam");

    if (decoded) {
      res.locals.userNickname = decoded.nickname;
      next();
    } else {
      res.status(401).json({ error: "unauthorized" });
    }
  } catch (err) {
    res.status(401).json({ error: "token expired" });
  }
};
exports.verifyToken = verifyToken;
