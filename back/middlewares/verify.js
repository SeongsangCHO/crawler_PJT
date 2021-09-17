const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const clientToken = req.headers.authorization.substring(7);
  jwt.verify(clientToken, "piTeam", (error, decoded) => {
    if (decoded) {
      next();
    } else {
      res.status(401).json({ error: "token expired" });
    }
  });
};

exports.verifyToken = verifyToken;
