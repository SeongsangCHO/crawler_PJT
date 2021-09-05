const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const clientToken = req.headers.authorization.substring(7);
  jwt.verify(clientToken, "piTeam", (error, decoded) => {
    if (decoded) {
      console.log(decoded);

      next();
    } else {
      res.status(401).json({ error: "token expired" });
    }
  });
};

exports.verifyToken = verifyToken;
