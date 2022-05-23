const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const common = require("./common");

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postItem: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  ...common,
});

module.exports = commentSchema;
