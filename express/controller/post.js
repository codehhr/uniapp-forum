const { Post } = require("../model/index");
const ObjectId = require("bson").ObjectId;

// get postList
exports.getPostList = async (req, res, next) => {
  try {
    let {
      pageSize = 10,
      pageNum = 1,
      category = 0,
      author = 0,
      keywords = "",
    } = req.query;

    let queryParams = {
      $and: [
        keywords
          ? {
              $or: [
                { title: eval(`/${keywords}/`) },
                { describe: eval(`/${keywords}/`) },
              ],
            }
          : {},
        author != 0 ? { author: ObjectId(author) } : {},
        category != 0 ? { category } : {},
      ],
    };
    let postList = await Post.find(queryParams)
      .sort({ updateTime: -1, createTime: 1 })
      .skip((pageNum - 1) * pageSize)
      .limit(pageNum * pageSize)
      .populate("author");
    let totalCount = await Post.find(queryParams).countDocuments();
    res.json({
      code: 0,
      msg: "获取成功",
      postList,
      totalCount,
    });
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

// update post
exports.updatePost = async (req, res, next) => {
  try {
    const result = await Post.updateOne(
      { _id: ObjectId(req.body.updatePostId) },
      { $set: { ...req.body.post } }
    ).catch((e) => {});
    if (result.acknowledged && result.matchedCount && result.modifiedCount) {
      res.json({
        code: 0,
        msg: "更新成功",
      });
    }
  } catch (err) {
    next(err);
  }
};

// delete post
exports.deletePostById = async (req, res, next) => {
  try {
    const result = await Post.deleteOne({ _id: ObjectId(req.body.postId) });
    if (result.acknowledged && result.deletedCount) {
      res.json({
        code: 0,
        msg: "删除成功",
      });
    } else {
      res.json({
        code: -1,
      });
    }
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

// create comment
exports.createComment = async (req, res, next) => {
  try {
    console.log(req);
  } catch (err) {
    next(err);
  }
};
