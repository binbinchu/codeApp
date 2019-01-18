<template>
  <div class="shopping-cart">
    <div class="cart-first">
      <div class="cart-EditorBtn" v-on:click="changeEd()">{{editorText}}</div>
    </div>
    <div class="cart-second">
      <ul class="cart-list">
        <li class="cart-list-item" v-for="(item,index) in goodsList" :key="index" @click.stop="toDetail(item)">
          <i-swipeout operateWidth="75" :toggle="item.toggleFlag" i-class="shoppingCart-swipeout">
            <div slot="content">
              <div class="goods-info">
                <div class="select" :class="{'active':item.selected}" v-on:click.stop="selectedFn(item)"></div>
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
            <div slot="button" class="cart-list-item-delete" v-on:click.stop="actionsTap(0,item,index)">
              <div>
                删除
              </div>
            </div>
          </i-swipeout>
        </li>
      </ul>
    </div>
    <div class="cart-third">
      <template v-if="!editorFlag">
        <div class="total-price">
          <div class="price-title">总金额：</div>
          <div class="price-num">￥{{selectedNum}}</div>
        </div>
        <div class="cart-btn" v-on:click="nextPay">
          结算({{selectedList.length}})
        </div>
      </template>
      <template v-else>
        <div class="total-price">
          <div class="select" :class="{'active':allSelect}" v-on:click.stop="allSelectFn"></div>
          <div class="price-num">全选</div>
        </div>
        <div class="cart-btn" v-on:click="actionsTap(1)">
          删除({{selectedList.length}})
        </div>
      </template>
    </div>
    <v-modal v-if="visible" :visible="visible" :modalOption="modalOption" :actions="actions"
             :actionMode="actionMode" @click="handleClickCancel"></v-modal>
    <i-message id="message"/>
    <i-toast id="toast"/>
  </div>
</template>

