const mongoose = require("mongoose");
const common = require("./common");
const md5 = require("../utils/md5");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    default: "",
  },
  password: {
    type: String,
    required: true,
    select: false,
    set: (value) => md5(value),
  },
  avatar: {
    type: String,
    default: "",
  },
  intro: {
    type: String,
    default: "",
  },
  ...common,
});

module.exports = userSchema;
