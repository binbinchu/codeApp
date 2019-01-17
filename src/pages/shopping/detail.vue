<template>
  <div class="detail">
    <div class="detail-first">
      <div class="swiper">
        <swiper
          :autoplay="autoplay"
          :indicator-dots="indicatorDots"
          :interval="interval"
          :duration="duration">
          <block v-for="(item,index) in goodsData.banner" :key="index">
            <swiper-item>
              <image :src="item" class="slide-image" lazy-load="true"/>
            </swiper-item>
          </block>
        </swiper>
      </div>
    </div>
    <div class="detail-second">
      <div class="detail-goods">
        <div class="detail-goods-name-tags">
          {{goodsData.name}}
        </div>
        <div class="detail-goods-subTitle">
          【{{goodsData.introduce}}】
        </div>
        <div class="detail-goods-price">
          <div class="price new-price">
            <div class="symbol">￥</div>
            <div class="number">{{goodsData.price}}</div>
          </div>
          <div class="price old-price" v-if="goodsData.original_price">
            <div class="symbol">￥</div>
            <div class="number">{{goodsData.original_price}}</div>
          </div>
          <div class="like-group" v-on:click="isLikeFn">
            <i-icon type="like" size="34" color="#ed3f14" v-if="!isLike"/>
            <i-icon type="like_fill" size="34" color="#ed3f14" v-else></i-icon>
          </div>
        </div>
        <div class="detail-sale-city">
          <div class="detail-sale">已售:{{goodsData.sales}}件</div>
          <div class="detail-city">城市:{{goodsData.city}}</div>
        </div>
      </div>
    </div>
    <div class="goods-specification" v-on:click="handleOpen">
      <div class="specification-text">
        已选&nbsp;&nbsp;{{goodsData.name}}，{{count}}个
      </div>
      <div class="specification-symbol">
        <i-icon type="switch" size="24"></i-icon>
      </div>
    </div>
    <div class="detail-third">
      <div class="detail-third-title">商品详情</div>
      <div class="detail-third-content">
        <image :src="item.src" alt="" mode="widthFix"
               v-for="(item,index) in goodsData.detail" :key="index"></image>
      </div>
    </div>
    <div class="detail-fourth">
      <div class="Icon enter-shore" :class="{'activity':selectedNum === '1'}" id="1" data-id="1"
           v-on:click="IconSelectedFn">
        <i-icon type="shop_fill" size="32"/>
        <div class="text">进店</div>
      </div>
      <div class="Icon shopping-cart" :class="{'activity':selectedNum === '2'}" id="2" data-id="2"
           v-on:click="IconSelectedFn">
        <i-icon type="publishgoods_fill" size="32"/>
        <div class="text">购物车</div>
      </div>
      <i-button shape="circle" i-class="BTN shopping-cart-btn" v-on:click="addCart">加入购物车</i-button>
      <i-button type="error" shape="circle" i-class="BTN buy-btn" v-on:click="Buy">立即购买</i-button>
    </div>
    <i-action-sheet :visible="visible">
      <div slot="header" class="tip-content">
        <i-icon type="close" i-class="action-close" @click="handleCancel"></i-icon>
        <div class="goods-info">
          <div class="info-image">
            <img :src="smBanner" alt="">
          </div>
          <div class="info-specification">
            <div class="price new-price">
              <div class="symbol">￥</div>
              <div class="number">{{goodsData.price}}</div>
            </div>
            <div class="specification-text">
              已选&nbsp;&nbsp;{{goodsData.name}}，{{count}}个
            </div>
          </div>
        </div>
        <div class="goods-choose">
          <div class="chooseView number">
            <div class="title">数量</div>
            <div class="tab-item">
              <i-input-number :value="count" min="1" max="100" step="1" @change="goodsCount"></i-input-number>
            </div>
          </div>
        </div>
        <div class="goods-btn">
          <i-button i-class="action-btn shopping-cart-btn" v-on:click="addCart">加入购物车</i-button>
          <i-button i-class="action-btn buy-btn">立即购买</i-button>
        </div>
      </div>
    </i-action-sheet>
    <i-toast id="toast"/>
    <i-message id="message"/>
  </div>
</template>

