<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <div class="search">
      <i-input type="text" left title="搜索" mode="wrapped" i-class="index-inputStyle" disabled="true"
               v-on:click="toSearch"/>
    </div>
    <div class="swiper">
      <swiper
        :autoplay="autoplay"
        :indicator-dots="indicatorDots"
        :interval="interval"
        :duration="duration">
        <block v-for="(item,index) in swiperImg" :key="index">
          <swiper-item>
            <image :src="item.img_url" class="slide-image" lazy-load="true"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="index-menu-tags">
      <div class="tags-item" v-for="(item,index) in tagsMenu" :key="index">
        <div class="tags-image">
          <img :src="item.img" alt="">
        </div>
        <div class="tags-name">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="section tags">
      公告：这是一条测试公告我是孙旭 提交git
    </div>
    <div class="section shopping-div quick-buy">
      <div class="shopping-more quick-buy-more">
        <div class="shopping-type-title">抢购</div>
        <div class="more">更多</div>
      </div>
      <div class="shopping-list-image">
        <div class="shopping-image-box">
          <image src="http://pic.58pic.com/58pic/14/21/42/32U58PICj6I_1024.jpg" alt=""/>
        </div>
        <div class="shopping-image-box">
          <image src="http://pic2.ooopic.com/12/62/89/46bOOOPICa6_1024.jpg" alt=""/>
        </div>
        <div class="shopping-image-box">
          <image src="http://pic12.photophoto.cn/20090715/0020033073935424_b.jpg" alt=""/>
        </div>
      </div>
    </div>
    <div class="section shopping-div group-buy">
      <div class="shopping-more quick-buy-more">
        <div class="shopping-type-title">拼团</div>
        <div class="more">更多</div>
      </div>
      <div class="shopping-list-image">
        <div class="shopping-image-box">
          <img src="http://pic.58pic.com/58pic/14/21/42/32U58PICj6I_1024.jpg" alt="">
        </div>
        <div class="shopping-image-box">
          <img src="http://pic2.ooopic.com/12/62/89/46bOOOPICa6_1024.jpg" alt="">
        </div>
        <div class="shopping-image-box">
          <img src="http://pic12.photophoto.cn/20090715/0020033073935424_b.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="section shopping-div recommend">
      <div class="recommend-item" v-for="(item,index) in hotGoodsData" :key="index" v-on:click="toDetail(item)">
        <div class="goods-image">
          <img :src="item.img_list" alt="">
        </div>
        <div class="goods-info">
          <div class="goods-name">{{item.name}}</div>
          <div class="goods-price">
            <div class="rmb">¥</div>
            <div class="price">{{item.price}}</div>
          </div>
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
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        swiperImg: [],
        hotGoodsData: [],
        tagsMenu: []
      }
    },

    components: {},
    created () {
      // 调用应用实例的方法获取全局数据
      this.getUserInfo()
      this.getBanner()
      this.getHotGoods()
      this.getIndexMenu()
    },
    methods: {
      toSearch () {
        wx.navigateTo({
          url: '/pages/search/search'
        })
      },
      toDetail (item) {
        this.$router.push({
          path: '/pages/shopping/detail',
          query: {
            goodsId: item.id
          }
        })
      },
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
      getBanner () {
        this.$ajax.getBannerTop().then((res) => {
          if (res.ret === 200) {
            this.swiperImg = res.data
          }
        })
      },
      getHotGoods () {
        const obj = {
          page: 1,
          pageSize: 6
        }
        this.$ajax.getHotGoods(obj).then((res) => {
          if (res.ret === 200) {
            this.hotGoodsData = res.data
          }
        })
      },
      getIndexMenu () {
        this.$ajax.getMenuTags().then((res) => {
          if (res.ret === 200) {
            this.tagsMenu = res.data
          }
        })
      },
      clickHandle (msg, ev) {
        // eslint-disable-next-line
        console.log('clickHandle:', msg, ev)
      }
    }
  }
</script>
<style lang="scss">
  @import "../../src/_sass/reset";

  .index-inputStyle {
    border-radius: rpx(35);
    background-color: rgba(255, 255, 255, 0.7) !important;
    padding-top: rpx(0) !important;
    padding-bottom: rpx(0) !important;
  }
</style>
<style scoped lang="scss">
  @import "../../src/_sass/reset";

  .search {
    position: fixed;
    top: rpx(0);
    left: rpx(0);
    width: rpx(750);
    z-index: 99;
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
    font-size: rpx(26);
  }

  .index-menu-tags {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    flex-wrap: wrap;
    .tags-item {
      width: rpx(120);
      padding: rpx(15);
      .tags-image {
        width: rpx(120);
        height: rpx(120);
        image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .tags-name {
        width: rpx(120);
        margin-top: rpx(15);
        font-size: rpx(26);
        text-align: center;
      }
    }
  }

  .shopping-div {
    padding-left: rpx(20);
    padding-right: rpx(20);
    background: #ffffff;
    &.recommend {
      background: #f1f1f1;
    }
    .shopping-more {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      padding: rpx(15) 0 rpx(15) 0;
      .shopping-type-title {
        color: #969696;
        font-size: rpx(26);
      }
      .more {
        color: #949494;
        font-size: rpx(24);
      }
    }
    .shopping-list-image {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      .shopping-image-box {
        width: rpx(220);
        height: rpx(236);
        padding: rpx(15) 0 rpx(15) 0;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .recommend {
    padding-top: rpx(15);
    padding-bottom: rpx(15);
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .recommend-item {
      width: rpx(326);
      background: rgba(255, 255, 255, 1);
      margin-bottom: rpx(1);
      padding: rpx(15);
    }
    .goods-image {
      width: rpx(325);
      height: rpx(355);
      image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .goods-info {
      padding-top: rpx(15);
      line-height: rpx(38);
      .goods-name {
        width: rpx(325);
        font-size: rpx(26);
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        word-break: break-all;
        height: rpx(70);
      }
      .goods-price {
        display: flex;
        justify-content: left;
        align-items: flex-end;
        align-content: flex-end;
        color: #ed3f14;
      }
      .rmb {
        font-size: rpx(22);
      }
      .price {
        margin-left: rpx(5);
        font-size: rpx(26);
      }
    }
  }
</style>
