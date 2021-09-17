const express = require("express");
const router = express.Router();

const link = require("./link.js");
const user = require("./user.js");
const crawl = require("./crawl.js");

router.use("/link", link);
router.use("/user", user);
router.use("/crawl", crawl);

module.exports = router;
