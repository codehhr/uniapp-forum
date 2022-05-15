<template>
  <view class="post-page">
    <uni-forms
      ref="postForm"
      :model="postForm"
      label-position="top"
      :label-width="320"
      :rules="postFormRules"
    >
      <!-- 标题 -->
      <uni-forms-item label="标题" name="title">
        <uni-easyinput
          v-model="postForm.title"
          :focus="titleFocus"
          :clearable="!!postForm.title"
          :clearSize="20"
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
                : '全部'
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
          :clearable="!!postForm.describe"
          :clearSize="20"
          type="textarea"
          autoHeight
          maxlength="-1"
          :focus="describeFocus"
          v-model="postForm.describe"
          placeholder="说点什么吧 ~"
          @confirm="validatePostForm('postForm')"
        />
      </uni-forms-item>

      <!-- 上传图片 -->
      <uni-forms-item label="添加图片地址">
        <!-- urls -->
        <view class="post-form-item-urls" v-for="item in urls" :key="item.id">
          <uni-easyinput
            v-model="item.url"
            :clearable="!!item.url"
            placeholder="请输入图片地址"
            @confirm="addUrl"
          />
          <!-- remove -->
          <button
            class="url-remove"
            size="mini"
            type="primary"
            plain
            @click="removeUrl(item.id)"
          >
            <u-icon name="close"></u-icon>
          </button>
          <!-- <view class="url-remove">
          </view> -->
        </view>

        <!-- add -->
        <view class="url-add">
          <u-button
            type="primary"
            plain
            text="点击添加图片地址"
            @click="addUrl"
          ></u-button>
        </view>

        <!-- 上传图片 -->
        <u--text type="info" text="上传图片" margin="40rpx 0 20rpx"></u--text>
        <u-upload
          :fileList="albums"
          @afterRead="afterRead"
          @delete="removePic"
          uploadIcon="plus"
          name="albums"
          multiple
          width="320rpx"
          height="180rpx"
        >
        </u-upload>
      </uni-forms-item>

      <!-- 发布-->
      <view class="post-submit">
        <view v-if="!updatePostId">
          <u-button type="primary" @click="authenticate">发布</u-button>
        </view>
        <view v-else>
          <u-button type="primary" plain @click="authenticate">更新</u-button>
        </view>
      </view>
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

    <!-- load start -->
    <u-overlay :show="postLoading">
      <view class="loading-content-wrap">
        <u-loading-icon
          :show="true"
          color="#ffffff"
          loading-color="#ffffff"
          :vertical="true"
          mode="semicircle"
          size="120rpx"
          textSize="40rpx"
        ></u-loading-icon>
      </view>
    </u-overlay>
    <!-- load end -->
  </view>
</template>

<script>
import { createPostApi, getPostByIdApi, updatePostApi } from "../../api/post";
import { authenticateApi } from "../../api/common";
import { BASE_URL } from "../../config/config.default";

