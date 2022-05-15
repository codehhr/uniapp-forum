import { httpRequest } from "./http";

// 获取帖子列表
export const getAllPostListApi = (data) => {
  return httpRequest({
    url: "/post/list",
    method: "GET",
    data,
  });
};

// 发帖
export const createPostApi = (data) => {
  return httpRequest({
    url: "/post/create",
    method: "POST",
    data: { post: data },
    headers: {
      authentication: uni.getStorageSync("token"),
    },
  });
};

// 更新
export const updatePostApi = (data) => {
  return httpRequest({
    url: "/post/update",
    method: "POST",
    data,
    headers: {
      authentication: uni.getStorageSync("token"),
    },
  });
};

// 删帖
export const deletePostByIdApi = (data) => {
  return httpRequest({
    url: "/post/delete",
    method: "POST",
    data,
    headers: {
      authentication: uni.getStorageSync("token"),
    },
  });
};

// 获取帖子 by id
export const getPostByIdApi = (postId) => {
  return httpRequest({
    url: `/post/${postId}`,
    method: "GET",
  });
};

// 点赞;
export const likePostApi = (data) => {
  return httpRequest({
    url: "/post/like",
    method: "POST",
    data,
    headers: {
      authentication: uni.getStorageSync("token"),
    },
  });
};
