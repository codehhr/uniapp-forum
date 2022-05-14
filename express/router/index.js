const express = require("express");
const router = express.Router();

// 用户
router.use("/user", require("./user"));

// 帖子
router.use("/post", require("./post"));

module.exports = router;
