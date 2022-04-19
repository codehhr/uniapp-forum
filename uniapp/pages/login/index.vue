<template>
  <view class="login-page">
    <uni-forms
      ref="loginForm"
      :modelValue="loginForm"
      label-position="top"
      :rules="loginRules"
    >
      <!-- 邮箱 -->
      <uni-forms-item label="邮箱" name="email">
        <uni-easyinput v-model="loginForm.email" placeholder="请输入邮箱" />
      </uni-forms-item>

      <!-- 密码 -->
      <uni-forms-item label="密码" name="password">
        <uni-easyinput
          v-model="loginForm.password"
          placeholder="请输入密码"
          @confirm="validateLoginForm('loginForm')"
        />
      </uni-forms-item>

      <!-- 提交 -->
      <u-button type="primary" @click="validateLoginForm('loginForm')"
        >提交</u-button
      >
    </uni-forms>

    <!-- uView toast -->
    <u-toast ref="loginToast"></u-toast>
  </view>
</template>

<script>
import { loginApi } from "../../utils/api";

export default {
  data() {
    return {
      loginForm: {},
      loginRules: {
        email: {
          rules: [
            {
              required: true,
              errorMessage: "邮箱不能为空",
            },
          ],
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: "密码不能为空",
            },
            {
              minLength: 5,
              errorMessage: "密码至少 {minLength} 个字符",
            },
          ],
        },
      },
    };
  },
  methods: {
    // 验证 form
    validateLoginForm(ref) {
      this.$refs[ref].validate().then((data) => {
        this.login(data);
        // if (res.code === 0) {
        //   this.showToast({
        //     type: "success",
        //     title: "成功主题(带图标)",
        //     message: "庄生晓梦迷蝴蝶",
        //     iconUrl: "https://cdn.uviewui.com/uview/demo/toast/success.png",
        //   });
        // } else {
        //   this.showToast({
        //     type: "error",
        //     icon: false,
        //     title: "失败主题",
        //     message: "一弦一柱思华年",
        //     iconUrl: "https://cdn.uviewui.com/uview/demo/toast/error.png",
        //   });
        // }
      });
    },

    async login(data) {
      const res = await loginApi(data);
      console.log("res");
      console.log(res);
    },

    showToast(params) {
      this.$refs.loginToast.show({
        ...params,
        complete() {
          uni.navigateBack();
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-page {
  padding: 40rpx;
}
</style>
