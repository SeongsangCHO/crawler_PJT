let express = require("express");
let router = express.Router();

let db = require("../config/db_config");

router.get("/testapi", function (req, res) {
  let sql = `select * from testAPI`;
  try {
    db.query(sql, (error, result) => {
      if (error) console.error(error);
      console.log(result[0].user_id);
      res.render("../views/testapi.ejs", {db_data :result[0] });
    });
  } catch (error) {
    if (error) console.error(error);
  }
});

module.exports = router;
