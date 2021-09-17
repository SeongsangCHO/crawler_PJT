const { verifyToken } = require("../middlewares/verify");
const {
  insertLinkCardQuery,
  insertCategoryQuery,
  insertLinkCard,
} = require("../query/insertQuery");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const accecptURL = "http:/localhost:3000";
const db = require("../config/db_config");
const {
  selectCategories,
  selectLinkCardList,
  selectProducts,
  selectCards,
} = require("../query/selectQuery");

const router = require("express").Router();

// router.get("/linkcardlist/:id", cors(accecptURL), verifyToken, (req, res) => {
//   const { id } = req.params;
//   const sql = selectLinkCardList(id);
//   db.query(sql, (dbError, result) => {
//     if (dbError) throw dbError;
//     return res.status(200).json({ linkCardList: result });
//   });
// });

// router.post("/addlink", cors(accecptURL), verifyToken, (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   let { title, price, link, info, currentCategory, registerTime } = req.body;
//   let KST = new Date(registerTime.toString());
//   KST.setHours(KST.getHours() + 9);
//   let sql = insertLinkCardQuery(req, currentCategory);
//   db.query(sql, [title, price, link, info, KST], (dbError, result) => {
//     if (dbError) throw dbError;
//   });
//   return res.status(200).json({ message: "링크 추가 SUCCESS" });
// });

router.get("/categories", cors(accecptURL), verifyToken, (req, res) => {
  const clientToken = req.headers.authorization.substring(7);
  let { id } = jwt.decode(clientToken, "piTeam");
  let sql = selectCategories(id);
  db.query(sql, (dbError, result) => {
    if (dbError) {
      return res.status(500).json({ message: "DB_ERROR" });
    }
    const categories = result;
    return res.status(200).json({ categories });
  });
});

router.post("/categories", cors(accecptURL), verifyToken, (req, res) => {
  const clientToken = req.headers.authorization.substring(7);
  const { category } = req.body;
  let { id } = jwt.decode(clientToken, "piTeam");
  if (category) {
    const sql = insertCategoryQuery(id, category);
    db.query(sql, (dbError, result) => {
      if (dbError) {
        throw dbError;
      }
      const { insertId } = result;
      return res.status(200).json({ id: insertId, title: category });
    });
  }
  return res.status(500);
});

router.get("/products", cors(accecptURL), verifyToken, (req, res) => {
  const clientToken = req.headers.authorization.substring(7);
  let { id } = jwt.decode(clientToken, "piTeam");

  const sql = selectProducts(36);
  db.query(sql, (dbError, result) => {
    if (dbError) throw dbError;

    return res.status(200).json({ products: result });
  });
});

router.get("/cards", cors(accecptURL), verifyToken, (req, res) => {
  const clientToken = req.headers.authorization.substring(7);
  let { id } = jwt.decode(clientToken, "piTeam");
  const sql = selectCards(id);
  db.query(sql, (dbError, result) => {
    if (dbError) throw dbError;
    return res.status(200).json({ cards: result });
  });
});

router.post("/addcard", cors(accecptURL), verifyToken, (req, res, next) => {
  const clientToken = req.headers.authorization.substring(7);
  let { id } = jwt.decode(clientToken, "piTeam");
  let { title, price, link, info, categoryId, registerTime } = req.body;
  let KST = new Date(registerTime.toString());
  KST.setHours(KST.getHours() + 9);
  let sql = insertLinkCard(id, categoryId);
  db.query(sql, [title, price, link, info, KST], (dbError, result) => {
    if (dbError) throw dbError;
    return res.status(200).json({ id: result.insertId });
  });
});
module.exports = router;
