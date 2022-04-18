const express = require("express");
const router = express.Router();

// 用户
router.use("/user", require("./user"));

// 帖子
router.use("/post", require("./post"));

// 分类
router.use("/category", require("./category"));

module.exports = router;
