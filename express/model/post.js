const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = postSchema;
