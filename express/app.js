const express = require("express");
const router = require("./router");
const morgan = require("morgan");
const cors = require("cors");
const errHandler = require("./middleware/errHandler");
require("./model");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// 异常处理中间件
app.use(errHandler());

app.listen(PORT, () => {
  console.log(`server start at ${PORT}`);
});
