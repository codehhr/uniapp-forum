import { httpRequest } from "./http";

// 帖子列表
export const getAllPostListApi = () => {
  return httpRequest({
    url: "/post/list",
    method: "GET",
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
