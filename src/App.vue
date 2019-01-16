<script>
  export default {
    created () {
      // 调用API从本地缓存中获取数据
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

      // eslint-disable-next-line
      console.log('app created and cache logs by setStorageSync')
    }
  }
</script>

<style lang="scss">
  @import "./_sass/reset";

  page {
    height: 100% !important;
    background: #f1f1f1;
  }

  .container {
    width: rpx(750);
    box-sizing: border-box;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }

  .section {
    margin-top: rpx(20);
    display: block;
  }

  // 价格 组合css
  .price {
    display: flex;
    align-items: flex-end;
    align-content: flex-end;
    justify-content: left;
    margin-top: rpx(14);
    &.new-price {
      color: #ed3f14;
    }
    &.old-price {
      text-decoration: line-through;
    }
    .symbol {
      font-size: rpx(24);
    }
    .number {
      margin-left: rpx(8);
      font-size: rpx(32);
    }
  }

  // i-button 覆盖样式
  .BTN {
    width: rpx(260) !important;
    height: rpx(68) !important;
    border-radius: rpx(36) !important;
    margin: 0 !important;
    height: rpx(68) !important;
    line-height: rpx(68) !important;
    // -购物车
    &.shopping-cart-btn {
      color: #ffffff !important;
      background: #FF6600 !important;
    }
    &.buy-btn {
      color: #ffffff !important;
      background: #FF0000 !important;
    }
  }

  .action-btn {
    &.shopping-cart-btn {
      color: #ffffff !important;
      background: #FF6600 !important;
    }
    &.buy-btn {
      color: #ffffff !important;
      background: #FF0000 !important;
    }
  }
</style>
