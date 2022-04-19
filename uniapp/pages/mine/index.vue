<template>
  <view class="mine-page">
    <u-button type="primary" text="登录" @click="navLogin"></u-button>
    <u-button type="primary" text="注册" @click="navRegister"></u-button>
  </view>
</template>

<script>
export default {
  methods: {
    navLogin() {
      uni.navigateTo({
        url: "../login/index",
      });
    },
    navRegister() {
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
  button {
    margin: 40rpx 0;
  }
}
</style>
