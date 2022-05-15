const { body, param } = require("express-validator");
const validate = require("./validate");
const mongoose = require("mongoose");

// exports. = validate([
//   body("post.title").notEmpty().withMessage("标题不能为空"),
//   body("post.describe").notEmpty().withMessage("发表内容不能为空"),
// ]);
