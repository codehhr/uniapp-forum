const { User } = require("../model");

exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    res.end();
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body);
    console.log(user);
    await user.save();
    // user = JSON.parse(user);
    res.status(200).json({ user });
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
