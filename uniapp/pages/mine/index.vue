<template>
  <view class="mine-page">
    <view v-if="userInfo">
      <view>{{ userInfo.username }}</view>
      <view>{{ userInfo.email }}</view>
      <u-avatar
        class="user-avatar"
        :src="userInfo.avatar"
        mpde="widthFix"
        randomBgColor
        fontSize="40rpx"
      ></u-avatar>
    </view>

    <u-button type="primary" text="登录" @click="mineNavToLogin"></u-button>
    <u-button type="primary" text="注册" @click="mineNavToRegister"></u-button>

    <view class="get-my-postlist">
      <u-button
        type="primary"
        plain
        text="我发布的"
        size="small"
        @click="mineNavToPostList"
      ></u-button>
    </view>
    <!-- notify -->
    <u-notify ref="mineNotify"></u-notify>
  </view>
</template>

<script>
import { getCurrentUserApi } from "../../api/user";

export default {
  data() {
    return {
      userInfo: {},
    };
  },
  onReady() {
    this.getCurrentUser(0);
  },

  onPullDownRefresh() {
    this.getCurrentUser();
  },

  methods: {
    // 获取当前登录用户
    async getCurrentUser(onReady) {
      let that = this;
      const res = await getCurrentUserApi().catch((e) => {});
      if (res && res.code === 0) {
        // !==0 : 首次加载不弹出提示
        if (onReady !== 0) {
          this.$refs.mineNotify.show({
            type: "primary",
            color: "#ffffff",
            bgColor: "#3c9cff",
            message: res.msg,
            duration: 1000,
            fontSize: 16,
            safeAreaInsetTop: true,
          });
        }
        this.userInfo = res && res.userInfo ? res.userInfo : "";
      } else if (!res || (res && res.code === 401)) {
        // !==0 : 首次加载不弹出提示
        if (onReady !== 0) {
          this.$refs.mineNotify.show({
            type: "warning",
            color: "#ffffff",
            bgColor: "#f9ae3d",
            message: res.msg || "请先登录",
            duration: 1000,
            fontSize: 16,
            safeAreaInsetTop: true,
          });
        }
      }
      uni.stopPullDownRefresh();
    },

    mineNavToLogin() {
      uni.navigateTo({
        url: "../login/index",
      });
    },
    mineNavToRegister() {
      uni.navigateTo({
        url: "../register/index",
      });
    },
    mineNavToPostList() {
      uni.navigateTo({
        url: "../mypost/index",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.mine-page {
  padding: 40rpx;
  background-color: #ffffff;
  button {
    margin: 40rpx 0;
  }
  .get-my-postlist {
    width: 200rpx;
    margin: 0 auto;
  }
}
</style>
