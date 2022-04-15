<template>
  <view class="post-detail-page">
    <!-- avatar -->
    <u-avatar
      class="post-item-avatar"
      icon="account"
      mpde="widthFix"
      randomBgColor
      fontSize="22"
    ></u-avatar>
    <!-- post content start -->
    <view class="post-content">
      <!-- title -->
      <u--text
        class="title"
        :lines="1"
        :text="postItem.title"
        type="primary"
        size="16"
        margin="4rpx 0 4rpx"
      ></u--text>
      <!-- subtitle -->
      <u--text
        class="subtitle"
        :lines="1"
        :text="postItem.subtitle"
        type="info"
        size="12"
      ></u--text>
      <!-- describe -->
      <u--text
        :lines="4"
        class="describe"
        :text="postItem.describe"
        margin="24rpx 0 20rpx "
      ></u--text>
      <!-- albums -->
      <u-album
        class="post-album"
        :urls="postItem && postItem.albums ? postItem.albums : []"
        singleSize="480rpx"
        keyName="cover"
        multipleSize="160rpx"
      ></u-album>
      <!-- actions start -->
      <view class="post-actions">
        <!-- like -->
        <view class="post-actions-item">
          <uni-icons
            class="post-actions-icon"
            type="hand-up"
            size="28"
          ></uni-icons>
          <u--text type="info" size="18" :text="'test'"></u--text>
        </view>
        <!-- comments -->
        <view class="post-actions-item">
          <uni-icons
            class="post-actions-icon"
            type="chat"
            size="28"
          ></uni-icons>
          <u--text type="info" size="18" :text="'test'"></u--text>
        </view>
        <!-- share -->
        <view class="post-actions-item">
          <uni-icons type="redo" size="28"></uni-icons>
        </view>
      </view>
      <!-- actions end -->
    </view>
    <!-- post content end -->
  </view>
</template>

<script>
const app = getApp();

export default {
  data() {
    return {
      postItem: {},
    };
  },
  onLoad() {
    this.postItem = app.globalData.currentPostItem;
  },
  onReady() {
    console.log(this.postItem);
  },
};
</script>

<style></style>
