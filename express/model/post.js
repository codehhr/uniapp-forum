const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const common = require("./common");

// 文章和作者关联起来, 用 mongoose 的 populate
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: null,
  },
  describe: {
    type: String,
    required: "",
  },
  categoryList: {
    type: [String],
    default: null,
  },
  albums: {
    type: [String],
    default: [],
  },
  like: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ...common,
});

module.exports = postSchema;
