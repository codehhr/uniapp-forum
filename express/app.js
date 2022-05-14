const express = require("express");
const router = require("./router");
const morgan = require("morgan");
const cors = require("cors");
const errHandler = require("./middleware/errHandler");
// const path = require("path");
const app = express();
const PORT = process.env.PORT || 9000;
require("./model");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(errHandler());
// app.use(express.static(path.join(__dirname, "static")));

app.listen(PORT, () => {
  console.log(`server start at ${PORT}`);
});
