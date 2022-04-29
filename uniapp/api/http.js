// 封装 http请求

import { BASE_URL } from "../config/config.default";

export const httpRequest = ({ url, method, data }) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method: method,
      data,
      header: {
        authentication: localStorage.getItem("token"),
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  }).catch((e) => {});
};
