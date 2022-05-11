const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const common = require("./common");

// 文章和作者关联起来, 用 mongoose 的 populate
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    required: "",
  },
  category: {
    type: Number,
    default: 0,
  },
  albums: {
    type: [],
    default: [],
  },
  like: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ...common,
});

module.exports = postSchema;
