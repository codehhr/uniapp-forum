const { body, param } = require("express-validator");
const validate = require("./validate");
const mongoose = require("mongoose");

// 发表
exports.createPost = validate([
  body("post.title").notEmpty().withMessage("标题不能为空"),
  body("post.describe").notEmpty().withMessage("发表内容不能为空"),
]);

// 更新
exports.updatePost = validate([
  body("post.title").notEmpty().withMessage("标题不能为空"),
  body("post.describe").notEmpty().withMessage("发表内容不能为空"),
]);

// 验证 ObjectId
exports.isValidObjectId = (location, fields) => {
  return buildCheckFunction(location)(fields).custom(async (value) => {
    if (!isValidObjectId(value)) {
      return Promise.reject("ID 不是一个有效的 ObjectID");
    }
  });
};
