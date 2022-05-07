// 封装 http请求

import { BASE_URL } from "../config/config.default";

export const httpRequest = ({ url, method, data = "", headers = {} }) => {
  let authentication = uni.getStorageSync("token");
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method: method,
      data,
      header: {
        authentication,
        ...headers,
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
