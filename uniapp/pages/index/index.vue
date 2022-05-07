<template>
  <view class="index-page">
    <!-- search start -->
    <view class="index-search">
      <u-search
        v-model="keywords"
        placeholder="搜索"
        :show-action="true"
        actionText="搜索"
        :animation="true"
        placeholderColor="#667c99"
        searchIconColor="#667c99"
        color="#667c99"
        bgColor="#ffffff"
        @clear="handleSearchBlur"
        @custom="handleSearch"
        @search="handleSearch"
        @clickIcon="handleSearch"
        @focus="handleSearchFocus"
        @blur="handleSearchBlur"
      ></u-search>
    </view>
    <!-- search end -->

    <!-- post list start -->
    <view class="post-list" v-if="postList.length">
      <!-- 遮罩层 start -->
      <view v-if="isSearchFocus" class="post-list-mask"></view>
      <!-- 遮罩层 end -->

      <!-- post item start -->
      <view class="post-item" v-for="item in postList" :key="item.id">
        <!-- avatar -->
        <u-avatar
          class="post-item-avatar"
          :src="item.author.avatar"
          mpde="widthFix"
          randomBgColor
          fontSize="40rpx"
        ></u-avatar>
        <!-- post content start -->
        <view class="post-content">
          <!-- username -->
          <u--text
            class="post-username"
            :lines="1"
            :text="item.author.username"
            bold
            size="32rpx"
          ></u--text>
          <!-- updateTime -->
          <u--text
            class="post-updateTime"
            :lines="1"
            mode="date"
            :text="item.updateTime"
            type="info"
            size="20rpx"
            @click="handleClickPostItem(item)"
          ></u--text>
          <!-- title -->
          <u--text
            class="post-title"
            :lines="1"
            :text="item.title"
            size="32rpx"
            margin="20rpx 0 0"
            @click="handleClickPostItem(item)"
          ></u--text>
          <!-- describe start -->
          <view
            class="post-describe"
            v-if="
              item.describe && /<(\w+)[^>]*>(.*?<\/\1>)?/.test(item.describe)
            "
            v-html="item.describe"
          ></view>
          <u--text
            v-else-if="item.describe && item.describe.length"
            class="post-describe"
            :lines="3"
            :text="item.describe"
            size="24rpx"
            @click="handleClickPostItem(item)"
          ></u--text>
          <!-- 空 describe ，占位 -->
          <view v-else class="post-describe"></view>
          <!-- describe end -->

          <!-- albums -->
          <view class="post-album" @click="handleClickPostItem(item)">
            <u-album
              v-if="item.albums && item.albums.length"
              :urls="item.albums"
              singleSize="320rpx"
              multipleSize="140rpx"
            ></u-album>
          </view>
          <!-- actions start -->
          <view class="post-actions">
            <!-- like -->
            <view
              class="post-actions-item"
              @click="handleClickLike(item.post_id)"
            >
              <uni-icons
                class="post-actions-icon"
                type="hand-up"
                size="36rpx"
              ></uni-icons>
              <u--text type="info" size="20rpx" :text="item.like"></u--text>
            </view>
            <!-- comments -->
            <view class="post-actions-item" @click="handleClickComment(item)">
              <uni-icons
                class="post-actions-icon"
                type="chat"
                size="36rpx"
              ></uni-icons>
              <u--text type="info" size="20rpx" :text="item.comments"></u--text>
            </view>
            <!-- share -->
            <view class="post-actions-item" @click="handleClickShare">
              <uni-icons type="redo" size="36rpx"></uni-icons>
            </view>
          </view>
          <!-- actions end -->
        </view>
        <!-- post content end -->
      </view>
      <!-- post item end -->

      <!-- loadmore -->
      <view class="loadmore">
        <u-loadmore :status="loadmoreStatus" />
      </view>
    </view>
    <!-- post list end -->

    <!-- notify -->
    <u-notify ref="indexNotify"></u-notify>

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
import { getAllPostListApi } from "../../api/post";
const app = getApp();

