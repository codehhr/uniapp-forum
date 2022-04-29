const { Post } = require("../model/index");

// get post
exports.getPost = async (req, res, next) => {
  try {
    let postList = await Post.find({}).populate("author");
    if (!postList.length) {
      res.json({
        code: -1,
        msg: "暂没有人发帖",
      });
    } else {
      res.json({
        code: 0,
        msg: "获取成功",
        postList,
      });
    }
  } catch (err) {
    next(err);
  }
};

// create post
exports.createPost = async (req, res, next) => {
  try {
    let post = new Post(req.body.post);
    post.author = req.user._id;
    post.populate("author");
    await post.save();
    res.json({
      code: 0,
      msg: "发表成功",
      post,
    });
  } catch (err) {
    next(err);
  }
};
