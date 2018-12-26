<template>
  <div class="shopping-cart">
    <div class="cart-first">
      <div class="cart-EditorBtn" v-on:click="changeEd()">{{editorText}}</div>
    </div>
    <div class="cart-second">
      <ul class="cart-list">
        <li class="cart-list-item">
          <i-swipeout operateWidth="75" :unclosable="unclosable" :toggle="toggleFlag">
            <div slot="content">
              <div class="goods-info">
                <div class="goods-info-img"></div>
                <div class="goods-info-s">
                  <div class="goods-name"></div>
                  <div class="goods-price"></div>
                  <div class="goods-num"></div>
                </div>
              </div>
            </div>
            <div slot="button" class="cart-list-item-delete">
              <div v-on:click="actionsTap">
                删除
              </div>
            </div>
          </i-swipeout>
        </li>
        <i-action-sheet :visible="visible" @click.stop="handleCancel">
          <div slot="header">
            <view>确定吗？</view>
            <text>删除后无法恢复哦</text>
            <i-button i-class="i-as-btn-text" @click.stop="deleteFn">删除</i-button>
          </div>
        </i-action-sheet>
      </ul>
    </div>
  </div>
</template>

<script>
  import { $Toast } from '../../../static/iview/base/index'

  export default {
    name: 'shoppingCart',
    data () {
      return {
        editorFlag: false,
        visible: false,
        unclosable: true,
        toggleFlag: false,
        actions: [
          {
            name: '删除',
            color: '#ed3f14'
          }
        ],
        startX: 0,
        endX: 0,
        index: 0
      }
    },
    computed: {
      editorText () {
        if (!this.editorFlag) {
          return '编辑'
        } else {
          return '完成'
        }
      }
    },
    methods: {
      changeEd () {
        this.editorFlag = !this.editorFlag
      },
      handleText () {
        $Toast({
          content: '这是文本提示'
        })
      },
      deleteFn () {
        // 删除操作
        console.log('删除')
      },
      handleCancel () {
        this.toggleFlag = true
        this.visible = false
      },
      actionsTap () {
        this.visible = true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../_sass/reset";

  .shopping-cart {
    width: 100%;
    height: 100%;
    padding-top: rpx(70);
  }

  .cart-first {
    position: fixed;
    background: $colorG;
    width: 100%;
    top: 0;
    z-index: 99;
    height: rpx(70);
    display: flex;
    justify-content: right;
    flex-direction: row-reverse;
    align-items: center;
    align-content: center;
    .cart-EditorBtn {
      font-size: rpx(26);
      color: $colorM;
      text-align: center;
      height: rpx(70);
      line-height: rpx(70);
      margin-right: rpx(15);
    }
  }

  .cart-second {
    .cart-list-item-delete {
      height: 100%;
      color: #fff;
      background-image: linear-gradient(90deg, #F5500D 0%, #E1070C 100%);
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
      .goods-info {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: left;
      }
      .goods-info-img {
        width: rpx(114);
        height: rpx(114);
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .goods-info-s {
        margin-left: rpx(10);
      }
      .goods-name {
        font-size: rpx(24);
      }
      .goods-price {
        font-size: rpx(22);
      }
      .goods-num {
      }
    }
  }
</style>
