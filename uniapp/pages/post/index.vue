<template>
  <view class="post-page">
    <uni-forms
      ref="postForm"
      :model="postForm"
      label-position="top"
      :rules="postFormRules"
    >
      <!-- 标题 -->
      <uni-forms-item label="标题" name="title">
        <uni-easyinput
          v-model="postForm.title"
          :focus="titleFocus"
          placeholder="请输入标题"
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
          />
          <u-button
            class="post-category-mask-inner"
            type="primary"
            plain
            :loading="!categoryList.length"
            :text="
              categoryList[postForm.category] &&
              categoryList[postForm.category].name
                ? categoryList[postForm.category].name
                : ''
            "
            @click="categoryListShow = true"
          ></u-button>
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
          maxlength="-1"
          :focus="describeFocus"
          v-model="postForm.describe"
          placeholder="说点什么吧 ~"
          @confirm="validatePostForm('postForm')"
        />
      </uni-forms-item>

      <u-upload
        :fileList="albums"
        @afterRead="afterRead"
        @delete="removePic"
        name="albums"
        multiple
        width="320rpx"
        height="180rpx"
      >
      </u-upload>

      <!-- 发布-->
      <u-button type="primary" @click="validatePostForm('postForm')">
        发布
      </u-button>
    </uni-forms>

    <!-- notify -->
    <u-notify ref="postNotify"></u-notify>

    <!-- click back to top start -->
    <u-back-top
      :scroll-top="scrollTop"
      top="600"
      right="40"
      icon="arrow-up"
      :duration="100"
      :iconStyle="{ fontSize: '36rpx', color: '#ffffff' }"
      :customStyle="{ backgroundColor: '#494f5c', opacity: '0.6' }"
    ></u-back-top>
    <!-- click back to top end -->
  </view>
</template>

<script>
import { createPostApi } from "../../api/post";
import { uploadImgApi } from "../../config/config.default";

export default {
  data() {
    return {
      albums: [],
      scrollTop: 0,
      titleFocus: false,
      describeFocus: false,
      categoryList: [
        {
          name: "全部",
          value: 0,
        },
        {
          name: "科技",
          value: 1,
        },
        {
          name: "医疗",
          value: 2,
        },
      ],
      categoryListShow: false,
      postForm: {
        category: 0,
        albums: [
          // "https://cdn.uviewui.com/uview/album/1.jpg",
          // "https://cdn.uviewui.com/uview/album/2.jpg",
          // "https://cdn.uviewui.com/uview/album/3.jpg",
          // "https://cdn.uviewui.com/uview/album/4.jpg",
          // "https://cdn.uviewui.com/uview/album/5.jpg",
          // "https://cdn.uviewui.com/uview/album/6.jpg",
          // "https://cdn.uviewui.com/uview/album/7.jpg",
          // "https://cdn.uviewui.com/uview/album/8.jpg",
          // "https://cdn.uviewui.com/uview/album/9.jpg",
          // "https://cdn.uviewui.com/uview/album/10.jpg",
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

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },

  methods: {
    // 验证 form
    validatePostForm(ref) {
      if (!this.postForm.title) {
        this.titleFocus = true;
      } else if (!this.postForm.describe) {
        this.describeFocus = true;
      }
      this.$refs[ref]
        .validate()
        .then((data) => {
          this.createPost();
        })
        .catch((e) => {});
    },

    // 发布
    async createPost() {
      const res = await createPostApi(this.postForm).catch((e) => {});
      console.log(res);
      if (res && res.code === 0) {
        this.postForm = {};
        this.$refs.postNotify.show({
          type: "primary",
          color: "#ffffff",
          bgColor: "#3c9cff",
          message: res.msg,
          duration: 1000,
          fontSize: 16,
          safeAreaInsetTop: true,
          complete() {
            uni.switchTab({
              url: "../index/index",
            });
          },
        });
      } else if (!res || (res && res.code == 401)) {
        this.$refs.postNotify.show({
          type: "warning",
          color: "#ffffff",
          bgColor: "#f9ae3d",
          message: res && res.msg ? res.msg : "请先登录",
          duration: 1000,
          fontSize: 16,
          safeAreaInsetTop: true,
          complete() {
            uni.navigateTo({
              url: "../login/index",
            });
          },
        });
      } else {
        this.$refs.postNotify.show({
          type: "warning",
          color: "#ffffff",
          bgColor: "#f9ae3d",
          message: res.msg[0].msg,
          duration: 1500,
          fontSize: 16,
          safeAreaInsetTop: true,
        });
      }
    },

    // 选择分类
    handleSelectCategory(item) {
      this.postForm.category = item.value;
    },

    // 移除图片
    removePic(event) {
      this.albums.splice(event.index, 1);
    },

    // 新增图片
    async afterRead(event) {
      let tempImglists = event.file;
      let fileListLen = this.albums.length;
      tempImglists.map((item) => {
        this.albums.push({
          ...item,
          // status: "uploading",
          // message: "待上传",
        });
      });
      for (let i = 0; i < tempImglists.length; i++) {
        const url = await this.uploadImg(tempImglists[i]);
        let item = this.albums[fileListLen];
        console.log(item);
        this.albums.splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: "success",
            // message: "",
            url,
          })
        );
        fileListLen++;
      }
    },

    // 上传图片
    uploadImg(item) {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: uploadImgApi.api,
          filePath: item.url,
          name: "image",
          formData: {
            key: uploadImgApi.key,
            name: item.name,
          },
          success: (res) => {
            resolve(JSON.parse(res.data).data.url);
          },
        });
      });
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
      z-index: 11;
    }
  }
}
</style>