<script>
  import { $Toast, $Message } from '../../../static/iview/base/index'
  import vModal from '../../components/v-modal'

  export default {
    name: 'shoppingCart',
    data () {
      return {
        editorFlag: false,
        visible: false,
        unclosable: true,
        toggleFlag: false,
        // 0 单独删除 1批量删除
        deleteType: 0,
        index: 0,
        goodsList: [],
        selectedList: [],
        modalOption: {},
        actions: [],
        actionMode: 'horizontal',
        deleteObj: {
          deleteId: '',
          index: null
        },
        allSelect: false,
        allPrice: 0,
        selectId: []
      }
    },
    components: { vModal },
    computed: {
      editorText () {
        this.goodsList.forEach((item, index) => {
          item.selected = false
        })
        this.selectedList = []
        if (!this.editorFlag) {
          return '编辑'
        } else {
          return '完成'
        }
      },
      selectedNum () {
        let num = 0
        this.selectedList.forEach((item, index) => {
          num += this.selectedList[index].piece * this.selectedList[index].num
        })
        this.allPrice = num
        return num
      }
    },
    watch: {
      'selectedList' (val) {
        this.selectId = []
        val.forEach((item, index) => {
          this.selectId.push(item.id)
        })
        this.deleteObj.deleteId = this.selectId.join(',')
      }
    },
    onShow () {
      this.loadShoppingCart()
    },
    methods: {
      changeEd () {
        this.editorFlag = !this.editorFlag
      },
      deleteFn () {
        // 删除操作
        this.deleteLoad()
      },
      nextPay () {
        if (!this.deleteObj.deleteId) {
          $Toast({
            content: '请选择要结算的商品',
            type: 'error'
          })
          return false
        }
        this.$router.push({
          path: '/pages/shopping/orderSure',
          query: {
            type: 'orderDetail',
            cartsIds: this.deleteObj.deleteId
          }
        })
      },
      deleteLoad () {
        this.visible = false
        if (this.deleteType === 0) {
          this.goodsList[this.deleteObj.index].toggleFlag = true
        }
        let obj = {
          id: this.deleteObj.deleteId
        }
        this.$ajax.deleteCarItem(obj).then((res) => {
          if (res.code === 0) {
            $Message({
              content: '删除成功',
              type: 'success'
            })
            if (this.deleteType === 0) {
              this.goodsList.splice(this.deleteObj.index, 1)
            } else {
              this.selectedList.forEach((item, index) => {
                this.goodsList.forEach((_item, _index) => {
                  if (item.id === _item.id) {
                    this.goodsList.splice(_index, 1)
                  }
                })
              })
            }
          } else {
            $Message({
              content: '删除失败',
              type: 'error'
            })
          }
        })
      },
      handleClickCancel () {
        if (this.deleteType === 0) {
          this.goodsList[this.deleteObj.index].toggleFlag = true
        }
        this.visible = false
      },
      actionsTap (type, item, index) {
        this.deleteType = type
        if (this.deleteType === 0) {
          this.deleteObj.deleteId = item.id
          this.deleteObj.index = index
        }
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
            let that = this
            this.goodsList.forEach((item, index) => {
              that.$set(item, 'selected', false)
              that.$set(item, 'unclosable', true)
              that.$set(item, 'toggleFlag', false)
            })
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
      },
      selectedFn (item) {
        // this.selectedList.forEach((item, index) => {
        //   item.selected = false
        // })
        item.selected = !item.selected
        // this.selectedList = []
        if (item.selected) {
          this.selectedList.push(item)
        } else {
          this.selectedList.forEach((_item, _index) => {
            if (_item.id === item.id) {
              this.selectedList.splice(_index, 1)
            }
          })
        }
      },
      allSelectFn () {
        this.allSelect = !this.allSelect
        if (this.allSelect) {
          this.selectedList = this.goodsList
          this.goodsList.forEach((item, index) => {
            item.selected = true
          })
        } else {
          this.selectedList = []
          this.goodsList.forEach((item, index) => {
            item.selected = false
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../../_sass/reset";

  .shoppingCart-swipeout {
    width: 100%;
  }
</style>
<style scoped lang="scss">
  @import "../../_sass/reset";

  .shopping-cart {
    width: 100%;
    height: 100%;
    padding-top: rpx(70);
  }

  .select {
    width: rpx(100);
    height: rpx(100);
    background: url("../../../static/common/icon/icon-circle.png") no-repeat center;
    background-size: 34% 34%;
    &.active {
      background: url("../../../static/common/icon/icon-circle-checked.png") no-repeat center;
      background-size: 34% 34%;
    }
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
    width: 100%;
    padding-bottom: rpx(98);
    overflow: hidden;
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
      width: rpx(385);
      font-size: rpx(26);
      height: rpx(70);
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: normal;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .goods-price {
      display: flex;
      /*flex-direction: column;*/
      .new-price {
        flex: 1;
        font-size: rpx(26);
        padding-top: rpx(10)
      }
    }
    .goods-num {
      display: flex;
      justify-content: right;
      flex-direction: row-reverse;
      width: 100%;
      flex: 0;
      padding-top: rpx(15);
      .chooseView {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-between;
        padding: rpx(0) rpx(15) rpx(0) rpx(15);
      }
    }
    .cart-list-item {
      display: flex;
      justify-content: left;
      align-items: center;
      align-content: center;
      width: 100%;
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

  .cart-third {
    position: fixed;
    bottom: rpx(0);
    background: $colorM;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    height: rpx(98);
    width: rpx(725);
    padding: rpx(0) rpx(0) rpx(0) rpx(25);
    .total-price {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: left;
      .price-title {
        font-size: $fontB;
        color: $colorC;
      }
      .price-num {
        font-size: $fontB;
        color: $colorB;
      }
    }
    .cart-btn {
      width: rpx(180);
      height: rpx(98);
      line-height: rpx(98);
      font-size: $fontB;
      color: $colorM;
      text-align: center;
      background-image: linear-gradient(90deg, #FF8D51 0%, #FF581D 99%);
    }
  }
</style>
