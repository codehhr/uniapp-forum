const { verify } = require("../utils/jwt");
const { jwtSecret } = require("../config/config.default");
const { User } = require("../model/index");

module.exports = async (req, res, next) => {
  // 从请求头获取 token 数据
  let token = req.headers.authentication;
  if (!token) {
    res.json({
      code: 401,
      msg: "请先登录",
    });
  } else {
    try {
      // 验证 token 是否有效
      const decodedToken = await verify(token, jwtSecret);
      req.user = await User.findById(decodedToken.userId);
      next();
    } catch (err) {
      res.status(401).end();
    }
  }
};
