const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const common = require("./common");

const commentSchema = new Schema({
  content: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ...common,
});

module.exports = commentSchema;
