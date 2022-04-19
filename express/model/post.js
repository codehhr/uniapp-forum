const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const operateTime = require("./operateTime");

// 文章和作者关联起来, 用 mongoose 的 populate
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  describe: {
    type: String,
    required: true,
  },
  categoryList: {
    type: [String],
    default: null,
  },
  album: {
    type: [String],
    default: null,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ...operateTime,
});

module.exports = postSchema;
