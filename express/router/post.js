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
router.post(
  "/upload",
  auth,
  imgController.uploadImgStorage,
  imgController.getImgUrl
);

// 发帖
router.post(
  "/create",
  auth,
  postValidator.createPost,
  postController.createPost
);

// 更新帖
router.post(
  "/update",
  auth,
  postValidator.updatePost,
  postController.updatePost
);

// 删帖
router.post(
  "/delete",
  auth,
  postValidator.deletePost,
  postController.deletePostById
);

// 根据 id 获取帖子
router.get("/:postId", postController.getPostById);

// 发布评论
router.post(
  "/:postId/comment",
  auth,
  postValidator.commentPost,
  postController.createComment
);

// 根据帖子获取评论
router.get(
  "/:postId/comments",
  auth,
  postValidator.getCommentsByPostId,
  postController.getCommentsByPostId
);

module.exports = router;
