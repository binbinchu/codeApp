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
      <div class="goods-list-item" v-for="(item,index) in goodsList" :key="index">
        <div class="goods-list-item-image">
          <img :src="item.img" alt="">
        </div>
        <div class="goods-list-item-info">
          <div class="goods-name">
            {{item.name}}
          </div>
          <div class="goods-specification">
            <!--2.130kg/件，米黄，180*200 4斤-->
            {{item.stateNacme}}
          </div>
          <div class="goods-price-num">
            <div class="goods-price">
              ¥{{item.price}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div all-price-btn">
      <div class="all-price">
        <div class="title">商品金额</div>
        <div class="price">¥{{total_price}}</div>
      </div>
      <!--<div class="all-price">-->
      <!--<div class="title">运费<label>(总重：2.820kg)</label></div>-->
      <!--<div class="price">+&nbsp;¥10</div>-->
      <!--</div>-->
      <div class="orderSure-btn-group">
        <i-button type="info" i-class="orderSure-pay-btn" v-on:click="orderPay">在线支付</i-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderSure',
    data () {
      return {
        addressData: null,
        shop_id: '',
        orderId: '',
        goodsList: [],
        total_price: '0'
      }
    },
    onShow () {
      this.shop_id = this.$route.query.cartsIds
      console.log(this.getCurrentPages()[1].route)
      this.getDefaultAddress()
      // wx.removeStorageSync('addressData')
    },
    methods: {
      getDefaultAddress () {
        if (wx.getStorageSync('addressData')) {
          this.addressData = JSON.parse(wx.getStorageSync('addressData'))
          this.addressData.detAddress = this.addressData.area + this.addressData.address
          if (this.getCurrentPages()[1].route === 'pages/shopping/detail') {
            this.singleCreated()
          } else {
            this.createdOrder(this.addressData.id)
          }
        } else {
          this.$ajax.getDefaultAddress().then((res) => {
            if (res.code === 0) {
              this.addressData = res.data
              if (this.getCurrentPages()[1].route === 'pages/shopping/detail') {
                this.singleCreated()
              } else {
                this.createdOrder(this.addressData.id)
              }
            }
          })
        }
      },
      getOrderDetail (orderId) {
        const obj = {
          id: orderId
        }
        this.$ajax.getOrderDetail(obj).then((res) => {
          if (res.code === 0) {
            this.goodsList = res.data.goodsInfo
            this.total_price = res.data.total_price
          }
        })
      },
      singleCreated () {
        const obj = {
          goods_id: this.$route.query.cartsIds,
          number: this.$route.query.num,
          address: this.addressData.detAddress,
          consignee_name: this.addressData.name,
          consignee_mobile: this.addressData.tel,
          address_id: this.addressData.id
        }
        this.$ajax.singleCreatedOrder(obj).then((res) => {
          if (res.code === 0) {
            this.orderId = res.data
            this.getOrderDetail(this.orderId)
          }
        })
      },
      createdOrder (addressId) {
        const obj = {
          shop_id: this.shop_id,
          address_id: addressId
        }
        this.$ajax.createdOrder(obj).then((res) => {
          if (res.code === 0) {
            this.orderId = res.data
            this.getOrderDetail(this.orderId)
          }
        })
      },
      chooseAddress () {
        this.$router.push({
          path: '/pages/address/addressList'
        })
      },
      orderPay () {
        const obj = {
          order_id: this.orderId
        }
        this.$ajax.getPayOrderData(obj).then((res) => {
          if (res.code === 0) {
            wx.requestPayment({
              timeStamp: res.data.timestamp + '',
              nonceStr: res.data.noncestr,
              package: `prepay_id=${res.data.prepayid}`,
              signType: 'MD5',
              paySign: res.data.sign,
              success () {
                wx.redirectTo({
                  url: '/pages/shopping/payResult'
                })
              }
            })
          }
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
