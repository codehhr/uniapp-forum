const multer = require("multer");
const fs = require("fs");
const { host } = require("../config/config.default");

// 存储图片
exports.uploadImgStorage = multer({ dest: "static/imgs" }).single("img");

// get url
exports.getImgUrl = (req, res, next) => {
  try {
    let { filename, originalname } = req.file;
    fs.renameSync(`./static/imgs/${filename}`, `./static/imgs/${originalname}`);
    res.json({
      code: 0,
      msg: "图片上传成功",
      url: `${host}/imgs/${originalname}`,
    });
  } catch (err) {
    next(err);
  }
};
