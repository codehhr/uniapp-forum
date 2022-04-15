<template>
  <view class="index-page">
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
        @clear="isSearchFocus = false"
        @custom="handleSearch"
        @search="handleSearch"
        @clickIcon="handleSearch"
        @focus="handleSearchFocus"
      ></u-search>
    </view>
    <!-- search end -->

    <!-- post list start -->
    <view class="post-list" v-if="postList.length">
      <!-- 遮罩层 start -->
      <view
        v-if="isSearchFocus"
        class="post-list-cover"
        @click="isSearchFocus = false"
      ></view>
      <!-- 遮罩层 end -->

      <!-- post item start -->
      <view class="post-item" v-for="item in postList" :key="item.post_id">
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
            :text="item.title"
            type="primary"
            size="16"
            margin="4rpx 0 4rpx"
            @click="handleClickPostItem(item)"
          ></u--text>
          <!-- subtitle -->
          <u--text
            class="subtitle"
            :lines="1"
            :text="item.subtitle"
            type="info"
            size="12"
            @click="handleClickPostItem(item)"
          ></u--text>
          <!-- describe -->
          <u--text
            :lines="4"
            class="describe"
            :text="item.describe"
            margin="24rpx 0 20rpx "
            @click="handleClickPostItem(item)"
          ></u--text>
          <!-- albums -->
          <u-album
            class="post-album"
            :urls="item && item.albums ? item.albums : []"
            singleSize="480rpx"
            keyName="cover"
            multipleSize="160rpx"
          ></u-album>
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
                size="28"
              ></uni-icons>
              <u--text type="info" size="18" :text="'test'"></u--text>
            </view>
            <!-- comments -->
            <view class="post-actions-item" @click="handleClickComment(item)">
              <uni-icons
                class="post-actions-icon"
                type="chat"
                size="28"
              ></uni-icons>
              <u--text type="info" size="18" :text="'test'"></u--text>
            </view>
            <!-- share -->
            <view class="post-actions-item" @click="handleClickShare">
              <uni-icons type="redo" size="28"></uni-icons>
            </view>
          </view>
          <!-- actions end -->
        </view>
        <!-- post content end -->
      </view>
      <!-- post item end -->
    </view>
    <!-- post list end -->
  </view>
</template>

<script>
const app = getApp();

