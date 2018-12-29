<template>
  <div class="classify">
    <div class="classify-left">
      <scroll-view scroll-y="true" class="classify-scroll-view">
        <ul>
          <li class="left-item" :class="{'leftActive':currIndex === index}" v-for="(item,index) in leftList"
              :key="index" v-on:click="selectedFn(item,index)">
            {{item.name}}
          </li>
        </ul>
      </scroll-view>
    </div>
    <div class="classify-right">
      <scroll-view scroll-y="true" class="classify-scroll-view">
        <ul class="classify-right-ul">
          <li class="right-item" v-for="(item,index) in rightList" :key="index">
            <div class="item-image">
              <img :src="item.img" alt="">
            </div>
            <div class="item-info">{{item.name}}</div>
          </li>
        </ul>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'classify',
    data () {
      return {
        currIndex: 0,
        leftList: [],
        rightList: [],
        goodsClass: ''
      }
    },
    components: {},
    onShow () {
      this.getLeftMenu()
    },
    methods: {
      getLeftMenu () {
        const obj = {
          pid: 0
        }
        this.$ajax.getClassifyList(obj).then((res) => {
          if (res.code === 0) {
            this.leftList = res.data
            this.goodsClass = this.leftList[0].id
            this.getShoppingRight()
          }
        })
      },
      getShoppingRight () {
        const obj = {
          pid: this.goodsClass
        }
        this.$ajax.getClassifyList(obj).then((res) => {
          if (res.code === 0) {
            this.rightList = []
            this.rightList = res.data
          }
        })
      },
      selectedFn (item, index) {
        this.currIndex = index
        this.goodsClass = item.id
        console.log(item.id)
        this.getShoppingRight()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../_sass/reset";

  .classify-scroll-view {
    height: 100%;
  }

  .classify {
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: flex-start;
    align-content: flex-start;
    .classify-left {
      height: 100%;
      width: rpx(200);
      .left-item {
        text-align: center;
        font-size: rpx(28);
        padding: rpx(25);
        &.leftActive {
          background: #ffffff;
          font-size: rpx(30);
          color:red;
        }
      }
    }
    .classify-right {
      flex: 1;
      height: 100%;
      background: #ffffff;
      .classify-right-ul {
        display: flex;
        align-content: flex-end;
        align-items: flex-end;
        justify-content: left;
        flex-wrap: wrap;
      }
      .right-item {
        width: rpx(153);
        padding: rpx(15);
      }
      .item-image {
        width: rpx(153);
        text-align: center;
        image {
          width: rpx(100);
          height: rpx(100);
          display: block;
          margin: 0 auto;
        }
      }
      .item-info {
        margin-top: rpx(15);
        font-size: rpx(30);
        text-align: center;
      }
    }
  }
</style>
