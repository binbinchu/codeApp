<template>
  <div class="search">
    <div class="search-first">
      <div class="search-left-box">
        <i-input type="text" left mode="wrapped" i-class="search-input"></i-input>
        <i-icon type="search" color="#666666" i-class="search-icon-search" size="26"></i-icon>
      </div>
      <div class="search-right-box">
        <i-button type="error" i-class="search-btn">搜索</i-button>
      </div>
    </div>
    <div class="section search-second">
      <div class="hot-search">
        <div class="hot-search-type">热门搜索</div>
        <div class="hot-search-btn">换一批</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    methods: {}
  }
</script>
<style lang="scss">
  @import "../../../src/_sass/reset";

  .search-input {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    padding-left: rpx(80) !important;
    background: #f1f1f1 !important;
    border-radius: rpx(35);
    border: rpx(1) solid #f1f1f1;
  }

  .search-icon-search {
    position: absolute;
    top: rpx(30);
    left: rpx(50);
  }

  .search-btn {
    margin: 0 !important;
    border-radius: rpx(15) !important;
    height: rpx(70) !important;
    line-height: rpx(70) !important;
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
      position: relative;
    }
    .search-right-box {
      width: rpx(120);
      padding-right: rpx(30);
    }
  }

  .search-second {
    padding-left: rpx(30);
    padding-right: rpx(30);
    .hot-search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      height: rpx(68);
      .hot-search-type {
        font-size: rpx(30);
        color: #000000;
      }
      .hot-search-btn {
        color: #ed3f14;
        font-size: rpx(25);
      }
    }
  }
</style>
