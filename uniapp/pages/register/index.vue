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
        />
      </uni-forms-item>

      <!-- 邮箱 -->
      <uni-forms-item label="邮箱" name="email">
        <uni-easyinput v-model="registerForm.email" placeholder="请输入邮箱" />
      </uni-forms-item>

      <!-- 密码 -->
      <uni-forms-item label="密码" name="password">
        <uni-easyinput
          v-model="registerForm.password"
          placeholder="请输入密码"
        />
      </uni-forms-item>

      <!-- 提交 -->
      <u-button type="primary" @click="submitRegister('registerForm')"
        >提交</u-button
      >
    </uni-forms>
  </view>
</template>

<script>
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
    // 注册
    submitRegister(ref) {
      this.$refs[ref]
        .validate()
        .then((res) => {})
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.register-page {
  padding: 40rpx;
}
</style>
