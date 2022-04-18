// #ifndef VUE3
import Vue from "vue";
import App from "./App";
import uView from "./uni_modules/uview-ui";

Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  uView,
  ...App,
});

// Vue.prototype.$getPostList = ({ pageSize, pageNum }) => {
//   return new Promise((resove, reject) => {
//     uni.request({
//       url: `https://showme2.myhope365.com/api/bbs/bbsPosts/open/list`,
//       success: (res) => {
//         if (res.statusCode == 200 && res.data.resources.length >= 0) {
//           resove(res);
//         } else {
//           reject(res);
//         }
//       },
//     });
//   });
// };

app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
