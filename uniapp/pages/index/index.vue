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

    <!-- category tab -->
    <view class="category-list">
      <u-tabs :list="categoryList" @click="HandleClickCategory"></u-tabs>
    </view>

    <!-- post list start -->
    <view class="post-list" v-if="postList.length">
      <!-- 遮罩层 start -->
      <view v-if="isSearchFocus" class="post-list-mask"></view>
      <!-- 遮罩层 end -->

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
                ? item.describe &&
                  /<(\w+)[^>]*>(.*?<\/\1>)?/.test(item.describe)
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

      <!-- loadmore -->
      <view class="loadmore" @click="loadMore">
        <u-loadmore :status="loadmoreStatus" />
      </view>
    </view>
    <!-- post list end -->
    <view v-else class="empty-data">
      <u-empty
        mode="data"
        text="暂时没有人发帖"
        icon="http://cdn.uviewui.com/uview/empty/data.png"
      />
    </view>

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
      category: 0,
      loadmoreStatus: "loadmore",
      totalCount: 0,
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
    };
  },

  onReachBottom() {
    this.loadMore();
  },

  onPullDownRefresh() {
    setTimeout(() => {
      this.getAllPostList();
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

  methods: {
    // 获取帖子列表
    async getAllPostList() {
      const res = await getAllPostListApi({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        category: this.category,
      }).catch((e) => {});
      console.log(res.postList);
      if (res && res.code === 0) {
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
      this.totalCount = res.totalCount;
      if (this.pageNum == 1 || res.totalCount == 0) {
        this.postList = res && res.postList ? res.postList : [];
      } else {
        this.postList = this.postList.concat(res.postList);
      }
    },

    // loadmore
    loadMore() {
      this.loadmoreStatus = "loading";
      setTimeout(() => {
        if (this.totalCount >= this.pageSize) {
          this.pageNum++;
        }
        this.getAllPostList();
        if (this.pageNum * this.pageSize >= this.totalCount) {
          this.loadmoreStatus = "nomore";
        } else {
          this.pageNum++;
          this.getAllPostList();
        }
      }, 500);
    },

    // 点击分类
    HandleClickCategory(item) {
      this.category = item.value;
      this.getAllPostList();
    },

    // 点击帖子
    handleClickPostItem(item) {
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
  .category-list {
    margin-top: 20rpx;
    background-color: #ffffff;
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
    .loadmore {
      margin: 40rpx auto 64rpx;
    }
  }
  .empty-data {
    position: relative;
    top: 200rpx;
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