<script>
  import { $Toast, $Message } from '../../../static/iview/base/index'

  export default {
    name: 'detail',
    data () {
      return {
        isLike: false,
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        goodsData: {},
        smBanner: '',
        count: 1,
        selectedNum: '',
        visible: false
      }
    },
    components: {},
    onShow () {
      this.selectedNum = 0
      this.getGoodsData(this.$route.query.goodsId)
      this.getLike()
    },
    created () {
    },
    methods: {
      isLikeFn () {
        if (this.isLike) {
          this.toNoLikeThis()
        } else {
          this.toLikeThis()
        }
      },
      handleOpen () {
        this.visible = true
      },
      handleCancel () {
        this.visible = false
      },
      getGoodsData (id) {
        const obj = {
          id: id
        }
        this.$ajax.getGoodsDetail(obj).then((res) => {
          if (res.code === 0) {
            this.goodsData = res.data
            this.smBanner = res.data.banner[0]
          }
        })
      },
      addCart () {
        const obj = {
          goods_id: this.$route.query.goodsId,
          num: this.count,
          piece: this.goodsData.price
        }
        this.$ajax.addShoppingCart(obj).then((res) => {
          if (res.code === 0) {
            this.messageFn('您已添加购物车~', 'success')
            if (this.visible) {
              this.visible = !this.visible
            }
          }
        })
      },
      getLike () {
        const obj = {
          obj_id: this.$route.query.goodsId
        }
        this.$ajax.isLikeApi(obj).then((res) => {
          if (res.code === 0) {
            if (res.data === 0) {
              this.isLike = false
            } else {
              this.isLike = true
            }
          }
        })
      },
      toLikeThis () {
        const obj = {
          type: '10',
          obj_id: this.$route.query.goodsId
        }
        this.$ajax.likeThis(obj).then((res) => {
          if (res.code === 0) {
            this.isLike = true
            this.messageFn(res.data, 'success')
          }
        })
      },
      toNoLikeThis () {
        const obj = {
          obj_id: this.$route.query.goodsId
        }
        this.$ajax.noLikeThis(obj).then((res) => {
          if (res.code === 0) {
            this.isLike = false
            this.messageFn('取消收藏', 'error')
          }
        })
      },
      Buy () {
        console.log('立即购买')
        this.$router.push({
          path: '/pages/shopping/orderSure',
          query: { goodsIds: this.$route.query.goodsId }
        })
      },
      goodsCount (e) {
        this.count = e.mp.detail.value
      },
      IconSelectedFn (e) {
        // 1进店 2进购物车
        this.selectedNum = e.mp.currentTarget.id
        let type = parseInt(this.selectedNum)
        if (type === 1) {
          console.log('进店')
        } else if (type === 2) {
          wx.switchTab({
            url: '/pages/shopping/shoppingCart'
          })
        }
      },
      toastFn (text) {
        $Toast({
          content: text
        })
      },
      messageFn (text, type) {
        $Message({
          content: text,
          type: type
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../_sass/reset';

  .action-close {
    position: absolute;
    width: rpx(48);
    height: rpx(48);
    font-size: rpx(48) !important;
    top: rpx(15);
    right: rpx(15);
  }

  .action-btn {
    margin: 0 !important;
    width: rpx(360);
    border: none;
  }
</style>
<style scoped lang="scss">
  @import '../../_sass/reset';

  .detail {
    width: 100%;
    height: 100%;
  }

  swiper {
    width: 100%;
    height: rpx(425);
    image {
      width: 100%;
      height: 100%;
    }
  }

  .line-gray {
    background: $color-theme-bg;
    width: rpx(720);
    height: rpx(15);
  }

  .tip-content {
    position: relative;
    padding-left: rpx(15);
    padding-right: rpx(15);
    background: $colorM;
    width: rpx(720);
    padding-top: rpx(125);
    .goods-info {
      display: flex;
      align-content: flex-end;
      align-items: flex-end;
      justify-content: left;
      position: absolute;
      top: rpx(-80);
    }
    .info-image {
      width: rpx(160);
      height: rpx(160);
      padding: rpx(15);
      background: $colorM;
      image {
        width: rpx(160);
        height: rpx(160);
        display: block;
      }
    }
    .info-specification {
      margin-left: rpx(15);
      padding-bottom: rpx(15);
    }
    .goods-choose {
      padding-top: rpx(45);
      padding-bottom: rpx(50);
      border-top: rpx(1) solid $color-theme-bg;
      .chooseView {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-between;
        padding: rpx(0) rpx(15) rpx(0) rpx(15);
      }
    }
    .goods-btn {
      display: flex;
      justify-content: center;
    }
  }

  .detail-second {
    border-top: rpx(1) solid #eeeeee;
    .detail-goods {
      padding: rpx(15);
      width: rpx(720);
      background: #fff;
    }
    .detail-goods-name-tags {
      width: rpx(720);
      font-size: rpx(30);
      color: #242424;
      @include two-wrap;
    }
    .detail-goods-subTitle {
      width: rpx(720);
      font-size: rpx(24);
      margin-top: rpx(15);
      @include two-wrap;
    }
    .detail-goods-price {
      position: relative;
      display: flex;
      justify-content: left;
      align-content: flex-end;
      align-items: flex-end;
      .old-price {
        margin-left: rpx(15);
      }
      .like-group {
        position: absolute;
        right: rpx(0);
        top: rpx(0);
        width: rpx(68);
        height: rpx(68);
        text-align: center;
        line-height: rpx(68);
      }
    }
    .detail-sale-city {
      font-size: rpx(24);
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: left;
      .detail-sale {
        margin-right: rpx(30);
      }
    }
    .detail-goods-num {
      margin: rpx(15) 0;
    }
  }

  .goods-specification {
    margin-top: rpx(15);
    margin-bottom: rpx(15);
    padding: rpx(25) rpx(15) rpx(25) rpx(15);
    background: $colorM;
    font-size: $fontB;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    .specification-text {
    }
    .specification-symbol {
    }
  }

  .detail-third {
    border-top: rpx(1) solid #eeeeee;
    background: #ffffff;
    .detail-third-title {
      padding-top: rpx(35);
      padding-bottom: rpx(35);
      text-align: center;
    }
    .detail-third-content {
      width: 100%;
      image {
        width: 100%;
      }
    }
  }

  .Icon {
    color: #80848f;
    font-size: rpx(32);
    text-align: center;
    &.activity {
      color: #ed3f14;
    }
    .text {
      font-size: rpx(28);
    }
  }

  .detail-fourth {
    bottom: rpx(0);
    position: fixed;
    width: rpx(720);
    height: rpx(96);
    padding: rpx(15);
    background: #ffffff;
    -webkit-box-shadow: rpx(0) rpx(-1) rpx(3) rpx(2) #eeeeee;
    -moz-box-shadow: rpx(0) rpx(-1) rpx(3) rpx(2) #eeeeee;
    box-shadow: rpx(0) rpx(-1) rpx(3) rpx(2) #eeeeee;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    .enter-shore {
      width: rpx(96);
    }
    .shopping-cart {
      width: rpx(96);
    }
  }
</style>
