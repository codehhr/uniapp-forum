const { User } = require("../model/index");
const { sign } = require("../utils/jwt");
const { jwtSecret } = require("../config/config.default");

// 用户注册
exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body.user);
    await user.save();
    res.json({
      code: 0,
      msg: "注册成功",
    });
  } catch (err) {
    next(err);
  }
};

// Authentication 用户登录
exports.login = async (req, res, next) => {
  try {
    // 生成 token
    const token = await sign({ userId: req.user._id }, jwtSecret, {
      expiresIn: 60 * 60 * 24,
    });

    res.json({
      code: 0,
      msg: "登录成功",
      token,
    });
  } catch (err) {
    next(err);
  }
};

// 获取当前登录用户信息
exports.getUserInfo = (req, res, next) => {
  try {
    res.json({
      code: 0,
      msg: "获取成功",
      userInfo: req.user,
    });
  } catch (err) {
    next(err);
  }
};
