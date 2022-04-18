// 用户模块验证

const { body } = require("express-validator");
const validate = require("./validate");
const { User } = require("../../model");
const md5 = require("../../utils/md5");

// 用户注册
exports.register = [
  validate([
    body("username").notEmpty().withMessage("用户名不能为空"),
    body("password").notEmpty().withMessage("密码不能为空"),
    body("email").notEmpty().withMessage("邮箱不能为空"),
  ]),

  validate([
    body("username").custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        return Promise.reject("此用户名已存在");
      }
    }),
    body("password").isLength({ min: 5 }).withMessage("密码最少5位"),
    body("email")
      .isEmail()
      .withMessage("邮箱格式不正确")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("此邮箱已存在");
        }
      }),
  ]),
];

// 用户登录
exports.login = [
  validate([
    body("email").notEmpty().withMessage("邮箱不能为空"),
    body("password").notEmpty().withMessage("密码不能为空"),
  ]),

  validate([
    body("email").custom(async (email, { req }) => {
      const user = await User.findOne({ email }).select(["password"]);
      if (!user) {
        return Promise.reject("用户不存在");
      }
      // 将数据挂载到请求对象中，如果后续的中间件使用，就不需要重复查询了
      req.user = user;
    }),
  ]),
  // 验证密码是否正确
  validate([
    body("password").custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject("密码错误");
      }
    }),
  ]),
];
