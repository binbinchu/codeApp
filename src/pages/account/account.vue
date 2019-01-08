<template>
  <div class="account">
    <button open-type="openSetting">
      授权
    </button>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">
      登录
    </button>
    <div class="div user-center">
      <div class="user-info-box">
        <div class="user-info-image">
          <img src="" alt="">
        </div>
        <div class="user-info">
          <div class="user-name">
            谁说可可西里没有海
          </div>
          <div class="user-info-content"></div>
        </div>
      </div>
    </div>
    <div class="div order-control">
      <div class="control-item">
        <div class="item-icon"></div>
        <div class="item-type">待付款</div>
      </div>
      <div class="control-item">
        <div class="item-icon"></div>
        <div class="item-type">待发货</div>
      </div>
      <div class="control-item">
        <div class="item-icon"></div>
        <div class="item-type">待收货</div>
      </div>
      <div class="control-item">
        <div class="item-icon"></div>
        <div class="item-type">待评价</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'account',
    data () {
      return {
        userInfo: {}
      }
    },
    onShow () {
      if (wx.getStorageSync('token')) {
        console.log(wx.getStorageSync('token'))
      }
      console.log(this.isTokenTimeOut())
    },
    methods: {
      ToLogin () {
      },
      getUserInfo () {
        let that = this
        wx.getUserInfo({
          success (res) {
            that.WxToLogin(res)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../_sass/reset";

  .div {
    background: $colorM;
    padding: rpx(15);
  }

  .user-center {
    background: $colorM;
    .user-info-box {
      background-image: linear-gradient(90deg, #ED240D 0%, #F56A2B 100%);
      border-radius: rpx(12);
      box-shadow: 0 rpx(4) rpx(8) rgba(228, 57, 60, .4);
      height: rpx(225);
      padding: rpx(25);
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: left;
    }
    .user-info-image {
      width: rpx(120);
      height: rpx(120);
      image {
        width: 100%;
        height: 100%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
    }
    .user-info {
      margin-left: rpx(15);
      .user-name {
        font-size: $fontB;
        color: rgba(255, 255, 255, 0.7);
      }
      .user-info-content {
        height: rpx(36);
        width: rpx(225);
      }
    }
  }

  .order-control {
    margin-top: rpx(30);
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    .control-item {
      text-align: center;
      .item-icon {
        margin: 0 auto;
        width: rpx(80);
        height: rpx(80);
        background: rgba(0, 0, 0, 0.5);
      }
      .item-type {
        margin-top: rpx(15);
        font-size: $fontI;
        color: $colorG;
      }
    }
  }
</style>
