const multer = require("multer");
const { host } = require("../config/config.default");

// 存储图片
exports.storage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./static/imgs");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${new Date(Date.now())
          .toLocaleString()
          .split(" ")[0]
          .split("/")
          .join("-")}-${file.originalname}`
      );
    },
  }),
}).single("img");

// get url
exports.getImgUrl = async (req, res, next) => {
  let { filename } = req.file;
  try {
    res.json({
      code: 0,
      msg: "图片上传成功",
      url: `http://127.0.0.1:9000/imgs/${filename}`,
    });
  } catch (err) {
    next(err);
  }
};
