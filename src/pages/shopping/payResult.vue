<template>
  <div>
    <view class="top">
      <view class="wrap">
        <icon type="success" size="30"></icon>
        <text class="word">支付成功</text>
      </view>
    </view>
    <view class="btn-group">
      <button type="primary" style="background-color:#f9364f" class="continue">完成</button>
      <button type="primary" style="background-color:#c9c9c9;color:#656565" class="see">查看订单</button>
    </view>
  </div>
</template>

<script>
  export default {
    name: 'payResult',
    data () {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  @import "../../_sass/reset";

  .wrap {
    width: 100%;
    min-height: rpx(100);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: rpx(50);
    margin-bottom: rpx(100);
  }

  .img {
    width: rpx(25);
    height: rpx(25);
  }

  .word {
    font-size: rpx(32);
    margin-left: rpx(15);
  }

  .btn-group {
    padding: 0 rpx(20);
  }

  .see {
    margin-top: rpx(10);
    color: #6e6e6e;
  }
</style>
