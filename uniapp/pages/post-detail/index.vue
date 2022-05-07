<template>
  <view class="post-detail-page">
    <!-- category start -->
    <view class="category">
      <button class="category-btn">{{ postItem.category }}</button>
      <!-- title -->
      <view class="title">
        <u--text
          v-if="postItem.title"
          :lines="1"
          :text="postItem.title"
          margin="20rpx 0 10rpx"
          color="#ffffff"
          size="28rpx"
        ></u--text>
      </view>
      <!-- subtitle -->
      <view class="subtitle">
        <u--text
          v-if="postItem.subtitle"
          :lines="1"
          :text="postItem.subtitle"
          size="20rpx"
          color="#ffffff"
        ></u--text>
      </view>
    </view>
    <!-- categories end -->

    <!-- post-item start -->
    <view class="post-item">
      <!-- user info start -->
      <view class="user-info">
        <!-- avatar -->
        <u-avatar
          class="post-item-avatar"
          icon="account"
          mpde="widthFix"
          randomBgColor
          fontSize="40rpx"
        ></u-avatar>
        <u--text
          class="username"
          :lines="1"
          :text="postItem.user_name"
          bold
          size="16"
        ></u--text>
      </view>
      <!-- user info end -->

      <!-- post content start -->
      <view class="post-content">
        <!-- describe start -->
        <view
          class="describe"
          v-if="
            postItem.describe &&
            /<(\w+)[^>]*>(.*?<\/\1>)?/.test(postItem.describe)
          "
          v-html="postItem.describe"
        ></view>
        <u--text
          v-else-if="postItem.describe && postItem.describe.length"
          class="describe"
          :lines="3"
          :text="postItem.describe"
          size="24rpx"
        ></u--text>
        <!-- 空 describe ，占位 -->
        <view v-else class="describe"></view>
        <!-- describe end -->

        <!-- albums -->
        <u-album
          class="post-album"
          v-if="postItem.albums && postItem.albums.length"
          :urls="postItem.albums"
          singleSize="480rpx"
          keyName="cover"
          multipleSize="160rpx"
        ></u-album>

        <!-- actions start -->
        <view class="post-actions">
          <!-- like -->
          <view
            class="post-actions-item"
            @click="handleClickLike(postItem.post_id)"
          >
            <uni-icons
              class="post-actions-icon"
              type="hand-up"
              size="36rpx"
            ></uni-icons>
            <u--text type="info" size="20rpx" :text="postItem.like"></u--text>
          </view>
          <!-- comments -->
          <view class="post-actions-item" @click="handleClickComment(postItem)">
            <uni-icons
              class="post-actions-icon"
              type="chat"
              size="36rpx"
            ></uni-icons>
            <u--text
              type="info"
              size="20rpx"
              :text="postItem.comments"
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
    <!-- post-item end -->

    <!-- post comments start -->
    <u-empty
      v-if="!postItem.comments"
      mode="data"
      icon="http://cdn.uviewui.com/uview/empty/data.png"
      text="暂无评论"
    >
    </u-empty>
    <!-- post comments end -->
  </view>
</template>

<script>
const app = getApp();

export default {
  data() {
    return {
      postItem: {},
      comments: [
        {
          id: 20,
          comment: "testA",
          createTime: new Date().toLocaleString(),
          children: [
            {
              id: 24,
              comment: "testB",
              createTime: new Date().toLocaleString(),
              children: null,
            },
          ],
        },
      ],
    };
  },
  onLoad() {
    this.postItem = app.globalData.currentPostItem;
  },
  onReady() {
    // console.log(this.postItem);
  },
  onPullDownRefresh() {
    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 1000);
  },
};
</script>

<style lang="less" scoped>
.post-detail-page {
  .category {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200rpx;
    background-color: #4b93d1;
    color: #ffffff;
    .category-btn {
      padding: 0 20rpx;
      border-radius: 12rpx;
      font-weight: 600;
      line-height: 40rpx;
      font-size: 0.9rem;
      color: #4b93d1;
      background-color: #ffffff;
    }
  }
  .post-item {
    padding: 20rpx;
    .user-info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .username {
        margin: 0 20rpx !important;
      }
    }
    .post-content {
      padding: 10rpx 20rpx 0 80rpx;
      .describe {
        padding: 10rpx 0 20rpx;
      }
      .post-actions {
        padding-top: 64rpx;
        display: flex;
        justify-content: flex-start;
        .post-actions-item {
          margin-right: 100rpx;
          display: flex;
          .post-actions-icon {
            margin-right: 8rpx;
          }
        }
      }
    }
  }
}
</style>
