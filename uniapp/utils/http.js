// 封装 http请求

const BASE_URL = "http://127.0.0.1:4000/api";

export const httpRequest = ({ url, method, data }) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method: method,
      data: JSON.stringify(data),
      header: {
        "Content-Type": "application/json",
      },
      success: (res) => {
        console.log(res.data);
        if (res.data.code && res.data.code === 0) {
          resolve(res.data);
        } else {
          reject(res.data.msg);
        }
      },
      fail: (err) => {
        uni.showToast({
          title: "请求失败 !",
        });
        reject(err);
      },
    });
  }).catch((e) => {});
};
