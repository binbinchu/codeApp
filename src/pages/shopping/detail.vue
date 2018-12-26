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
        </div>
        <div class="detail-sale-city">
          <div class="detail-sale">已售:{{goodsData.sales}}件</div>
          <div class="detail-city">城市:{{goodsData.city}}</div>
        </div>
      </div>
    </div>
    <div class="goods-specification">
      <i-button v-on:click="handleOpen5">异步操作</i-button>
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
    <i-toast id="toast"/>
    <i-modal title="删除确认" :visible="visible5" :actions="actions5" v-on:click="handleClick5">
      <view>删除后无法恢复哦</view>
    </i-modal>
  </div>
</template>

<script>
  import { $Toast } from '../../../static/iview/base/index'

  export default {
    name: 'detail',
    data () {
      return {
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        goodsData: {},
        count: 1,
        selectedNum: '',
        visible5: false,
        actions5: [
          {
            name: '取消'
          },
          {
            name: '删除',
            color: '#ed3f14',
            loading: false
          }
        ]
      }
    },
    components: {},
    onShow () {
      console.log(this.$route)
      this.getGoodsData(this.$route.query.goodsId)
    },
    created () {
    },
    methods: {
      handleOpen5 () {
        this.visible5 = true
      },
      handleClick5 () {
        console.log('确认删除')
        this.visible5 = false
      },
      getGoodsData (id) {
        const obj = {
          id: id
        }
        this.$ajax.getGoodsDetail(obj).then((res) => {
          if (res.ret === 200) {
            this.goodsData = res.data
          }
        })
      },
      addCart () {
        this.toastFn('您已添加购物车~')
        console.log('添加购物车')
      },
      Buy () {
        console.log('立即购买')
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
          console.log('购物车')
        }
      },
      toastFn (text) {
        $Toast({
          content: text
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../_sass/reset';
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
      display: flex;
      justify-content: left;
      align-content: flex-end;
      align-items: flex-end;
      .old-price {
        margin-left: rpx(15);
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
