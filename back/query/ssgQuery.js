const db = require("../config/db_config");
const SUCCESS = 1;
const FAILURE = 0;

function dataInsert(crawlerData, linkId) {
  //필터로 갯수 조절
  //성공하면 return되도록
  console.log("링크 아이디", linkId);

  crawlerData
    .filter((obj) => {
      return obj.priority <= 8;
    })
    .forEach((filterd) => {
      db.query(
        `
    INSERT INTO crawl(links_id, title, price,  priority, source, link,imgsrc)
    VALUES(?, ?, ?, ?, ?, ?,? )`,
        [
          linkId,
          filterd.title,
          filterd.price,
          filterd.priority,
          "ssg",
          filterd.link,
          filterd.imgsrc,
        ],
        function (error) {
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
