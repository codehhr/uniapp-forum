<template>
  <view class="post-detail-page">
    <!-- category start -->
    <view class="category">
      <button
        class="category-btn"
        v-if="
          categoryList[postItem.category] &&
          categoryList[postItem.category].name
        "
      >
        {{
          categoryList[postItem.category] &&
          categoryList[postItem.category].name
            ? categoryList[postItem.category].name
            : ""
        }}
      </button>
      <!-- title -->
      <view class="title">
        <u--text
          v-if="postItem.title"
          :lines="1"
          :text="postItem.title"
          margin="24rpx 0 0"
          bold
          color="#ffffff"
          size="36rpx"
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
          :src="
            postItem.author && postItem.author.avatar
              ? postItem.author.avatar
              : ''
          "
          mpde="widthFix"
          fontSize="64rpx"
        ></u-avatar>
        <u--text
          class="username"
          :lines="1"
          :text="
            postItem.author && postItem.author.username
              ? postItem.author.username
              : 'unknown'
          "
          bold
          size="32rpx"
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
          :lines="describeFoldLines"
          :text="postItem.describe"
          lineHeight="28"
          size="28rpx"
        ></u--text>
        <!-- 空 describe ，占位 -->
        <view v-else class="describe"></view>
        <!-- <button
          class="describe-fold-btn"
          v-if="
            categoryList[postItem.category] &&
            categoryList[postItem.category].name
          "
        >
          {{ describeFoldLines == 3 ? "展开" : "收起" }}
        </button> -->
        <!-- describe end -->

        <!-- albums -->
        <u-album
          class="post-album"
          v-if="postItem.albums && [].concat(postItem.albums).length"
          :urls="postItem.albums"
          singleSize="480rpx"
          keyName="url"
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
            <!-- <u--text type="info" size="20rpx" :text="postItem.like"></u--text> -->
            <u--text type="info" size="20rpx" :text="0"></u--text>
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
    <view class="comment">
      <view class="comment-title">
        <view class="comment-title-block"></view>
        <view class="comment-title-content">评论</view>
      </view>
      <uni-forms
        ref="commentForm"
        :model="commentForm"
        label-position="top"
        :label-width="320"
        :rules="commentFormRules"
      >
        <view class="comment-form">
          <!-- 发表评论内容 -->
          <uni-forms-item name="content">
            <uni-easyinput
              v-model="commentForm.content"
              :focus="commentFocus"
              :clearable="!!commentForm.content"
              :clearSize="20"
              type="textarea"
              autoHeight
              maxlength="-1"
              autoBlur
              placeholder="说点什么吧"
            />
          </uni-forms-item>
          <view class="comment-form-confirm">
            <u-button
              type="primary"
              text="发送"
              @click="validatecommentForm('commentForm')"
            ></u-button>
          </view>
        </view>
      </uni-forms>

      <u-empty
        v-if="postItem.comment"
        mode="data"
        icon="http://cdn.uviewui.com/uview/empty/data.png"
        text="暂无评论"
      >
      </u-empty>
      <view v-else>
        <!-- comment list start -->
        <view class="comment-list">
          <!-- comment item start -->
          <view
            class="comment-item"
            v-for="comment in commentList"
            :key="comment._id"
          >
            <!-- user info start -->
            <view class="comment-user-info">
              <!-- avatar -->
              <u-avatar
                class="comment-item-avatar"
                :src="
                  comment.author && comment.author.avatar
                    ? comment.author.avatar
                    : ''
                "
                type="info"
                mpde="widthFix"
                fontSize="32rpx"
              ></u-avatar>
            </view>
            <!-- user info end -->
            <!-- comment content start -->
            <view class="comment-item-content-wrapper">
              <u--text
                class="comment-item-username"
                :lines="1"
                :text="
                  comment.author && comment.author.username
                    ? comment.author.username
                    : 'unknown'
                "
                size="24rpx"
              ></u--text>
              <u--text
                class="comment-item-content"
                :lines="1"
                :text="comment && comment.content ? comment.content : ''"
                size="32rpx"
              ></u--text>
              <!-- updateTime -->
              <u--text
                class="comment-item-updateTime"
                :lines="1"
                :text="
                  comment && comment.updateTime
                    ? new Date(comment.updateTime).toLocaleString()
                    : ''
                "
                type="info"
                size="20rpx"
              ></u--text>
            </view>
            <!-- comment content end -->
          </view>
          <!-- comment item end -->
        </view>
      </view>
    </view>
    <!-- post comments end -->

    <!-- load start -->
    <u-overlay :show="commentPostLoading">
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
import {
  getPostByIdApi,
  commentPostApi,
  getCommentsByPostIdApi,
} from "../../api/post";

export default {
  data() {
    return {
      commentPostLoading: false,
      describeFoldLines: 0,
      commentFocus: false,
      commentForm: {},
      detailPostId: "",
      commentList: [],
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
      scrollTop: 0,
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
      postItem: {},
      commentFormRules: {
        content: {
          rules: [
            {
              required: true,
              errorMessage: "评论内容不能为空",
            },
          ],
        },
      },
    };
  },

  onLoad(options) {
    if (options.detailPostId) {
      this.detailPostId = options.detailPostId;
      this.getPostById(options.detailPostId);
      this.getCommentsByPostId(options.detailPostId);
    }
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },

  onPullDownRefresh() {
    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 1000);
  },

  methods: {
    // 验证 form
    validatecommentForm(ref) {
      if (!this.commentForm.content) {
        this.commentFocus = true;
      }
      this.$refs[ref]
        .validate()
        .then((data) => {
          this.commentPostLoading = true;
          this.handleComment();
        })
        .catch((e) => {});
    },

    async getPostById(id) {
      const res = await getPostByIdApi(id).catch((e) => {});
      if (res && res.code == 0) {
        this.postItem = res.post;
      }
    },

    async getCommentsByPostId(id) {
      const res = await getCommentsByPostIdApi(id).catch((e) => {});
      if (res && res.code == 0) {
        this.commentList = res.comments;
      }
    },

    // 发表评论
    async handleComment() {
      const res = await commentPostApi({
        postId: this.postItem._id,
        data: this.commentForm,
      }).catch((e) => {});
      if (res && res.code == 0) {
        this.commentPostLoading = false;
        this.getCommentsByPostId(this.detailPostId);
      }
    },
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
    color: #ffffff;
    background-color: #4b93d1;
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
    padding: 40rpx 20rpx;
    .user-info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .username {
        margin: 0 20rpx !important;
      }
    }
    .post-content {
      padding: 10rpx 20rpx 0 90rpx;
      .describe {
        padding: 10rpx 0 20rpx;
      }
      .describe-fold-btn {
        background-color: #3c9cff;
      }
      .post-actions {
        padding-top: 64rpx;
        display: flex;
        justify-content: space-between;
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
  .comment {
    padding: 20rpx;
    .comment-title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 1rem;
      .comment-title-block {
        margin-right: 20rpx;
        width: 12rpx;
        height: 32rpx;
        border-radius: 12rpx;
        background-color: #2979ff;
      }
    }
    .comment-form {
      display: flex;
      justify-content: space-between;
      .comment-form-confirm {
        margin-left: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .comment-list {
      .comment-item {
        margin: 24rpx 0;
        display: flex;
        justify-content: flex-start;
        .comment-user-info {
          margin-right: 16rpx;
        }
      }
    }
  }
  .loading-content-wrap {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