export default {
  data() {
    return {
      // 搜索框是否聚焦
      isSearchFocus: false,
      // 页面的滚动距离, 通过 onPageScroll 生命周期获取
      scrollTop: 0,
      // 回到顶部按钮的样式
      // 搜索的关键词
      keywords: "",
      // 帖子列表
      postList: [
        {
          post_id: 1,
          user_id: 1,
          title: "主标题1",
          subtitle: "额外信息1",
          user_name: "A",
          avatar: "https://cdn.uviewui.com/uview/album/1.jpg",
          albums: [
            "https://cdn.uviewui.com/uview/album/1.jpg",
            "https://cdn.uviewui.com/uview/album/2.jpg",
            "https://cdn.uviewui.com/uview/album/3.jpg",
            "https://cdn.uviewui.com/uview/album/4.jpg",
            "https://cdn.uviewui.com/uview/album/5.jpg",
            "https://cdn.uviewui.com/uview/album/6.jpg",
            "https://cdn.uviewui.com/uview/album/7.jpg",
            "https://cdn.uviewui.com/uview/album/8.jpg",
            "https://cdn.uviewui.com/uview/album/9.jpg",
            "https://cdn.uviewui.com/uview/album/10.jpg",
          ],
          describe: `里是大家参与、公开讨论的场所。
一般不建议留邮箱/QQ等私下交流。因为论坛可以记录你的问题和解决方案，在未来也许会帮到其他人（或者六个月之后的你自己）。
1.2 正确的发帖姿势
发帖求助时，提问者请把自己的问题交代清楚，节省大家的时间，不要没有前因后果、没有上下文，让别人看了你的问题还得继续追问。很差的问题如“我的R出错了，请问我该怎么办？”；你得告诉别人在怎样的情况下出错了以及出了什么错。

一个好的问题应当包括以下两个部分：`,
          like: 1024,
          comments: 12,
        },
        {
          post_id: 2,
          user_id: 2,
          albums: ["https://cdn.uviewui.com/uview/album/1.jpg"],
          user_name: "B",
          title: "主标题2",
          extra: "额外信息2",
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          cover: "../../static/tree.png",
          like: 2345,
          comments: 32,
        },
        {
          post_id: 3,
          user_id: 3,
          title: "主标题3",
          user_name: "C",
          extra: "额外信息3",
          albums: [],
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          cover: "../../static/tree.png",
          describe: `发帖，这样只会让人更加不愿意回复，它也给版主带来了额外的删帖劳动。提问之前请先花两分钟浏览或搜索一下别人相关帖子，看看有没有类似的问题。
疑问再大也不要使用 多于三个的问号，感情再强烈也不要使用三个以上的叹号。
新问题请另开新帖， 不建议搭车问问题
帖子标题严禁 只使用“求助”“问个问题”“请教”这样的短语，请把您的问题 用简短的语言阐述清楚，不写清楚标题的帖子很可能会被删除。
R语言相关问题 没有样本数据和代码，没有可重复例子。本条具体规范详见 1.2 部分。
以下社区礼仪希望大家遵守：

不要特意强调自己是新手，也不要加急；我们只关心问题能否问好，是否是新手、是否着急，与别人是否会回答问题无关。
建议 不要点名让谁回答你的问题，因为这里是大家参与、公开讨论的场所。
一般不建议留邮箱/QQ等私下交流。因为论坛可以记录你的问题和解决方案，在未来也许会帮到其他人（或者六个月之后的你自己）。
1.2 正确的发帖姿势
发帖求助时，提问者请把自己的问题交代清楚，节省大家的时间，不要没有前因后果、没有上下文，让别人看了你的问题还得继续追问。很差的问题如“我的R出错了，请问我该怎么办？”；你得告诉别人在怎样的情况下出错了以及出了什么错。

一个好的问题应当包括以下两个部分：`,
          like: 567,
          comments: 90,
        },
        {
          post_id: 4,
          user_id: 4,
          user_name: "D",
          title: "主标题4",
          extra: "额外信息4",
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          cover: "../../static/tree.png",
          describe: `你的作业是你自己的事情，我们相信大多数老师都会要求作业独立完成；若有例外，请按照老师的要求寻求适当的帮助。
有问题尽管问，但 不要重复发帖，这样只会让人更加不愿意回复，它也给版主带来了额外的删帖劳动。提问之前请先花两分钟浏览或搜索一下别人相关帖子，看看有没有类似的问题。
疑问再大也不要使用 多于三个的问号，感情再强烈也不要使用三个以上的叹号。
新问题请另开新帖， 不建议搭车问问题
帖子标题严禁 只使用“求助”“问个问题”“请教”这样的短语，请把您的问题 用简短的语言阐述清楚，不写清楚标题的帖子很可能会被删除。
R语言相关问题 没有样本数据和代码，没有可重复例子。本条具体规范详见 1.2 部分。
以下社区礼仪希望大家遵守：

不要特意强调自己是新手，也不要加急；我们只关心问题能否问好，是否是新手、是否着急，与别人是否会回答问题无关。
建议 不要点名让谁回答你的问题，因为这里是大家参与、公开讨论的场所。
一般不建议留邮箱/QQ等私下交流。因为论坛可以记录你的问题和解决方案，在未来也许会帮到其他人（或者六个月之后的你自己）。
1.2 正确的发帖姿势
发帖求助时，提问者请把自己的问题交代清楚，节省大家的时间，不要没有前因后果、没有上下文，让别人看了你的问题还得继续追问。很差的问题如“我的R出错了，请问我该怎么办？”；你得告诉别人在怎样的情况下出错了以及出了什么错。

一个好的问题应当包括以下两个部分：`,
          like: 56237,
          comments: 902,
        },
        {
          post_id: 5,
          user_id: 5,
          title: "主标题5",
          extra: "额外信息5",
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          //   cover:
          //     "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/cover/tree.png",
          describe: `的作业是你自己的事情，我们相信大多数老师都会要求作业独立完成；若有例外，请按照老师的要求寻求适当的帮助。
有问题尽管问，但 不要重复发帖，这样只会让人更加不愿意回复，它也给版主带来了额外的删帖劳动。提问之前请先花两分钟浏览或搜索一下别人相关帖子，看看有没有类似的问题。
疑问再大也不要使用 多于三个的问号，感情再强烈也不要使用三个以上的叹号。
新问题请另开新帖， 不建议搭车问问题
帖子标题严禁 只使用“求助”“问个问题”“请教”这样的短语，请把您的问题 用简短的语言阐述清楚，不写清楚标题的帖子很可能会被删除。
R语言相关问题 没有样本数据和代码，没有可重复例子。本条具体规范详见 1.2 部分。
以下社区礼仪希望大家遵守：

不要特意强调自己是新手，也不要加急；我们只关心问题能否问好，是否是新手、是否着急，与别人是否会回答问题无关。
建议 不要点名让谁回答你的问题，因为这里是大家参与、公开讨论的场所。
一般不建议留邮箱/QQ等私下交流。因为论坛可以记录你的问题和解决方案，在未来也许会帮到其他人（或者六个月之后的你自己）。
1.2 正确的发帖姿势
发帖求助时，提问者请把自己的问题交代清楚，节省大家的时间，不要没有前因后果、没有上下文，让别人看了你的问题还得继续追问。很差的问题如“我的R出错了，请问我该怎么办？”；你得告诉别人在怎样的情况下出错了以及出了什么错。

一个好的问题应当包括以下两个部分：`,
          like: 10424,
          comments: 412,
        },
        {
          post_id: 6,
          user_id: 6,
          title: "主标题6",
          extra: "额外信息6",
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          cover: "../../static/tree.png",
          like: 26345,
          comments: 362,
        },
        {
          user_id: 7,
          post_id: 7,
          title: "主标题7",
          extra: "额外信息7",
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          cover: "../../static/tree.png",
          describe: `不要在这里问你的作业答案，你的作业是你自己的事情，我们相信大多数老师都会要求作业独立完成；若有例外，请按照老师的要求寻求适当的帮助。
有问题尽管问，但 不要重复发帖，这样只会让人更加不愿意回复，它也给版主带来了额外的删帖劳动。提问之前请先花两分钟浏览或搜索一下别人相关帖子，看看有没有类似的问题。
疑问再大也不要使用 多于三个的问号，感情再强烈也不要使用三个以上的叹号。
新问题请另开新帖， 不建议搭车问问题
帖子标题严禁 只使用“求助”“问个问题”“请教”这样的短语，请把您的问题 用简短的语言阐述清楚，不写清楚标题的帖子很可能会被删除。
R语言相关只关心问题能否问好，是否是新手、是否着急，与别人是否会回答问题无关。
建议 不要点名让谁回答你的问题，因为这里是大家参与、公开讨论的场所。
一般不建议留邮箱/QQ等私下交流。因为论坛可以记录你的问题和解决方案，在未来也许会帮到其他人（或者六个月之后的你自己）。
1.2 正确的发帖姿势
发帖求助时，提问者请把自己的问题交代清楚，节省大家的时间，不要没有前因后果、没有上下文，让别人看了你的问题还得继续追问。很差的问题如“我的R出错了，请问我该怎么办？”；你得告诉别人在怎样的情况下出错了以及出了什么错。

一个好的问题应当包括以下两个部分：`,
          like: 75677,
          comments: 7790,
        },
        {
          user_id: 8,
          post_id: 8,
          title: "主标题8",
          extra: "额外信息8",
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          cover: "../../static/tree.png",
          describe: `不要在这里问你的作业答案，你的作业是你自己的事情，我们相信大多数老师都会要求作业独立完成；若有例外，请按照老师的要求寻求适当的帮助。
有问清楚，节省大家的时间，不要没有前因后果、没有上下文，让别人看了你的问题还得继续追问。很差的问题如“我的R出错了，请问我该怎么办？”；你得告诉别人在怎样的情况下出错了以及出了什么错。`,
          like: 568237,
          comments: 8902,
        },
      ],
    };
  },
  onReachBottom() {},

  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  methods: {
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
    .post-list-cover {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: rgba(138, 138, 138, 0.8);
    }
    .post-item {
      margin: 20rpx 0;
      padding: 10rpx 20rpx 20rpx;
      display: flex;
      align-items: flex-start;
      background-color: #ffffff;
      .post-content {
        padding-left: 20rpx;
        width: 100%;
      }
      .post-actions {
        padding-top: 40rpx;
        display: flex;
        justify-content: flex-start;
        .post-actions-item {
          margin-right: 100rpx;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .post-actions-icon {
            margin-right: 20rpx;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.index-search {
  margin: 16rpx 28rpx !important;
}
</style>
