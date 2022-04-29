<script>
export default {
  globalData: {
    currentPostItem: {},
  },
  onLaunch: function () {},
  onShow: function () {},
  onHide: function () {},
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "./uni_modules/uni-scss/index.scss";
@import "./uni_modules/uview-ui/index.scss";
/* #ifndef APP-NVUE */
@import "/static/customicons.css";
// 设置整个项目的背景色
page {
  background-color: #f1f1f1;
}

/* #endif */
.example-info {
  font-size: 14px;
  color: #333;
  padding: 10px;
}
</style>
