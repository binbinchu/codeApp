<template>
  <div class="order-sure">
    <div class="div address">
      <div class="address-info"></div>
      <div class="row"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderSure'
  }
</script>

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
  .address{
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
  }
</style>
