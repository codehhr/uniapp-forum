const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// 生成 jwt
jwt.sign(
  {
    name: "hhr",
  },
  "abcdef",
  // 异步生成 token
  (err, token) => {
    if (err) return console.log("生成 token 失败");
    // console.log("生成token成功: ", token);
  }
);

// 验证 jwt
jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "abcdef",
  (err, res) => {}
);

// 转成 Promise 形式

// 解析
exports.sign = promisify(jwt.sign);

// 验证
exports.verify = promisify(jwt.verify);

// 不验证直接解析
exports.decode = promisify(jwt.decode);
