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
        <uni-easyinput
          v-model="loginForm.email"
          placeholder="请输入邮箱"
          @confirm="validateLoginForm('loginForm')"
        />
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
      <u-button type="primary" @click="validateLoginForm('loginForm')">
        登录
      </u-button>
    </uni-forms>

    <view class="login-page-bottom">
      <view class="login-page-botton-left"></view>
      <view class="to-register" @click="loginRedirectToRegister">去注册</view>
    </view>

    <!-- notify -->
    <u-notify ref="loginNotify"></u-notify>
  </view>
</template>

<script>
import { loginApi } from "../../api/user";
import { isEmail } from "../../utils/index";

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
            {
              validateFunction: (rule, value, data, callback) => {
                if (!isEmail(value)) {
                  callback("邮箱格式不正确");
                }
              },
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
      this.$refs[ref]
        .validate()
        .then((data) => {
          this.login(data);
        })
        .catch((e) => {});
    },

    // 登录
    async login(data) {
      const res = await loginApi(data).catch((e) => {});
      if (res && res.code === 0) {
        uni.setStorageSync("token", res && res.token ? res.token : "");
        this.$refs.loginNotify.show({
          type: "primary",
          color: "#ffffff",
          bgColor: "#3c9cff",
          message: res.msg,
          duration: 1000,
          fontSize: 16,
          safeAreaInsetTop: true,
          complete() {
            uni.navigateBack();
          },
        });
      } else {
        this.$refs.loginNotify.show({
          type: "warning",
          color: "#ffffff",
          bgColor: "#f9ae3d",
          message: this.extracteErrMsg(res && res.msg ? res.msg : []),
          duration: 1500,
          fontSize: 16,
          safeAreaInsetTop: true,
        });
      }
    },

    // 提取 err msg
    extracteErrMsg(msg) {
      let errMsg = "Error";
      for (const values of msg) {
        if (values.param == "user.email") {
          errMsg = values.msg;
          continue;
        } else {
          errMsg = values.msg;
          continue;
        }
      }
      return errMsg;
    },

    // 登录页重定向到注册页
    loginRedirectToRegister() {
      uni.redirectTo({
        url: "../register/index",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-page {
  padding: 40rpx;
  background-color: #ffffff;
  .login-page-bottom {
    margin: 40rpx 10rpx 0;
    display: flex;
    justify-content: space-between;
    .to-register {
      color: #3c9cff;
    }
  }
}
</style>
