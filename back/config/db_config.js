//db 설정 파일
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "pidb.czdbnwk1waar.us-east-2.rds.amazonaws.com",
  port: 3306,
  user: "secho",
  password: "1a2a3a4a",
  database: "PI_DB",
});

connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;
