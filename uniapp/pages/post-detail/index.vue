<template>
  <view class="post-detail-page">
    <!-- category start -->
    <view class="category">
      <button class="category-btn">
        {{ categoryList[postItem.category].name }}
      </button>
      <!-- title -->
      <view class="title">
        <u--text
          v-if="postItem.title"
          :lines="1"
          :text="postItem.title"
          margin="20rpx 0 10rpx"
          color="#ffffff"
          size="32rpx"
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
          icon="github-circle-fill"
          mpde="widthFix"
          randomBgColor
          fontSize="64rpx"
        ></u-avatar>
        <!-- <u--text
          class="username"
          :lines="1"
          :text="postItem.user_name"
          bold
          size="16"
        ></u--text> -->
        <u--text
          class="username"
          :lines="1"
          :text="postItem.author.username"
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
        <!-- :lines="3" -->
        <u--text
          v-else-if="postItem.describe && postItem.describe.length"
          class="describe"
          :text="postItem.describe"
          size="24rpx"
        ></u--text>
        <!-- 空 describe ，占位 -->
        <view v-else class="describe"></view>
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
        <!-- 发表评论内容 -->
        <uni-forms-item name="title">
          <view class="comment-content">
            <uni-easyinput
              v-model="commentForm.title"
              :focus="commentFocus"
              :clearable="!!commentForm.title"
              :clearSize="20"
              type="textarea"
              autoHeight
              maxlength="-1"
              placeholder="说点什么吧"
              @confirm="validatecommentForm('commentForm')"
            />
            <view class="comment-confirm">
              <u-button type="info" plain text="发送"></u-button>
            </view>
          </view>
        </uni-forms-item>
      </uni-forms>

      <u-empty
        v-if="postItem.comment"
        mode="data"
        icon="http://cdn.uviewui.com/uview/empty/data.png"
        text="暂无评论"
      >
      </u-empty>
      <view v-else>
        <view class="comment-list">
          <view v-for="item in postItem.comment" :key="item._id"></view>
        </view>
      </view>
    </view>
    <!-- post comments end -->
  </view>
</template>

<script>
import { getPostByIdApi } from "../../api/post";

export default {
  data() {
    return {
      commentFocus: false,
      commentForm: {},
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
      postItem: {
        title: "致敬开源",
        category: 3,
        describe:
          "Linus Benedict Torvalds 因创造了两个伟大的项目 —— Linux Kernel 和 Git 而被大家熟知。但他对开源的贡献不限于代码，在倡导开源运动和开源精神、以及运作和管理大型开源项目等方面，Linus 都做出了巨大贡献。Linus 还创造了不少为人称道的金句，最有名的莫过于 'Talk is cheap, Show me the code'。",
        albums: [{ url: "http://192.168.1.107:9000/imgs/linux.jpg" }],
        author: {
          username: "Tom",
        },
        comment: [
          {
            content: "Linux is great !",
            createTime: 1652614174409,
            author: {
              username: "Tom",
              avatar: "",
            },
          },
          {
            content: "Linux is great !",
            createTime: 1652614174409,
            author: {
              username: "Jerry",
              avatar: "",
            },
          },
        ],
      },
      commentFormRules: {},
    };
  },

  onReady() {
    // 开局先获取一次帖子
    // this.getPostById(uni.getStorageSync("detailPostId"));
    uni.removeStorageSync("detailPostId");
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
    async getPostById(id) {
      const res = await getPostByIdApi(id).catch((e) => {});
      console.log(res);
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
      padding: 10rpx 20rpx 0 80rpx;
      .describe {
        padding: 10rpx 0 20rpx;
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
    .comment-content {
      display: flex !important;
      .comment-confirm {
        margin-left: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
