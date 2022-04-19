const { Post } = require("../model");

// create post
exports.createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    res.status(200).json({
      code: 0,
      msg: "发表成功",
    });
  } catch (err) {
    next(err);
  }
};
