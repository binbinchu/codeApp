<template>
  <div class="shopping-cart">
    <div class="cart-first">
      <div class="cart-EditorBtn" v-on:click="changeEd()">{{editorText}}</div>
    </div>
    <div class="cart-second">
      <ul class="cart-list">
        <li class="cart-list-item" v-for="(item,index) in goodsList" :key="index" @click.stop="toDetail(item)">
          <i-swipeout operateWidth="75" :unclosable="unclosable" :toggle="toggleFlag">
            <div slot="content">
              <div class="goods-info">
                <div class="goods-info-img">
                  <img :src="item.goods_info.img" alt="">
                </div>
                <div class="goods-info-s">
                  <div class="goods-name">{{item.goods_info.name}}</div>
                  <div class="goods-price">
                    <div class="price new-price">
                      <div class="symbol">￥</div>
                      <div class="number">{{item.piece}}</div>
                    </div>
                    <div class="goods-num">
                      <div class="chooseView number">
                        <!--<div class="title">数量</div>-->
                        <div class="tab-item">
                          <i-input-number :value="item.num" min="1" max="100" step="1" size="small"
                                          @change.stop="goodsCount($event,item)"></i-input-number>
                        </div>
                      </div>
                    </div>
                  </div>

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
      </ul>
    </div>
    <v-modal v-if="visible" :visible="visible" :modalOption="modalOption" :actions="actions"
             :actionMode="actionMode" @click="handleClickCancel"></v-modal>
  </div>
</template>

<script>
  import { $Toast } from '../../../static/iview/base/index'
  import vModal from '../../components/v-modal'

  export default {
    name: 'shoppingCart',
    data () {
      return {
        editorFlag: false,
        visible: false,
        unclosable: true,
        toggleFlag: false,
        index: 0,
        goodsList: [],
        modalOption: {},
        actions: [],
        actionMode: 'horizontal'
      }
    },
    components: { vModal },
    computed: {
      editorText () {
        if (!this.editorFlag) {
          return '编辑'
        } else {
          return '完成'
        }
      }
    },
    onShow () {
      this.loadShoppingCart()
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
      handleClickCancel () {
        this.toggleFlag = true
        this.visible = false
      },
      actionsTap () {
        this.modalOption = {}
        this.actions = []
        this.modalOption = Object.assign({}, this.modalOption, {
          title: '确定',
          body: '确定从购物车删除该商品吗？',
          clickEvent: this.deleteFn
        })
        this.actions.push({ name: '取消' }, { name: '删除', color: '#ed3f14', loading: false })
        this.visible = true
      },
      loadShoppingCart () {
        this.$ajax.shoppingCartList().then((res) => {
          if (res.code === 0) {
            this.goodsList = res.data
          }
        })
      },
      upDataCart (item) {
        const obj = {
          goods_id: item.goods_info.id,
          num: item.num
        }
        this.$ajax.upDataTheCart(obj).then((res) => {
        })
      },
      goodsCount (e, item) {
        item.num = e.mp.detail.value
        this.upDataCart(item)
      },
      toDetail (item) {
        this.$router.push({
          path: '/pages/shopping/detail',
          query: {
            goodsId: item.goods_info.id
          }
        })
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
    .goods-info {
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: left;
      padding: rpx(25);
    }
    .goods-info-img {
      width: rpx(188);
      height: rpx(188);
      /* flex 是这么用么 */
      image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .goods-info-s {
      flex: 1;
      margin-left: rpx(30);
    }
    .goods-name {
      font-size: rpx(35);
      font-weight: bold;
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
      /*flex-direction: column;*/
      .new-price{
        flex: 1;
        font-size: rpx(26);
        padding-top: rpx(10)
      }

      .goods-num {
        width: 90%;
        flex:0;
        padding-top:rpx(15);
        .chooseView {
          display: flex;
          align-items: center;
          align-content: center;
          justify-content: space-between;
          padding: rpx(0) rpx(15) rpx(0) rpx(15);
        }
      }
    }

    .cart-list-item-delete {
      height: 100%;
      color: #fff;
      background-image: linear-gradient(90deg, #F5500D 0%, #E1070C 100%);
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
    }
  }
</style>
