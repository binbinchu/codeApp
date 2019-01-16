<template>
  <div class="search">
    <div class="search-first">
      <div class="search-left-box">
        <i-input type="text" left mode="wrapped" i-class="search-input" maxlength="100" @change="changeFn"></i-input>
        <i-icon type="search" color="#666666" i-class="search-icon-search" size="26"></i-icon>
      </div>
      <div class="search-right-box">
        <i-button type="error" i-class="search-btn" v-on:click="toSearch">搜索</i-button>
      </div>
    </div>
    <div v-show="!resultFlage">
      <div class="section search-second">
        <div class="hot-search">
          <div class="hot-search-type">历史搜索</div>
          <div class="hot-search-clear" @click="clearHistory">
            <img src="../../../static/common/icon/delete.png" alt="">
          </div>
        </div>
        <div class="hot-search-content" v-if="historyData.length>0">
          <div class="content-item" v-for="(item,index) in historyData" :key="index">{{item}}</div>
        </div>
        <div class="hot-search-content" v-else>
          <div class="no-history-text">
            暂无搜索记录
          </div>
        </div>
      </div>
      <!--<div class="section search-second">-->
      <!--<div class="hot-search">-->
      <!--<div class="hot-search-type">热门搜索</div>-->
      <!--<div class="hot-search-btn">换一批</div>-->
      <!--</div>-->
      <!--<div class="hot-search-content">-->
      <!--<div class="content-item" v-for="(item,index) in itemData" :key="index">{{item}}</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <div v-show="resultFlage">
      <div class="search-list-mask">
        <ul>
          <li class="result-list-item" v-for="(item,index) in searchList" :key="index" @click="toDetail(item)">
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data () {
      return {
        searchValue: '',
        // itemData: ['电脑', '手机', '家电', '护肤品', '婴儿用品', '男人装', '女人装', '旅游', '优惠券', '去哪儿了', '我在这儿'],
        searchList: [],
        resultFlage: false,
        historyData: []
      }
    },
    onShow () {
      this.resultFlage = false
      this.historyData = wx.getStorageSync('historyData') || []
    },
    methods: {
      // request:search
      requestSearch (val) {
        const obj = {
          key_word: val,
          goodsClass: '10'
        }
        this.$ajax.loadSearch(obj).then((res) => {
          if (res.code === 0) {
            this.searchList = res.data
            this.historyData.unshift(this.searchValue)
            if (this.searchList.length > 0 && res.data.length > 0) {
              this.resultFlage = true
            } else {
              this.resultFlage = false
            }
          } else {
            this.resultFlage = false
          }
        })
      },
      toSearch () {
        // this.requestSearch(this.searchValue)
        if (this.searchValue !== '') {
          this.requestSearch(this.searchValue)
          const historyData = wx.getStorageSync('historyData') || []
          historyData.unshift(this.searchValue)
          let historyDataArr = this.unique(historyData)
          wx.setStorageSync('historyData', historyDataArr)
        } else {
          this.searchList = []
          this.resultFlage = false
        }
      },
      clearHistory () {
        let historyDataArr = []
        this.historyData = []
        wx.setStorageSync('historyData', historyDataArr)
      },
      changeFn (e) {
        this.searchValue = e.mp.detail.detail.value
        if (this.searchValue === '') {
          this.searchList = []
          this.resultFlage = false
        }
      },
      toDetail (item) {
        this.$router.push({
          path: '/pages/shopping/detail',
          query: {
            goodsId: item.id
          }
        })
      }
    }
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
      .hot-search-clear {
        width: rpx(32);
        height: rpx(32);
        image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .hot-search-btn {
        color: #ed3f14;
        font-size: rpx(25);
      }
    }
    .hot-search-content {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: left;
      .content-item {
        padding: rpx(5) rpx(12);
        font-size: rpx(24);
        margin-bottom: rpx(15);
        margin-right: rpx(15);
        /*background: rgba(255, 255, 255, 0.6);*/
        /*-webkit-border-radius: rpx(15);*/
        /*-moz-border-radius: rpx(15);*/
        /*border-radius: rpx(15);*/
      }
      .no-history-text {
        font-size: $fontC;
      }
    }
  }

  .search-list-mask {
    .result-list-item {
      padding: rpx(30) 0;
      margin-left: rpx(15);
      border-bottom: rpx(1) solid #DCDCDC;
      font-size: rpx(28);
    }
  }
</style>
