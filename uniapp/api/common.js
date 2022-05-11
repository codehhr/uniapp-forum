export const uploadImgApi = {
  api: "https://api.imgbb.com/1/upload",
  key: "f4db4def99f3ec584c9e4c734815d16f",
};

import { httpRequest } from "./http";

// 身份验证
export const authenticateApi = (url) => {
  return httpRequest({
    url,
    method: "POST",
  });
};
