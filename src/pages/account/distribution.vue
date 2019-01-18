<template>
  <div class="dis-page">
    <div class="user">
      <div class="user-info-box">
        <div class="user-info-image">
          <img :src="userInfo.headimgurl" alt="">
        </div>
        <div class="user-info">
          <div class="user-name">
            {{userInfo.user_name}}
          </div>
          <div class="user-info-content"></div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-list">
        <div class="list-item the-one">
          <div class="icon">
            <img src="../../../static/common/my/money.png" alt="">
          </div>
          <div class="my-content">
            <p class="my-content-dec">我的伙伴</p>
            <p class="my-content-num"><span>{{myParentNum}}</span>人</p>
          </div>
        </div>
        <div class="list-item">
          <div class="icon">
            <img src="../../../static/common/my/my-parent.png" alt="">
          </div>
          <div class="my-content">
            <p class="my-content-dec">已获得奖励</p>
            <p class="my-content-num"><span>{{myMoney}}</span>元</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'account',
    data () {
      return {
        // 用户信息
        userInfo: {},
        // 用户获取的返利的总钱数
        myMoney: 0,
        // 用户的下级
        myParentNum: 0
      }
    },
    onLoad () {

    },
    onShow () {
      if (wx.getStorageSync('token')) {
        if (!wx.getStorageSync('userInfo')) {
          this.getUserInfoFn()
        } else {
          this.userInfo = JSON.parse(wx.getStorageSync('userInfo'))
        }
      }
      wx.checkSession({
        success () {
          if (!wx.getStorageSync('token')) {
            wx.navigateTo({
              url: '/pages/account/login'
            })
          }
        },
        fail () {
          wx.navigateTo({
            url: '/pages/account/login'
          })
        }
      })
    },
    methods: {
      getUserInfoFn () {
        this.$ajax.getUserInfo().then((res) => {
          if (res.code === 0) {
            wx.setStorageSync('userInfo', JSON.stringify(res.data))
            this.userInfo = res.data
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../_sass/reset";

  .dis-page {
    background: $colorL;
    /*padding: rpx(15);*/
  }
  .user {
    background: $colorM;
    .user-info-box {
      background-image: linear-gradient(90deg, #ED240D 0%, #F56A2B 100%);
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
      margin-left: rpx(20);
      .user-name {
        font-size: $fontM;
        color: rgba(255, 255, 255, 0.7);
        margin-top: rpx(40);
      }
      .user-info-content {
        height: rpx(36);
        width: rpx(225);
      }
    }
  }

  .content{
    background: $colorM;
    margin-top: rpx(40);
    .content-list{
      padding: rpx(20);
      display: flex;

      .list-item{
        flex-wrap: wrap;
        width: 50%;
        /*margin-bottom: rpx(15);*/
        margin-left: rpx(30);
        display: flex;
        .icon{
          width: rpx(96);
          height: rpx(96);
          padding-top: rpx(20);
          image {
            width: 100%;
            height: 100%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
          }
        }
        .my-content{
          flex: 1;
          margin-left: rpx(20);
          padding-top: rpx(20);
          .my-content-dec{
            font-size:$fontA;
            font-weight: bold;
          }
          .my-content-num{
            font-size:$fontA;
            font-weight: bold;
            span{
              color:red;
            }
          }
        }
      }
      // special
      .the-one{
        border-right: 1px solid $colorH;
      }
    }

  }

  .order-control {
    max-height: rpx(125);
    min-height: rpx(125);
    margin-top: rpx(20);
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    .control-item {
      flex: 1;
      text-align: center;
      .item-icon {
        margin: 0 auto;
        width: rpx(80);
        height: rpx(80);
        line-height: rpx(80);
      }
      .item-type {
        font-size: $fontI;
        color: $colorG;
      }
    }
  }

  .center-list {
    margin-top: rpx(20);
    padding-right: 0;
    background: #ffffff;
    .list-item {
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: left;
      margin-bottom: rpx(15);
    }
    .center-list-icon {
      margin: 0 auto;
      width: rpx(60);
      height: rpx(60);
      line-height: rpx(60);
    }
    .center-list-type {
      flex: 1;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: space-between;
      padding-left: rpx(25);
      .text {
        flex: 1;
        font-size: $fontB;
        padding: rpx(12) 0;
        border-bottom: rpx(1) solid $colorH;
      }
    }
  }
</style>
