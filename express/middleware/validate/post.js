const { body } = require("express-validator");
const validate = require("./validate");

exports.createArticle = validate([
  body("title").notEmpty().withMessage("文章标题不能为空"),
  body("describe").notEmpty().withMessage("文章内容不能为空"),
]);
