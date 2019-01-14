<template>
  <div class="shopping-div recommend">
    <scroll-view :scroll-y="Y" @scrolltolower="loadMore" class="classify-scroll-view">
      <block v-if="!complete&&loaded||!complete&&!loaded">
        <div class="goods-ul">
          <div class="recommend-item" v-for="(item,index) in goodsList" :key="index"
               v-on:click="toDetail(item)">
            <div class="goods-image">
              <img :src="item.img_list" alt="">
            </div>
            <div class="goods-info">
              <div class="goods-name">{{item.name}}</div>
              <div class="goods-price">
                <div class="rmb">¥</div>
                <div class="price">{{item.price}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="no-more" v-if="!complete&&!loaded">暂无更过数据...</div>
      </block>
      <block v-else-if="complete&&loaded">
        <div class="nothing">暂无数据...</div>
      </block>
    </scroll-view>
  </div>
</template>

<script>
  export default {
    name: 'goodsList',
    data () {
      return {
        Y: true,
        page: 1,
        pageSize: 6,
        goodsList: [],
        complete: false,
        loaded: false,
        title: ''
      }
    },
    onShow () {
      this.page = 1
      this.pageSize = 6
      this.goodsList = []
      this.getGoodsList()
      wx.setNavigationBarTitle({
        title: this.$route.query.title
      })
    },
    methods: {
      loadMore () {
        this.page++
        this.getGoodsList()
        if (!this.loaded) {
          this.page = this.page - 1
        }
      },
      getGoodsList () {
        const obj = {
          page: this.page,
          pageSize: this.pageSize,
          goodsType: parseInt(this.$route.query.goodsListId)
        }
        this.$ajax.getGoodsList(obj).then((res) => {
          if (res.code === 0) {
            if (this.goodsList.length === 0 && res.data.length < 1) {
              // 没有数据
              this.complete = true
              this.loaded = true
            } else if (this.goodsList.length > 0 && res.data.length < 1) {
              // 暂无更过数据
              this.goodsList = this.goodsList.concat(res.data)
              this.complete = false
              this.loaded = false
            } else if (res.data.length < this.pageSize) {
              // 暂无更过数据
              this.goodsList = this.goodsList.concat(res.data)
              this.complete = false
              this.loaded = false
            } else {
              // 有数据
              this.goodsList = this.goodsList.concat(res.data)
              this.complete = false
              this.loaded = true
            }
            console.log(this.complete)
            console.log(this.loaded)
          }
        })
      },
      toDetail (item) {
        console.log(item)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../_sass/reset";

  // 加载更多与空数据
  .no-more,
  .nothing {
    font-size: $fontB;
    color: $color-theme-font;
    text-align: center;
  }

  .classify-scroll-view {
    height: 100%;
  }

  .shopping-div {
    padding-left: rpx(20);
    padding-right: rpx(20);
    background: #ffffff;
    height: 100%;
    &.recommend {
      background: #f1f1f1;
    }
    .shopping-list-image {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      .shopping-image-box {
        width: rpx(220);
        height: rpx(236);
        padding: rpx(15) 0 rpx(15) 0;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .goods-ul {
    padding-top: rpx(15);
    padding-bottom: rpx(15);
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .recommend-item {
      width: rpx(326);
      background: rgba(255, 255, 255, 1);
      margin-bottom: rpx(1);
      padding: rpx(15);
    }
    .goods-image {
      width: rpx(325);
      height: rpx(355);
      image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .goods-info {
      padding-top: rpx(15);
      line-height: rpx(38);
      .goods-name {
        width: rpx(325);
        font-size: rpx(26);
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        word-break: break-all;
        height: rpx(70);
      }
      .goods-price {
        display: flex;
        justify-content: left;
        align-items: flex-end;
        align-content: flex-end;
        color: #ed3f14;
      }
      .rmb {
        font-size: rpx(22);
      }
      .price {
        margin-left: rpx(5);
        font-size: rpx(26);
      }
    }
  }
</style>
