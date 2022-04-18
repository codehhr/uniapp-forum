const mongoose = require("mongoose");
const { dbUrl } = require("../config/config.default");

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("Mongod Err !", err);
    } else {
      console.log("Mongod Connected !");
    }
  }
);

module.exports = {
  User: mongoose.model("User", require("./user")),
  Post: mongoose.model("Post", require("./post")),
};
