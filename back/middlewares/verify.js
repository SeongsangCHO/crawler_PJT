const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    if(!req.cookies.user){
      throw err;
    }
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

const tokenDecode = (req) =>{
  const decodedToken = jwt.verify(req.cookies.user, "piTeam");
  return decodedToken;
}
exports.verifyToken = verifyToken;
exports.tokenDecode = tokenDecode;
