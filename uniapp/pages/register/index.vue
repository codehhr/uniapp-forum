<template>
  <view class="register-page">
    <uni-forms
      ref="registerForm"
      :modelValue="registerForm"
      label-position="top"
      :rules="registerRules"
    >
      <!-- 用户名 -->
      <uni-forms-item label="用户名" name="username">
        <uni-easyinput
          v-model="registerForm.username"
          placeholder="请输入用户名"
          @confirm="validateRegisterForm('registerForm')"
        />
      </uni-forms-item>

      <!-- 邮箱 -->
      <uni-forms-item label="邮箱" name="email">
        <uni-easyinput
          v-model="registerForm.email"
          placeholder="请输入邮箱"
          @confirm="validateRegisterForm('registerForm')"
        />
      </uni-forms-item>

      <!-- 密码 -->
      <uni-forms-item label="密码" name="password">
        <uni-easyinput
          v-model="registerForm.password"
          placeholder="请输入密码"
          @confirm="validateRegisterForm('registerForm')"
        />
      </uni-forms-item>

      <!-- 提交 -->
      <u-button type="primary" @click="validateRegisterForm('registerForm')">
        注册
      </u-button>
    </uni-forms>

    <!-- bottom -->
    <view class="register-page-bottom">
      <view class="register-page-botton-left"></view>
      <view class="to-login" @click="registerRedirectToLogin">去登录</view>
    </view>

    <!-- notify -->
    <u-notify ref="registerNotify"></u-notify>
  </view>
</template>

<script>
import { registerApi } from "../../api/user";
import { isEmail } from "../../utils/index";

export default {
  data() {
    return {
      registerForm: {},
      registerRules: {
        username: {
          rules: [
            {
              required: true,
              errorMessage: "用户名不能为空",
            },
          ],
        },
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
    // 数据校验
    validateRegisterForm(ref) {
      this.$refs[ref]
        .validate()
        .then((data) => {
          this.register(data);
        })
        .catch((err) => {});
    },

    // 注册
    async register(data) {
      const res = await registerApi(data).catch((e) => {});
      if (res && res.code === 0) {
        this.$refs.registerNotify.show({
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
        this.$refs.registerNotify.show({
          type: "warning",
          color: "#ffffff",
          bgColor: "#f9ae3d",
          message: this.extracteErrMsg(res.msg || []),
          duration: 2000,
          fontSize: 16,
          safeAreaInsetTop: true,
        });
      }
    },

    // 提取 err msg
    extracteErrMsg(msg) {
      let errMsg = "Error";
      for (const values of msg) {
        if (values.param == "user.username") {
          errMsg = values.msg;
          continue;
        } else if (values.param == "user.email") {
          errMsg = values.msg;
          continue;
        } else {
          errMsg = values.msg;
          continue;
        }
      }
      return errMsg;
    },

    // 重定向到登录页面
    registerRedirectToLogin() {
      uni.redirectTo({
        url: "../login/index",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.register-page {
  padding: 40rpx;
  background-color: #ffffff;
  .register-page-bottom {
    margin: 40rpx 10rpx 0;
    display: flex;
    justify-content: space-between;
    .to-login {
      color: #3c9cff;
    }
  }
}
</style>
