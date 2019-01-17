<template>
  <div class="order-sure">
    <div class="div address" @click="chooseAddress">
      <block v-if="addressData">
        <div class="address-info">
          <div class="user-name-phone">
            <b>{{addressData.name}}&nbsp;{{addressData.tel}}</b>
          </div>
          <div class="user-address">
            {{addressData.detAddress}}
          </div>
        </div>
        <div class="row">
          <i-icon type="enter"/>
        </div>
      </block>
      <block v-else>
        <div class="add-address-icon">
          <div class="add-icon">
            <i-icon type="add" size="24"/>
          </div>
          <div class="add-text">
            请选择收货地址
          </div>
        </div>
      </block>
    </div>
    <div class="line-img"></div>
    <div class="div goods-list">
      <div class="goods-list-item">
        <div class="goods-list-item-image">
          <img src="http://pic2.ooopic.com/12/62/89/46bOOOPICa6_1024.jpg" alt="">
        </div>
        <div class="goods-list-item-info">
          <div class="goods-name">
            南极人Nanjiren 加厚亲赴柔软保暖冬被担任双人被子被芯棉被 米黄色 180cm x 200cm南极人Nanjiren 加厚亲赴柔软保暖冬被担任双人被子被芯棉被 米黄色 180cm x 200cm
          </div>
          <div class="goods-specification">
            2.130kg/件，米黄，180*200 4斤
          </div>
          <div class="goods-price-num">
            <div class="goods-price">
              ¥1000.00
            </div>
          </div>
        </div>
      </div>
      <div class="goods-list-item">
        <div class="goods-list-item-image">
          <img src="http://pic2.ooopic.com/12/62/89/46bOOOPICa6_1024.jpg" alt="">
        </div>
        <div class="goods-list-item-info">
          <div class="goods-name">
            南极人Nanjiren 加厚亲赴柔软保暖冬被担任双人被子被芯棉被 米黄色 180cm x 200cm南极人Nanjiren 加厚亲赴柔软保暖冬被担任双人被子被芯棉被 米黄色 180cm x 200cm
          </div>
          <div class="goods-specification">
            2.130kg/件，米黄，180*200 4斤
          </div>
          <div class="goods-price-num">
            <div class="goods-price">
              ¥1000.00
            </div>
          </div>
        </div>
      </div>
      <div class="goods-list-item">
        <div class="goods-list-item-image">
          <img src="http://pic2.ooopic.com/12/62/89/46bOOOPICa6_1024.jpg" alt="">
        </div>
        <div class="goods-list-item-info">
          <div class="goods-name">
            南极人Nanjiren 加厚亲赴柔软保暖冬被担任双人被子被芯棉被 米黄色 180cm x 200cm南极人Nanjiren 加厚亲赴柔软保暖冬被担任双人被子被芯棉被 米黄色 180cm x 200cm
          </div>
          <div class="goods-specification">
            2.130kg/件，米黄，180*200 4斤
          </div>
          <div class="goods-price-num">
            <div class="goods-price">
              ¥1000.00
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div all-price-btn">
      <div class="all-price">
        <div class="title">商品金额</div>
        <div class="price">¥3000.00</div>
      </div>
      <div class="all-price">
        <div class="title">运费<label>(总重：2.820kg)</label></div>
        <div class="price">+&nbsp;¥10</div>
      </div>
      <div class="orderSure-btn-group">
        <i-button type="info" i-class="orderSure-pay-btn">在线支付</i-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderSure',
    data () {
      return {
        addressData: null
      }
    },
    onShow () {
      console.log(this.$route.query.goodsIds)
      this.getDefaultAddress()
      // wx.removeStorageSync('addressData')
    },
    methods: {
      getDefaultAddress () {
        if (wx.getStorageSync('addressData')) {
          this.addressData = JSON.parse(wx.getStorageSync('addressData'))
          this.addressData.detAddress = this.addressData.area + this.addressData.address
        } else {
          this.$ajax.getDefaultAddress().then((res) => {
            if (res.code === 0) {
              this.addressData = res.data
            }
          })
        }
      },
      chooseAddress () {
        this.$router.push({
          path: '/pages/address/addressList'
        })
      }
    }
  }
</script>
<style lang="scss">
  .orderSure-pay-btn {
    margin: 0 !important;
    padding: 0 !important;
  }
</style>
<style scoped lang="scss">
  @import "../../_sass/reset";

  .order-first {
    width: 100%;
    height: 100%;
    background: $color-theme-bg;
  }

  .div {
    padding: rpx(15);
    background: $colorM;
  }

  .line-img {
    width: 100%;
    height: rpx(7);
    background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAKBAMAAACOO0tGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMoaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ5QzNCOTcwN0I3RTExRTc5NTRFQ0QxNzZCOTBDQTlGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ5QzNCOTZGN0I3RTExRTc5NTRFQ0QxNzZCOTBDQTlGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDlDM0I5NkI3QjdFMTFFNzk1NEVDRDE3NkI5MENBOUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDlDM0I5NkM3QjdFMTFFNzk1NEVDRDE3NkI5MENBOUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7R4hTYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1QTFRF////7G1ti7Xo7PP8ncHs8Y2N/vDw7nt70OH2+93d+MPDuNLy9Kam7nV17+fthdCLygAAAFJJREFUKM9jYIAALkHsYAFUnqFJCSvQgMlPxK5fBibPjF2/0gaoPFshdgMCYAaYYNevApNnxa5fPAGmwAm7Ac4w+YPYDZCEyXPj8IHBaBBSIwgBrBY4UQ+sC74AAAAASUVORK5CYII=") repeat-x;
    background-size: rpx(64) rpx(7);
  }

  .address {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    padding: rpx(30) rpx(15);
    .user-name-phone {
      color: $color-theme-font;
      font-size: $fontJ;
    }
    .user-address {
      font-size: $fontL;
    }
    .add-address-icon {
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: left;
    }
    .add-icon {
    }
    .add-text {
      font-size: $fontB;
    }
  }

  .goods-list {
    margin-top: rpx(20);
    padding-bottom: rpx(0);
    padding-right: rpx(0);
    .goods-list-item {
      display: flex;
      align-content: flex-start;
      align-items: flex-start;
      justify-content: left;
      padding: rpx(15) rpx(15) rpx(15) 0;
      border-bottom: rpx(1) solid $color-theme-bg;
    }
    .goods-list-item-image {
      width: rpx(145);
      height: rpx(145);
      image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .goods-list-item-info {
      margin-left: rpx(20);
      flex: 1;
      div {
        width: 100%;
      }
      .goods-name {
        color: $color-theme-font;
        font-size: $fontL;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        word-break: break-all;
        height: rpx(70);
      }
      .goods-specification {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: $colorO;
        font-size: $fontC;
      }
      .goods-price-num {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-between;
        margin-top: rpx(20);
      }
      .goods-price {
        font-size: $fontI;
        color: $colorV;
      }
    }
  }

  .all-price-btn {
    margin-top: rpx(20);
    padding-top: rpx(20);
    .all-price {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: space-between;
      margin-bottom: rpx(10);
      .title {
        color: $color-theme-font;
        font-size: $fontJ;
        label {
          margin-left: rpx(20);
          color: $colorU;
          font-size: $fontC;
        }
      }
      .price {
        color: $colorV;
        font-size: $fontJ;
      }
    }
    .orderSure-btn-group {
      margin-top: rpx(25);
    }
  }
</style>
