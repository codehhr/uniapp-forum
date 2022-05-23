const { Post, Comment } = require("../model/index");
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
      .sort({ createTime: -1, updateTime: -1 })
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
      { $set: { updateTime: Date.now(), ...req.body.post } }
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
      code: 0,
      post,
    });
  } catch (err) {
    next(err);
  }
};

// create comment
exports.createComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      res.status(404).json({
        code: -1,
        msg: "ID错误",
      });
    } else {
      const comment = new Comment(req.body.comment);
      comment.author = req.user._id;
      comment.postItem = req.params.postId;
      comment.populate("author");
      comment.populate("postItem");
      await comment.save();
      res.json({
        code: 0,
        comment,
      });
    }
  } catch (err) {
    next(err);
  }
};

// get comments by postId
exports.getCommentsByPostId = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      res.status(404).json({
        code: -1,
        msg: "ID错误",
      });
    } else {
      const comments = await Comment.find({
        postItem: ObjectId(req.params.postId),
      }).populate("author");
      await Post.updateOne(
        { _id: ObjectId(req.params.postId) },
        { $set: { comments: comments.length } }
      ).catch((e) => {});
      res.json({
        code: 0,
        comments,
      });
    }
  } catch (err) {
    next(err);
  }
};
