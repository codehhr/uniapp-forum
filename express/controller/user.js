const { User } = require("../model");

// 用户注册
exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body);
    await user.save();
    res.status(200).json({
      code: 0,
      msg: "注册成功",
    });
  } catch (err) {
    next(err);
  }
};

// 用户登录
exports.login = async (req, res, next) => {
  try {
    res.status(200).json({
      code: 0,
      msg: "登录成功",
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    console.log(req.body);
    res.end("");
  } catch (err) {
    next(err);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  try {
    console.log(req.body);
    res.send("update /userinfo");
  } catch (err) {
    next(err);
  }
};
