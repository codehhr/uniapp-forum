const mongoose = require("mongoose");
const { dbUrl } = require("../config/config.default");

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    config: { autoIndex: false },
  },

  (err) => {
    if (err) {
      console.log("Mongod Err !", err);
    } else {
      console.log("****************************************\n");
      console.log("\tMongod Connected !\n");
      console.log("****************************************");
    }
  }
);

module.exports = {
  User: mongoose.model("User", require("./user")),
  Post: mongoose.model("Post", require("./post")),
};
