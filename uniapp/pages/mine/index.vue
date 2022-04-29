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
  onShow() {
    this.getCurrentUser();
  },
  methods: {
    // 获取当前登录用户
    async getCurrentUser() {
      const res = await getCurrentUserApi().catch((e) => {});
      if (res && res.code == 401) {
        this.$refs.mineNotify.show({
          type: "warning",
          color: "#ffffff",
          bgColor: "#f9ae3d",
          message: res.msg,
          duration: 2000,
          fontSize: 16,
          safeAreaInsetTop: true,
          complete() {
            uni.navigateTo({
              url: "../login/index",
            });
          },
        });
      } else {
        this.userInfo = res.user;
      }
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
}
</style>
