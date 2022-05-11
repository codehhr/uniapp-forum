const { Post } = require("../model/index");

// get postList
exports.getPostList = async (req, res, next) => {
  try {
    let { pageSize = 10, pageNum = 1 } = req.query;
    let postList = await Post.find({})
      .sort({ createTime: -1, updateTime: 1 })
      .skip((pageNum - 1) * pageSize)
      .limit(pageNum * pageSize)
      .populate("author");
    let totalCount = await Post.find({}).countDocuments();
    if (!postList.length) {
      res.json({
        code: 0,
        msg: "暂时没有人发帖",
        postList,
        totalCount,
      });
    } else {
      res.json({
        code: 0,
        msg: "获取成功",
        postList,
        totalCount,
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

// get post by Id
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate("author");
    if (!post) {
      return res.status(404).end();
    }
    res.status(200).json({
      post,
    });
  } catch (err) {
    next(err);
  }
};
