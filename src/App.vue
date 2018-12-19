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
</style>
