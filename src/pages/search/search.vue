<template>
  <div class="search">
    <div class="search-first">
      <div class="search-left-box">
        <i-input type="text" left title="搜索" mode="wrapped" i-class="search-input"></i-input>
      </div>
      <div class="search-right-box"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search'
  }
</script>
<style lang="scss">
  @import "../../../src/_sass/reset";

  .search-input {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    background: #f1f1f1 !important;
    border-radius: rpx(35);
    border: rpx(1) solid #f1f1f1;
  }
</style>

<style scoped lang="scss">
  @import "../../../src/_sass/reset";
  .search-first {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    background: #ffffff;
    .search-left-box {
      width: rpx(600);

    }
    .search-right-box {
      width: rpx(100);
    }
  }
</style>
