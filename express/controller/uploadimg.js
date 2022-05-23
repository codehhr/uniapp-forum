const multer = require("multer");
const fs = require("fs");
const { host } = require("../config/config.default");

// 存储图片
exports.uploadImgStorage = multer({ dest: "static/imgs" }).single("img");

// get url
exports.getImgUrl = (req, res, next) => {
  try {
    let { filename, originalname } = req.file;
    let newFileTime = new Date()
      .toLocaleString()
      .split(" ")[0]
      .split("/")
      .join("_");
    let newFileExt =
      originalname.split(".")[originalname.split(".").length - 1];
    let newFilename = `${newFileTime}_${originalname
      .split(".")
      .join("_")}.${newFileExt}`;
    fs.renameSync(`./static/imgs/${filename}`, `./static/imgs/${newFilename}`);
    res.json({
      code: 0,
      msg: "图片上传成功",
      url: `${host}/imgs/${newFilename}`,
    });
  } catch (err) {
    next(err);
  }
};
