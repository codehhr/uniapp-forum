const mongoose = require("mongoose");
const common = require("./common");
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
    select: false,
    set: (value) => md5(value),
  },
  avatar: {
    type: String,
    default: "https://cdn.uviewui.com/uview/album/1.jpg",
  },
  ...common,
});

module.exports = userSchema;
