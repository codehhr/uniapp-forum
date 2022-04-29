// 路由错误处理中间件

const util = require("util");
module.exports = () => {
  return (err, req, res, next) => {
    res.json({
      code: -1,
      msg: util.format(err),
    });
  };
};
