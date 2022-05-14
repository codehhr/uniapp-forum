const multer = require("multer");
const fs = require("fs");

// 存储图片
let storage = multer.diskStorage({
  // destination: (req, file, callback) => {
  //   callback(null, "./static/imgs");
  // },
  filename: (req, file, callback) => {
    callback(
      null,
      `${new Date(Date.now())
        .toLocaleString()
        .split(" ")[0]
        .split("/")
        .join("-")}-${file.originalname}`
    );
  },
});
exports.uploadImgStorage = multer({ dest: "static/imgs" }).single("img");

// get url
exports.getImgUrl = (req, res, next) => {
  try {
    let { filename, originalname } = req.file;
    fs.renameSync(`./static/imgs/${filename}`, `./static/imgs/${originalname}`);
    res.json({
      code: 0,
      msg: "图片上传成功",
      url: `http://127.0.0.1:9000/static/imgs/${originalname}`,
    });
  } catch (err) {
    next(err);
  }
};
