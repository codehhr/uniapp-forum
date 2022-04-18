const mongoose = require("mongoose");
const operateTime = require("./operateTime");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  operateTime,
});

module.exports = userSchema;
