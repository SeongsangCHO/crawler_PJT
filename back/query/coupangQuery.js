const db = require("../config/db_config");
const SUCCESS = 1;
const FAILURE = 0;

function dataInsert(productData, linkId) {
  productData
    .filter((obj) => {
      return obj.priority <= 10;
    })
    .forEach((filterd) => {
      db.query(
        `
      INSERT INTO crawl(links_id, title, price, priority, source, link, imgsrc)
      VALUES(?, ?, ?, ?, ?, ?, ?)
    `,
        [
          linkId,
          filterd.title,
          filterd.price,
          filterd.priority,
          "coupang",
          filterd.link,
          filterd.imgsrc,
        ],
        function (error,) {
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