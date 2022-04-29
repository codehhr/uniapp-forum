// 用户模块

const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const userValidator = require("../middleware/validate/user");
const auth = require("../middleware/auth");

// 用户注册
router.post("/register", userValidator.register, userController.register);

// 用户登录
router.post("/login", userValidator.login, userController.login);

// 获取当前登录用户
router.get("/self", auth, userController.getUser);

module.exports = router;

// const { body, validationResult } = require("express-validator");
// const { User } = require("../model/index");
// // Registration 用户注册
// router.post(
//   "/register",
//   [
//     // 1. 配置验证规则
//     body("username")
//       .notEmpty()
//       .withMessage("用户名不能为空")
//       .custom(async (value) => {
//         // 查询数据库 查看数据是否存在
//         const user = await User.findOne({ username: value });
//         if (user) {
//           return Promise.reject("用户已存在");
//         }
//       }),
//     body("password").notEmpty().withMessage("密码不能为空"),
//     body("email")
//       .notEmpty()
//       .withMessage("邮箱不能为空")
//       .isEmail()
//       .withMessage("邮箱格式不正确")
//       .bail() // 如果错误就不向下执行
//       .custom(async (value) => {
//         // 查询数据库查看数据是否存在
//         const user = await User.findOne({ email: value });
//         if (user) {
//           return Promise.reject("邮箱已存在");
//         }
//       }),
//   ],
//   (req, res, next) => {
//     // 2. 判断验证结果
//     const errors = validationResult(req);
//     // 验证失败
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     } else {
//       // 验证通过，放行
//       next();
//     }
//   },
//   userCtrl.register
// ); // 3. 通过验证，执行具体的控制器处理
