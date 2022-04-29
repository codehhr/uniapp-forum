// 用户模块验证

const { body } = require("express-validator");
const validate = require("./validate");
const { User } = require("../../model/index");
const md5 = require("../../utils/md5");

// 用户注册
exports.register = [
  validate([
    body("user.username").notEmpty().withMessage("用户名不能为空"),
    body("user.email").notEmpty().withMessage("邮箱不能为空"),
    body("user.password").notEmpty().withMessage("密码不能为空"),
  ]),

  validate([
    body("user.username").custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        return Promise.reject("此用户名已存在");
      }
    }),

    body("user.email")
      .isEmail()
      .withMessage("请填入正确的邮箱格式")
      .bail()
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          return Promise.reject("此邮箱已存在");
        }
      }),

    body("user.password").isLength({ min: 5 }).withMessage("密码最少5位"),
  ]),
];

// 用户登录
exports.login = [
  validate([
    body("user.email").notEmpty().withMessage("邮箱不能为空"),
    body("user.password").notEmpty().withMessage("密码不能为空"),
  ]),

  validate([
    body("user.email")
      .isEmail()
      .withMessage("请填入正确的邮箱格式")
      .custom(async (email, { req }) => {
        const user = await User.findOne({ email }).select("password");
        if (!user) {
          return Promise.reject("用户不存在");
        }
        req.user = user;
      }),
  ]),

  validate([
    body("user.password")
      .isLength({ min: 5 })
      .withMessage("密码最少5位")
      .custom(async (password, { req }) => {
        const correctPassword =
          req.user.password ||
          (await User.findOne({ email: req.body.user.email }).select(
            "password"
          ));
        if (md5(password) !== correctPassword) {
          return Promise.reject("密码错误");
        }
      }),
  ]),
];
