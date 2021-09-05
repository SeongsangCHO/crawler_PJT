const express = require("express");
const router = express.Router();

const link = require("./link.js");
const user = require("./user.js");

router.use("/link", link);
router.use("/user", user);

module.exports = router;
