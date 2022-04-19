const mongoose = require("mongoose");
const operateTime = require("./operateTime");
const md5 = require("../utils/md5");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    default: "",
  },
  password: {
    type: String,
    required: true,
    set: (value) => md5(value),
  },
  avatar: {
    type: String,
    default: "",
  },
  ...operateTime,
});

module.exports = userSchema;
