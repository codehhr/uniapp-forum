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
          name="albums"
          multiple
          width="320rpx"
          height="180rpx"
        >
        </u-upload>
      </uni-forms-item>

      <!-- 发布-->
      <u-button type="primary" @click="authenticate">发布</u-button>
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
    <view class="post-loading" v-if="postLoading">
      <u-loading-icon
        :show="true"
        :text="`正在上传第 ${uploadImgIndex + 1} 张图片`"
        :vertical="true"
        mode="semicircle"
        size="80rpx"
        textSize="40rpx"
      ></u-loading-icon>
    </view>
    <!-- load end -->
  </view>
</template>

<script>
import { createPostApi } from "../../api/post";
import { uploadImgApi, authenticateApi } from "../../api/common";

export default {
  data() {
    return {
      postLoading: false,
      uploadImgIndex: 0,
      loadingText: "",
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

  methods: {
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
          this.handleImgUpload();
        })
        .catch((e) => {});
    },

    // 发布
    async createPost() {
      const res = await createPostApi(this.postForm).catch((e) => {});
      if (res && res.code === 0) {
        this.postForm = {};
        // this.postLoading = false;
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

    // 整理 postForm
    handlePostForm() {
      this.postForm.albums = [];
      this.urls.map((item) => {
        if (item.url) this.postForm.albums.push(item.url);
      });
      this.urls = [];
      this.albums.map((item) => {
        this.postForm.albums.push(item.url);
      });
      this.albums = [];
      this.createPost();
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
      let uploadCount = 0;
      if (unUploadImglistsLength) {
        this.unUploadImglists.map(async (item, index) => {
          // item.status = "uploading";
          // item.message = "正在上传";
          let url = await this.uploadImg(item);
          uploadCount += 1;
          this.uploadImgIndex = uploadCount;
          this.albums.splice(
            albumsLength + index,
            1,
            Object.assign(item, {
              // status: "success",
              // message: "已上传",
              url,
            })
          );
          if (uploadCount == unUploadImglistsLength) {
            this.handlePostForm();
          }
        });
        this.albumsLength = 0;
        this.unUploadImglists = [];
      } else {
        this.createPost();
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
  padding: 20rpx 40rpx 160rpx;
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
  .post-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(207, 207, 207, 0.4);
    z-index: 999;
  }
}
</style>
