const { body, param } = require("express-validator");
const validate = require("./validate");
const mongoose = require("mongoose");

// 发表
exports.createPost = validate([
  body("post.title").notEmpty().withMessage("标题不能为空"),
  body("post.describe").notEmpty().withMessage("发表内容不能为空"),
]);

// 获取帖子
exports.getPostById = validate([
  param("postId").custom(async (value) => {
    if (!mongoose.isValidObjectId(value)) {
      return Promise.reject("文章ID类型错误");
    }
  }),
]);

// 上传图片
// exports.uploadImg = uploadImg([]);
