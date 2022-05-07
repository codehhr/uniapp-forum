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
  });
};

// 获取帖子
export const getPostByIdApi = (postId) => {
  return httpRequest({
    url: `/post/${postId}`,
    method: "GET",
  });
};
