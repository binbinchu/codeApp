<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <div class="search">
      <i-input type="number" left title="搜索" mode="wrapped" i-class="input_us"/>
    </div>
    <div class="section swiper">
      <swiper
        :autoplay="autoplay"
        :indicator-dots="indicatorDots"
        :interval="interval"
        :duration="duration"
      >
        <block v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <image :src="item" class="slide-image"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="section tags">
      公告：这是一条测试公告
    </div>
    <div class="section shopping-div quick-buy">
      <div class="shopping-more quick-buy-more">
        <div class="more">更多</div>
      </div>
      <div class="shopping-list-image">
        <div class="shopping-image-box">
          <img src="" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        motto: 'Hello World',
        userInfo: {},
        imgUrls: [
          'http://pic.58pic.com/58pic/14/21/42/32U58PICj6I_1024.jpg',
          'http://pic2.ooopic.com/12/62/89/46bOOOPICa6_1024.jpg',
          'http://pic12.photophoto.cn/20090715/0020033073935424_b.jpg'
        ],
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 1000
      }
    },

    components: {},

    methods: {
      bindViewTap () {
        const url = '/packageA/logs'
        this.$router.push(url)
      },
      getUserInfo () {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: (res) => {
                this.userInfo = res.userInfo
              }
            })
          }
        })
      },
      clickHandle (msg, ev) {
        // eslint-disable-next-line
        console.log('clickHandle:', msg, ev)
      }
    },

    created () {
      // 调用应用实例的方法获取全局数据
      this.getUserInfo()
    }
  }
</script>

<style scoped lang="scss">
  @import "../../src/_sass/reset";

  .search {
    width: rpx(750);
    height: rpx(92);
  }

  swiper {
    width: 100%;
    height: rpx(425);
    image {
      width: 100%;
      height: 100%;
    }
  }

  .tags {
    background: #ffffff;
    height: rpx(68);
    padding-left: rpx(20);
    padding-right: rpx(20);
    line-height: rpx(68);
    color: #959595;
    font-size: rpx(24);
  }

  .shopping-div {
    padding-left: rpx(20);
    padding-right: rpx(20);
    background: #ffffff;
    .shopping-more {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      .more {
        color: #949494;
        fon-size: rpx(24);
      }
    }
    .shopping-list-image {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      .shopping-image-box {
        width: rpx(236);
        height: rpx(236);
        background: rgba(0, 0, 0, 0.5);
      }
    }
  }
</style>
