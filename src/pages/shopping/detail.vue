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
    <div class="detail-third">
      <div class="detail-third-title">商品详情</div>
      <div class="detail-third-content">
        <image :src="item.src" alt="" mode="widthFix"
               v-for="(item,index) in goodsData.detail" :key="index"></image>
      </div>
    </div>
    <div class="detail-fourth">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    data () {
      return {
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        goodsData: {}
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
      getGoodsData (id) {
        const obj = {
          id: id
        }
        this.$ajax.getGoodsDetail(obj).then((res) => {
          if (res.ret === 200) {
            this.goodsData = res.data
          }
        })
      }
    }
  }
</script>

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
  }
</style>
