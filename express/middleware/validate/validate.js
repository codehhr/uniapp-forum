// 数据验证中间件

const { validationResult } = require("express-validator");

// 接收验证规则，返回一个函数
module.exports = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      res.send({ msg: errors.array() });
    }
  };
};
