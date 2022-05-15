<template>
  <view class="post-detail-page">
    <!-- post list start -->

    <!-- post item start -->
    <view class="post-item" v-for="(item, index) in postList" :key="index">
      <!-- avatar -->
      <u-avatar
        class="post-item-avatar"
        :src="
          item && item.author && item.author.avatar ? item.author.avatar : ''
        "
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
          :text="
            item && item.author && item.author.username
              ? item.author.username
              : 'unknown'
          "
          bold
          size="32rpx"
        ></u--text>
        <!-- updateTime -->
        <u--text
          class="post-updateTime"
          :lines="1"
          :text="
            item && item.updateTime
              ? new Date(item.updateTime).toLocaleString()
              : ''
          "
          type="info"
          size="20rpx"
          @click="handleClickPostItem(item)"
        ></u--text>
        <!-- title -->
        <u--text
          class="post-title"
          :lines="1"
          :text="item && item.title ? item.title : ''"
          size="32rpx"
          margin="20rpx 0 0"
          @click="handleClickPostItem(item)"
        ></u--text>
        <!-- describe start -->
        <view
          class="post-describe"
          v-if="
            item
              ? item.describe && /<(\w+)[^>]*>(.*?<\/\1>)?/.test(item.describe)
              : ''
          "
          v-html="item.describe"
        ></view>
        <u--text
          v-else-if="item ? item.describe && item.describe.length : ''"
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
            v-if="item ? item.albums && item.albums.length : ''"
            :urls="item.albums"
            keyName="url"
            singleSize="320rpx"
            multipleSize="140rpx"
          ></u-album>
        </view>

        <!-- 分类徽标 start -->
        <view class="category-tag">
          <u-badge
            type="info"
            max="99"
            :value="categoryList[item.category].name"
          ></u-badge>
        </view>
        <!-- 分类徽标 end -->

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
            <u--text
              type="info"
              size="20rpx"
              :text="item ? item.like : ''"
            ></u--text>
          </view>
          <!-- comments -->
          <view class="post-actions-item" @click="handleClickComment(item)">
            <uni-icons
              class="post-actions-icon"
              type="chat"
              size="36rpx"
            ></uni-icons>
            <u--text
              type="info"
              size="20rpx"
              :text="item ? item.comments : ''"
            ></u--text>
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
import { getPostByIdApi } from "../../api/post";

export default {
  data() {
    return {
      // 页面的滚动距离, 通过 onPageScroll 生命周期获取, 用于回到顶部
      scrollTop: 0,
    };
  },

  onPullDownRefresh() {
    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 500);
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },

  onReady() {
    // 开局先获取一次帖子
    this.getPostById(uni.getStorageSync("detailPostId"));
    uni.removeStorageSync("detailPostId");
  },

  methods: {
    async getPostById(id) {
      const res = await getPostByIdApi(id).catch((e) => {});
      console.log(res);
    },

    // 点赞
    handleClickLike(post_id) {
      console.log(post_id);
      console.log("点赞了");
    },
    // 评论
    handleClickComment(item) {
      uni.navigateTo({
        url: "../post-detail/index",
      });
    },
    // 分享
    handleClickShare() {
      console.log("分享");
    },
  },
};
</script>

<style lang="less" scoped>
.post-detail-page {
  background-color: #f1f1f1;
  .post-item {
    margin-bottom: 20rpx;
    padding: 40rpx 20rpx;
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
    .category-tag {
      margin-top: 20rpx;
      .u-badge.u-badge--not-dot.u-badge--info {
        padding: 4rpx 10rpx;
        display: initial;
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
}
</style>
<style lang="less">
.index-search {
  margin: 20rpx 0 0 !important;
  padding: 0 12rpx !important;
  width: 96%;
}
</style>
