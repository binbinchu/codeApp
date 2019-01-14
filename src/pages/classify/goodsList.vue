<template>
  <div class="section shopping-div recommend">
    <scroll-view :scroll-y="Y" @scrolltolower="loadMore" @scroll="loadMore" class="classify-scroll-view">
      <block v-if="!complete&&loaded">
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
        <div v-if="!complete&&!loaded">暂无更过数据...</div>
      </block>
      <block v-else-if="complete&&loaded">暂无数据...</block>
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
        loaded: false
      }
    },
    onShow () {
      this.getGoodsList()
    },
    methods: {
      loadMore () {
        console.log('11')
      },
      getGoodsList () {
        const obj = {
          page: this.page,
          pageSize: this.pageSize,
          goodsClass: parseInt(this.$route.query.goodsListId)
        }
        this.$ajax.getGoodsList(obj).then((res) => {
          if (res.code === 0) {
            if (res.data.length < 1) {
              // 没有数据
              this.complete = true
              this.loaded = true
            } else if (this.goodsList.length > 0 && res.data.length < 1) {
              // 暂无更过数据
              this.complete = false
              this.loaded = false
            } else if (res.data.length < this.pageSize) {
              // 暂无更过数据
              this.complete = false
              this.loaded = false
            } else {
              // 有数据
              this.complete = false
              this.loaded = true
            }
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
    .shopping-more {
      width: 98%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      padding: rpx(15) 0 rpx(15) 0;
      .shopping-type-title {
        color: #969696;
        font-size: rpx(26);
      }
      .more {
        color: #949494;
        font-size: rpx(24);
      }
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

  .recommend {
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
