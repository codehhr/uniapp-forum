<template>
  <view class="post-page">
    <uni-forms
      ref="postForm"
      :modelValue="postForm"
      label-position="top"
      :rules="postFormRules"
    >
      <!-- 标题 -->
      <uni-forms-item label="标题" name="title">
        <uni-easyinput
          v-model="postForm.title"
          placeholder="请输入标题"
          @confirm="validatePostForm('postForm')"
        />
      </uni-forms-item>

      <!-- 副标题 -->
      <uni-forms-item label="副标题" name="subtitle">
        <uni-easyinput
          v-model="postForm.subtitle"
          placeholder="请输入副标题 (非必填)"
          @confirm="validatePostForm('postForm')"
        />
      </uni-forms-item>

      <!-- 分类 -->
      <uni-forms-item label="分类" name="category">
        <!-- mask start -->
        <view class="post-category-mask-outer">
          <uni-easyinput
            class="post-category"
            v-model="postForm.category"
            placeholder="点击选择分类"
            :clearable="false"
            @click="categoryListShow = true"
          />
          <view
            @click="categoryListShow = true"
            class="post-category-mask-inner"
          ></view>
        </view>
        <!-- mask end -->
        <u-action-sheet
          :actions="categoryList"
          :show="categoryListShow"
          cancelText="取消"
          round="20rpx"
          :closeOnClickAction="true"
          :safeAreaInsetBottom="true"
          :closeOnClickOverlay="true"
          @close="categoryListShow = false"
          @select="handleSelectCategory"
        ></u-action-sheet>
      </uni-forms-item>

      <!-- describe -->
      <uni-forms-item label="内容" name="describe">
        <uni-easyinput
          type="textarea"
          autoHeight
          v-model="postForm.describe"
          placeholder="说点什么吧 ~"
          @confirm="validatePostForm('postForm')"
        />
      </uni-forms-item>

      <!-- 发布-->
      <u-button type="primary" @click="validatePostForm('postForm')">
        发布
      </u-button>
    </uni-forms>

    <!-- notify -->
    <u-notify ref="postNotify"></u-notify>
  </view>
</template>

<script>
import { createPostApi } from "../../api/post";

export default {
  data() {
    return {
      categoryList: [
        {
          name: "科技",
          value: 1,
        },
        {
          name: "全部",
          value: 0,
        },
        {
          name: "医疗",
          value: 2,
        },
      ],
      categoryListShow: false,
      postForm: {
        albums: [
          "https://cdn.uviewui.com/uview/album/1.jpg",
          "https://cdn.uviewui.com/uview/album/2.jpg",
          "https://cdn.uviewui.com/uview/album/3.jpg",
          "https://cdn.uviewui.com/uview/album/4.jpg",
          "https://cdn.uviewui.com/uview/album/5.jpg",
          "https://cdn.uviewui.com/uview/album/6.jpg",
          "https://cdn.uviewui.com/uview/album/7.jpg",
          "https://cdn.uviewui.com/uview/album/8.jpg",
          "https://cdn.uviewui.com/uview/album/9.jpg",
          "https://cdn.uviewui.com/uview/album/10.jpg",
        ],
      },
      postFormRules: {
        title: {
          rules: [
            {
              required: true,
              errorMessage: "标题不能为空",
            },
          ],
        },
        category: {
          rules: [
            {
              required: true,
              errorMessage: "请选择分类",
            },
          ],
        },
        describe: {
          rules: [
            {
              required: true,
              errorMessage: "发表内容不能为空",
            },
          ],
        },
      },
    };
  },
  methods: {
    // 验证 form
    validatePostForm(ref) {
      this.$refs[ref]
        .validate()
        .then((data) => {
          this.createPost(data);
        })
        .catch((e) => {});
    },

    // 发布
    async createPost(data) {
      const res = await createPostApi({
        albums: this.postForm.albums,
        category: this.postForm.category,
        ...data,
      }).catch((e) => {});
      console.log(res);
      if (res && res.code === 0) {
        this.$refs.postNotify.show({
          type: "primary",
          color: "#ffffff",
          bgColor: "#3c9cff",
          message: res.msg,
          duration: 1000,
          fontSize: 16,
          safeAreaInsetTop: true,
        });
      } else {
        this.$refs.postNotify.show({
          type: "warning",
          color: "#ffffff",
          bgColor: "#f9ae3d",
          message: res.msg[0].msg,
          duration: 2000,
          fontSize: 16,
          safeAreaInsetTop: true,
        });
      }
    },

    // 选择分类
    handleSelectCategory(item) {
      this.postForm.category = item.name;
    },
  },
};
</script>

<style lang="less" scoped>
.post-page {
  padding: 40rpx;
  background-color: #ffffff;

  .post-category-mask-outer {
    position: relative;
    .post-category-mask-inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      z-index: 11;
    }
  }
}
</style>
