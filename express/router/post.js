// 帖子模块

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.send("get /post");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
