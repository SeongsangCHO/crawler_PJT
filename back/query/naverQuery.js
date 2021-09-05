const db = require("../config/db_config");
const SUCCESS = 1;
const FAILURE = 0;

function dataInsert(crawlerData, linkId) {
  crawlerData
    .filter((obj) => {
      return obj.priority <= 8;
    })
    .forEach((filtered) => {
      db.query(
        //insert time, update time 넣기, now()
        `
      INSERT INTO crawl(links_id, title, price, priority, source, link,imgsrc)
      VALUES(?, ?, ?, ?, ?, ?,?)
      `,
        [
          linkId,
          filtered.title,
          filtered.price,
          filtered.priority,
          "naver",
          filtered.link,
          filtered.imgsrc,
        ],
        function (error, result) {
          if (error) {
            console.error(error);
            return FAILURE;
          }
        }
      );
    });
  return SUCCESS;
}

exports.dataInsert = dataInsert;