export default {
  data() {
    return {
      updatePostId: "",
      postItem: {},
      postLoading: false,
      uploadImgCount: 0,
      albums: [],
      urls: [],
      albumsLength: 0,
      unUploadImglists: [],
      scrollTop: 0,
      titleFocus: false,
      describeFocus: false,
      categoryList: [
        {
          name: "全部",
          value: 0,
        },
        {
          name: "推荐",
          value: 1,
        },
        {
          name: "电影",
          value: 2,
        },
        {
          name: "科技",
          value: 3,
        },
        {
          name: "音乐",
          value: 4,
        },
        {
          name: "美食",
          value: 5,
        },
        {
          name: "文化",
          value: 6,
        },
        {
          name: "财经",
          value: 7,
        },
        {
          name: "二手",
          value: 8,
        },
      ],
      categoryListShow: false,
      postForm: {
        category: 0,
        albums: [],
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

  onShow() {
    this.updatePostId = uni.getStorageSync("updatePostId");
    uni.removeStorageSync("updatePostId");
    if (this.updatePostId) {
      this.getPostById(this.updatePostId);
    }
  },

  methods: {
    async getPostById(id) {
      const res = await getPostByIdApi(id).catch((e) => {});
      this.initPost();
      this.postForm.title = res.post.title;
      this.postForm.category = res.post.category;
      this.postForm.describe = res.post.describe;
      res.post.albums.map((url) => {
        // if (url.split("http://127.0.0.1")) {
        this.albums.push(url);
        this.unUploadImglists.push(url);
        // } else {
        // this.urls.push(url);
        // }
      });
    },

    // 身份验证
    async authenticate() {
      const res = await authenticateApi("/post/create").catch((e) => {});
      if (res && res.code == 401) {
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
        this.validatePostForm("postForm");
      }
    },

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
          this.postLoading = true;
          if (this.unUploadImglists.length) {
            this.handleImgUpload();
          } else {
            this.handlePostForm();
          }
        })
        .catch((e) => {});
    },

    // 发布
    async createPost() {
      const res = await createPostApi(this.postForm).catch((e) => {});
      if (res && res.code === 0) {
        this.initPost();
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

    // update
    async updatePost() {
      const res = await updatePostApi({
        updatePostId: this.updatePostId,
        post: this.postForm,
      }).catch((e) => {});
      if (res && res.code == 0) {
        this.initPost();
        this.$refs.postNotify.show({
          type: "primary",
          color: "#ffffff",
          bgColor: "#3c9cff",
          message: res.msg,
          duration: 1000,
          fontSize: 16,
          safeAreaInsetTop: true,
          complete() {
            uni.navigateTo({
              url: "../mypost/index",
            });
          },
        });
      }
    },

    // 初始化
    initPost() {
      this.postLoading = false;
      this.albumsLength = 0;
      this.unUploadImglists = [];
      this.postForm = {};
      this.uploadImgCount = 0;
      this.albums = [];
      this.urls = [];
    },

    // 整理 postForm
    handlePostForm() {
      this.postForm.albums = [];
      this.urls.map((item) => {
        if (item.url) this.postForm.albums.push({ url: item.url });
      });
      this.urls = [];
      this.albums.map((item) => {
        this.postForm.albums.push({ url: item.url });
      });
      this.albums = [];
      if (this.updatePostId) {
        this.updatePost();
      } else {
        this.createPost();
      }
    },

    // 选择分类
    handleSelectCategory(item) {
      this.postForm.category = item.value;
    },

    // 移除图片
    removePic(event) {
      this.albums.splice(event.index, 1);
      this.unUploadImglists.splice(event.index, 1);
    },

    // 新增图片
    afterRead(event) {
      // 统计未上传的图片
      this.unUploadImglists = this.unUploadImglists.concat(event.file);
      // 当前选择的图片，选择单个为对象，选择多个为数组
      let tempImglists = [].concat(event.file);
      // 上传图片前的 albums 长度
      if (!this.albumsLength) {
        this.albumsListLength = this.albums.length;
      }
      tempImglists.map((item) => {
        this.albums.push({
          ...item,
          // status: "uploading",
          // message: "待上传",
        });
      });
    },

    // 处理上传图片
    handleImgUpload() {
      let albumsLength = this.albumsLength;
      let unUploadImglistsLength = this.unUploadImglists.length;
      if (unUploadImglistsLength) {
        this.unUploadImglists.map(async (item, index) => {
          let url = await this.uploadImg(item).catch((e) => {});
          this.albums.splice(
            albumsLength + index,
            1,
            Object.assign(item, {
              // status: "success",
              // message: "已上传",
              url,
            })
          );
          if (++this.uploadImgCount == unUploadImglistsLength) {
            this.handlePostForm();
          }
        });
      } else {
        this.createPost();
      }
    },

    // 上传图片
    uploadImg(item) {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: `${BASE_URL}/post/upload`,
          filePath: item.url,
          name: "img",
          header: {
            authentication: uni.getStorageSync("token"),
          },
          formData: {},
          success: (res) => {
            resolve(JSON.parse(res.data).url);
          },
          fail: (e) => {},
        });
      });
    },

    // 添加图片地址
    addUrl() {
      this.urls.push({
        id: Date.now(),
      });
    },

    // 移除图片地址
    removeUrl(id) {
      this.urls.splice(
        this.urls.findIndex((v) => v.id == id),
        1
      );
    },
  },
};
</script>

<style lang="less" scoped>
.post-page {
  position: relative;
  padding: 20rpx 40rpx 320rpx;
  background-color: #ffffff;

  .post-category-mask-outer {
    position: relative;
    .post-category-mask-inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .post-form-item-urls {
    margin: 0 auto 20rpx;
    display: flex;
    justify-content: space-between;
    .url-remove {
      margin: 0 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60rpx;
    }
  }
  .url-add {
    margin: 20rpx auto;
  }
  .post-submit {
    position: sticky;
    bottom: 88rpx;
  }

  .loading-content-wrap {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
