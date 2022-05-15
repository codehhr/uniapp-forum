import { httpRequest } from "./http";

// 身份验证
export const authenticateApi = (url) => {
  return httpRequest({
    url,
    method: "POST",
    headers: {
      authentication: uni.getStorageSync("token"),
    },
  });
};
