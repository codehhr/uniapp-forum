const { body } = require("express-validator");
const validate = require("./validate");

// 发表
exports.createPost = validate([
  body("post.title").notEmpty().withMessage("标题不能为空"),
  body("post.describe").notEmpty().withMessage("发表内容不能为空"),
]);
