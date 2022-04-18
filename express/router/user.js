// 用户模块

const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

// 用户注册
router.post("/register", userController.register);

// 用户登录
router.post("/login", userController.login);

// 获取当前用户信息
router.get("/userinfo", userController.getUserInfo);

// 更新当前用户信息
router.put("/userinfo", userController.updateUserInfo);

module.exports = router;
