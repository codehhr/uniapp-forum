// 帖子模块

const express = require("express");
const router = express.Router();
const postController = require("../controller/post");
const postValidator = require("../middleware/validate/post");
const auth = require("../middleware/auth");

// 获取帖子列表
router.get("/list", postController.getPost);

// 发帖
router.post(
  "/create",
  auth,
  postValidator.createPost,
  postController.createPost
);

module.exports = router;
