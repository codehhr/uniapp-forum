// 时间格式化
export const formatTime = (time) => {
  return new Date(time).toLocaleString();
};

// 判断是否是正确的邮箱格式
export const isEmail = (email) => {
  return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
    email
  );
};
