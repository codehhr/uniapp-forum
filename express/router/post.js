// 帖子模块

const express = require("express");
const router = express.Router();
const postController = require("../controller/post");
const imgController = require("../controller/uploadimg");
const postValidator = require("../middleware/validate/post");
const auth = require("../middleware/auth");

// 获取帖子列表
router.get("/list", postController.getPostList);

// 上传图片
router.post("/upload", auth, imgController.storage, imgController.getImgUrl);

// 发帖
router.post(
  "/create",
  auth,
  postValidator.createPost,
  postController.createPost
);

// 获取帖子
router.get("/:postId", postValidator.getPostById, postController.getPostById);

module.exports = router;
