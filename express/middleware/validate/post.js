const { body, param } = require("express-validator");
const validate = require("./validate");
const { isValidObjectId } = require("mongoose");

// 发表
exports.createPost = validate([
  body("post.title").notEmpty().withMessage("标题不能为空"),
  body("post.describe").notEmpty().withMessage("发表内容不能为空"),
]);

// 更新
exports.updatePost = validate([
  body("post.title").notEmpty().withMessage("标题不能为空"),
  body("post.describe").notEmpty().withMessage("发表内容不能为空"),
  body("updatePostId").custom(async (value) => {
    if (!isValidObjectId(value)) {
      return Promise.reject("ID 错误");
    }
  }),
]);

// 删除
exports.deletePost = validate([
  body("postId").custom(async (value) => {
    if (!isValidObjectId(value)) {
      return Promise.reject("ID 错误");
    }
  }),
]);

// 发表评论
exports.commentPost = validate([
  body("comment.content").notEmpty().withMessage("评论内容不能为空"),
  param("postId").custom(async (value) => {
    if (!isValidObjectId(value)) {
      return Promise.reject("ID 错误");
    }
  }),
]);

// 获取评论 by postId
exports.getCommentsByPostId = validate([
  param("postId").custom(async (value) => {
    if (!isValidObjectId(value)) {
      return Promise.reject("ID 错误");
    }
  }),
]);
