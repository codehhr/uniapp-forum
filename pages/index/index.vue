<template>
  <view class="index-page">
    <!-- top uni-nav-bar start -->
    <uni-nav-bar class="nav" shadow height="88rpx" :statusBar="true">
      <!-- left -->
      <block slot="left">
        <view class="nav-left">
          <uni-icons
            type="bars"
            color="#4d698e"
            size="24"
            @click="handleClickNavLeft"
          />
          <uni-drawer ref="showLeftDrawer" mode="left" :width="280">
            <!-- @change="change($event, 'showLeft')" -->
          </uni-drawer>
        </view>
      </block>
    </uni-nav-bar>
    <!-- top uni-nav-bar end -->

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
        @custom="handleSearch"
        @search="handleSearch"
        @clickIcon="handleSearch"
      ></u-search>
    </view>
    <!-- search end -->

    <!-- post list start -->
    <view class="post-list" v-if="postList.length">
      <!-- post item start -->
      <view class="post-item" v-for="item in postList" :key="item.id">
        <!-- avatar -->
        <!-- <image class="avatar" :src="item.avatar" mode="aspectFill"></image> -->
        <u-avatar
          class="avatar"
          icon="account"
          randomBgColor
          fontSize="22"
        ></u-avatar>
        <!-- post content -->
        <view class="post-content">
          <!-- title -->
          <u--text
            class="title"
            :lines="1"
            :text="item.title"
            type="primary"
            size="16"
            margin="4px 0 0"
          ></u--text>
          <!-- subtitle -->
          <u--text
            class="subtitle"
            :lines="1"
            :text="item.subtitle"
            type="info"
            size="12"
          ></u--text>
          <!-- describe -->
          <u--text
            :lines="4"
            class="describe"
            :text="item.describe"
            margin="40rpx 0 20rpx "
          ></u--text>
          <!-- albums -->
          <u-album
            class="post-album"
            :urls="item.albums"
            singleSize="480rpx"
            keyName="cover"
            multipleSize="160rpx"
          ></u-album>
          <!-- actions start -->
          <view class="post-actions">
            <view class="post-actions-item">
              <u-icon name="thumb-up" color="#666666" size="32"></u-icon>
              <u--text
                class="post-actions-count"
                type="info"
                size="18"
                :text="'test'"
              ></u--text>
            </view>
            <view class="post-actions-item">
              <u-icon name="chat" color="#666666" size="32"></u-icon>
              <u--text
                class="post-actions-count"
                type="info"
                size="18"
                :text="'test'"
              ></u--text>
            </view>
            <view class="post-actions-item">
              <u-icon name="share" color="#666666" size="32"></u-icon>
            </view>
          </view>
          <!-- actions end -->
        </view>
      </view>
      <!-- post item end -->
    </view>
    <!-- post list end -->
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      albumWidth: 0,
      tabbarValue: 0,
      keywords: "",
      postList: [
        {
          id: 1,
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
          describe: `以下列举本站不提倡的发帖姿势，请尽可能避免。（删除可能：高）

不要在这里问你的作业答案，你的作业是你自己的事情，我们相信大多数老师都会要求作业独立完成；若有例外，请按照老师的要求寻求适当的帮助。
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
          like: 1024,
          comments: 12,
        },
        {
          id: 2,
          albums: [
            {
              cover: "https://cdn.uviewui.com/uview/album/1.jpg",
            },
          ],
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
          id: 3,
          title: "主标题3",
          user_name: "C",
          extra: "额外信息3",
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          cover: "../../static/tree.png",
          describe: `以下列举本站不提倡的发帖姿势，请尽可能避免。（删除可能：高）

不要在这里问你的作业答案，你的作业是你自己的事情，我们相信大多数老师都会要求作业独立完成；若有例外，请按照老师的要求寻求适当的帮助。
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
          like: 567,
          comments: 90,
        },
        {
          id: 4,
          user_name: "D",
          title: "主标题4",
          extra: "额外信息4",
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          cover: "../../static/tree.png",
          describe: `以下列举本站不提倡的发帖姿势，请尽可能避免。（删除可能：高）

不要在这里问你的作业答案，你的作业是你自己的事情，我们相信大多数老师都会要求作业独立完成；若有例外，请按照老师的要求寻求适当的帮助。
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
          id: 5,
          title: "主标题5",
          extra: "额外信息5",
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          //   cover:
          //     "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/cover/tree.png",
          describe: `以下列举本站不提倡的发帖姿势，请尽可能避免。（删除可能：高）

不要在这里问你的作业答案，你的作业是你自己的事情，我们相信大多数老师都会要求作业独立完成；若有例外，请按照老师的要求寻求适当的帮助。
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
          id: 6,
          title: "主标题6",
          extra: "额外信息6",
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          cover: "../../static/tree.png",
          like: 26345,
          comments: 362,
        },
        {
          id: 7,
          title: "主标题7",
          extra: "额外信息7",
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          cover: "../../static/tree.png",
          describe: `以下列举本站不提倡的发帖姿势，请尽可能避免。（删除可能：高）

不要在这里问你的作业答案，你的作业是你自己的事情，我们相信大多数老师都会要求作业独立完成；若有例外，请按照老师的要求寻求适当的帮助。
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
          like: 75677,
          comments: 7790,
        },
        {
          id: 8,
          title: "主标题8",
          extra: "额外信息8",
          avatar:
            "https://codehhr.coding.net/p/codehhr/d/images/git/raw/master/emoji/s.png",
          cover: "../../static/tree.png",
          describe: `以下列举本站不提倡的发帖姿势，请尽可能避免。（删除可能：高）

不要在这里问你的作业答案，你的作业是你自己的事情，我们相信大多数老师都会要求作业独立完成；若有例外，请按照老师的要求寻求适当的帮助。
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
  methods: {
    // 点击顶部导航左侧
    handleClickNavLeft() {
      this.$refs.showLeftDrawer.open();
    },

    // 点击帖子
    handleClickPostItem(item) {
      // console.log(item);
      uni.navigateTo({
        url: "../postDetial/index",
      });
    },

    // 点赞(0)，评论(1)，分享(2)
    actionsClick(action) {
      switch (action) {
        case 0:
          console.log("点赞了");
          break;
        case 1:
          console.log("评论");
        case 2:
          console.log("分享");
        default:
          break;
      }
    },

    // 搜索
    handleSearch() {
      console.log(this.keywords);
    },

    // 搜索框输入内容时
    handleInputChange() {},
  },
};
</script>

<style lang="less" scoped>
.index-page {
  background-color: #ffffff;
  .nav {
    .nav-left {
      margin: 0 8rpx;
    }
  }
  .post-list {
    padding-bottom: 80rpx;
    .post-item {
      padding: 40rpx 24rpx 20rpx;
      display: flex;
      align-items: flex-start;
      .avatar {
        margin-right: 20rpx;
        width: 80rpx;
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
          .post-actions-count {
            margin-left: 10rpx !important;
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
