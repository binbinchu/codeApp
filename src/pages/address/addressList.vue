<template>
  <div class="addressList">
    <ul class="addressList-ul">
      <li class="addressList-list" v-for="(item,index) in addressList" :key="index" @click.stop="chooseAddress(item)">
        <i-swipeout operateWidth="150" :toggle="item.toggleFlag">
          <div slot="content">
            <div class="content">
              <div class="address">
                <div class="address-info">
                  <div class="user-name-phone">
                    <b>{{item.name}}&nbsp;{{item.tel}}</b>
                  </div>
                  <div class="user-address">
                    <div class="isDefault" v-if="item.default==='02'">默认</div>
                    <div class="addressInfo">{{item.area}}{{item.address}}</div>
                  </div>
                </div>
                <div class="row" @click.stop="editorAddress(item)">
                  <i-icon type="editor"/>
                </div>
              </div>
            </div>
          </div>
          <div slot="button" class="addressList-delete">
            <div class="set-default" @click.stop="setDefault(item,index)">
              <div>设为默认</div>
            </div>
            <div class="set-delete" @click.stop="deleteAddress(item,index)">
              <div>删除</div>
            </div>
          </div>
        </i-swipeout>
      </li>
    </ul>
    <div class="add-address-btn" @click="toAddAddress">
      新增收货地址
    </div>
    <v-modal v-if="visible" :visible="visible" :modalOption="modalOption" :actions="actions"
             :actionMode="actionMode" @click="handleClickCancel"></v-modal>
    <i-message id="message"/>
  </div>
</template>

<script>
  import vModal from '../../components/v-modal'

  export default {
    name: 'addressList',
    data () {
      return {
        /* v-modal */
        visible: false,
        actions: [],
        modalOption: {},
        actionMode: 'horizontal',
        deleteObj: {
          deleteId: '',
          index: null
        },
        /* v-modal */
        addressList: [],
        path: []
      }
    },
    components: { vModal },
    onShow () {
      this.getAddressList()
      // eslint-disable-next-line no-undef
      this.path = getCurrentPages()
    },
    methods: {
      chooseAddress (item) {
        console.log(this.path[this.path.length - 2])
        if (this.path[this.path.length - 2].route === 'pages/shopping/orderSure') {
          wx.setStorageSync('addressData', JSON.stringify(item))
          wx.navigateBack({
            delta: 1
          })
        }
      },
      toAddAddress () {
        this.$router.push({
          path: '/pages/address/addressNew',
          query: {
            title: '新增收货地址'
          }
        })
      },
      editorAddress (item) {
        this.$router.push({
          path: '/pages/address/addressNew',
          query: {
            title: '修改收货地址',
            id: item.id,
            addressData: JSON.stringify(item)
          }
        })
      },
      deleteAddress (item, index) {
        this.deleteObj.deleteId = item.id
        this.deleteObj.index = index
        this.modalOption = {}
        this.actions = []
        this.modalOption = Object.assign({}, this.modalOption, {
          title: '确定',
          body: '确定此条收货地址吗？',
          clickEvent: this.deleteFn
        })
        this.actions.push({ name: '取消' }, { name: '删除', color: '#ed3f14', loading: false })
        this.visible = true
      },
      setDefault (item, index) {
        const obj = {
          id: item.id
        }
        this.$ajax.setDefault(obj).then((res) => {
          if (res.code === 0) {
            this.addressList[index].toggleFlag = true
            this.addressList.forEach((_item, _index) => {
              _item.default = '01'
            })
            this.addressList[index].default = '02'
            this.message('已设置为默认地址', 'success')
          }
        })
      },
      getAddressList () {
        this.$ajax.addressList().then((res) => {
          if (res.code === 0) {
            this.addressList = res.data
            let that = this
            this.addressList.forEach((item, index) => {
              that.$set(item, 'toggleFlag', false)
            })
          }
        })
      },
      deleteFn () {
        this.addressList[this.deleteObj.index].toggleFlag = true
        this.visible = false
        const obj = {
          id: this.deleteObj.deleteId
        }
        this.$ajax.deleteAddress(obj).then((res) => {
          if (res.code === 0) {
            this.message('删除成功', 'success')
            this.addressList.splice(this.deleteObj.index, 1)
          } else {
            this.message('删除失败', 'error')
          }
        })
      },
      handleClickCancel () {
        this.addressList[this.deleteObj.index].toggleFlag = true
        this.visible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../_sass/reset";

  .addressList-ul {
    padding: 0;
    margin: 0;
    .addressList-list {
      width: 100%;
      .content {
        padding: rpx(15) rpx(20) rpx(15) rpx(30);
        background: $colorM;
        .address {
          display: flex;
          align-items: center;
          align-content: center;
          justify-content: space-between;
          padding: rpx(30) rpx(15);
          .user-name-phone {
            color: $color-theme-font;
            font-size: $fontJ;
          }
          .user-address {
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: left;
            .isDefault {
              font-size: $fontD;
              background: rgba(255, 84, 0, 0.5);
              color: $colorB;
              padding: rpx(2) rpx(5);
            }
            .addressInfo {
              width: rpx(525);
              font-size: $fontL;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
    .addressList-delete {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
      height: 100%;
      div {
        height: 100%;
        flex: 1;
        text-align: center;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
      }
      .set-default {
        color: $colorG;
        background-image: linear-gradient(90deg, $colorN 0%, $colorO 100%);
      }
      .set-delete {
        color: #fff;
        background-image: linear-gradient(90deg, #F5500D 0%, #E1070C 100%);
      }
    }
  }

  .add-address-btn {
    position: fixed;
    bottom: rpx(0);
    left: rpx(0);
    width: 100%;
    height: rpx(86);
    color: $colorM;
    font-size: $fontL;
    background: $colorV;
    text-align: center;
    line-height: rpx(86);
  }
</style>
