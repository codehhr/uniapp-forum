import { httpRequest } from "./http";

// 注册
export const registerApi = (data) => {
  return httpRequest({
    url: "/user/register",
    method: "POST",
    data,
  });
};

// 登录
export const loginApi = (data) => {
  return httpRequest({
    url: "/user/login",
    method: "POST",
    data,
  });
};
