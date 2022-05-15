import { httpRequest } from "./http";

// 注册
export const registerApi = (data) => {
  return httpRequest({
    url: "/user/register",
    method: "POST",
    data: { user: data },
    headers: {
      authentication: uni.getStorageSync("token"),
    },
  });
};

// 登录
export const loginApi = (data) => {
  return httpRequest({
    url: "/user/login",
    method: "POST",
    data: { user: data },
    headers: {
      authentication: uni.getStorageSync("token"),
    },
  });
};

// 获取当前登录用户
export const getCurrentUserApi = () => {
  return httpRequest({
    url: "/user/self",
    method: "GET",
    headers: {
      authentication: uni.getStorageSync("token"),
    },
  });
};
