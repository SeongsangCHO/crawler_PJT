//db 설정 파일
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "34.64.89.203",
  port: 3306,
  user: "secho",
  password: "1234",
  database: "PI_DB",
});

connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;