export default {
  data() {
    return {
      // 搜索框是否聚焦
      isSearchFocus: false,
      // 页面的滚动距离, 通过 onPageScroll 生命周期获取, 用于回到顶部
      scrollTop: 0,
      // 搜索的关键词
      keywords: "",
      // 帖子列表
      postList: [],
      pageNum: 1,
      pageSize: 10,
      loadmoreStatus: "loadmore",
      totalCount: 0,
    };
  },

  onReachBottom() {
    if (this.pageNum * this.pageSize >= this.totalCount) {
      this.loadmoreStatus = "nomore";
    } else {
      this.pageNum += 1;
      this.loadmoreStatus = "loading";
      setTimeout(() => {
        this.getAllPostList();
      }, 500);
    }
  },

  onPullDownRefresh() {
    setTimeout(() => {
      this.getAllPostList(0);
      uni.stopPullDownRefresh();
    }, 500);
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },

  onReady() {
    // 开局先获取一次帖子列表
    this.getAllPostList();
  },

  onShow(options) {
    if (options) console.log(options);
  },

  methods: {
    // 获取帖子列表
    async getAllPostList(onPullDownRefresh) {
      const res = await getAllPostListApi({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).catch((e) => {});
      console.log(res);
      if (res && res.code === 0) {
        // ===0 : 只有下拉刷新时弹出提示
        if (onPullDownRefresh === 0) {
          this.$refs.indexNotify.show({
            type: "primary",
            color: "#ffffff",
            bgColor: "#3c9cff",
            message: res.msg,
            duration: 1000,
            fontSize: 16,
            safeAreaInsetTop: true,
          });
        }
        this.postList = this.postList.concat(res.postList);
        this.totalCount = res.totalCount;
      } else {
        this.$refs.indexNotify.show({
          type: "warning",
          color: "#ffffff",
          bgColor: "#f56c6c",
          message: res && res.msg ? res : "q",
          duration: 1500,
          fontSize: 16,
          safeAreaInsetTop: true,
        });
      }
    },

    // 点击帖子
    handleClickPostItem(item) {
      app.globalData.currentPostItem = item;
      uni.navigateTo({
        url: "../post-detail/index",
      });
    },

    // 点赞
    handleClickLike(post_id) {
      console.log(post_id);
      console.log("点赞了");
    },
    // 评论
    handleClickComment(item) {
      app.globalData.currentPostItem = item;
      uni.navigateTo({
        url: "../post-detail/index",
      });
    },
    // 分享
    handleClickShare() {
      console.log("分享");
    },

    // 搜索
    handleSearch() {
      this.isSearchFocus = false;
      console.log(this.keywords);
    },

    // 搜索框聚焦时
    handleSearchFocus() {
      this.isSearchFocus = true;
    },
    // 搜索框失焦时
    handleSearchBlur() {
      this.isSearchFocus = false;
    },
  },
};
</script>

<style lang="less" scoped>
.index-page {
  background-color: #f1f1f1;
  .index-search {
    margin: 20rpx 0 0 !important;
    padding: 0 12rpx !important;
    width: 96%;
  }
  .post-list {
    position: relative;
    padding-bottom: 80rpx;
    .post-list-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: rgba(241, 241, 241, 0.8);
    }
    .post-item {
      margin: 20rpx 0;
      padding: 20rpx;
      display: flex;
      align-items: flex-start;
      background-color: #ffffff;
      .post-content {
        padding: 0 20rpx;
        width: 100%;
        .post-describe {
          padding: 10rpx 0;
        }
      }
      .post-actions {
        padding-top: 32rpx;
        display: flex;
        justify-content: flex-start;
        .post-actions-item {
          margin-right: 100rpx;
          display: flex;
          justify-content: flex-start;
          .post-actions-icon {
            margin-right: 8rpx;
          }
        }
      }
    }
    .loadmore {
      margin: 40rpx auto 64rpx;
    }
  }
}
</style>
<style lang="less">
.index-search {
  margin: 16rpx 28rpx !important;
}
</style>
