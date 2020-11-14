const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://addyour.link:3000");
  res.setHeader("Access-Control-Allow-Credentials",'true');
  try {
    console.log("토큰 확인");
	console.log(req.body.token);
    const clientToken = req.body.token;
    const decoded = jwt.verify(clientToken, "piTeam");
    if (decoded) {
      res.locals.userNickname = decoded.nickname;
	next();
    } else {
	console.error(err);
      res.status(401).json({ error: "unauthorized" });
    }
  } catch (err) {
	console.error(err);
    res.status(401).json({ error: "token expired" });
  }
};
exports.verifyToken = verifyToken;
