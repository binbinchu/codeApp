<template>
  <div class="addressList">
    <ul class="addressList-ul">
      <li class="addressList-list">
        <i-swipeout operateWidth="75">
          <div slot="content">
            <div class="content">
              <div class="address">
                <div class="address-info">
                  <div class="user-name-phone">
                    <b>ChuBinBin&nbsp;18463165732</b>
                  </div>
                  <div class="user-address">
                    北京市海淀区五环到六环之间永泰庄6号院4号楼
                  </div>
                </div>
                <div class="row">
                  <i-icon type="editor"/>
                </div>
              </div>
            </div>
          </div>
          <div slot="button" class="addressList-delete">
            <div>
              删除
            </div>
          </div>
        </i-swipeout>
      </li>
    </ul>
    <div class="add-address-btn" @click="toAddAddress">
      新增收货地址
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addressList',
    data () {
      return {}
    },
    onShow () {
    },
    methods: {
      toAddAddress () {
        this.$router.push({
          path: '/pages/address/addressNew',
          query: {
            title: '新增收货地址'
          }
        })
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
            font-size: $fontL;
          }
        }
      }
    }
    .addressList-delete {
      height: 100%;
      color: #fff;
      background-image: linear-gradient(90deg, #F5500D 0%, #E1070C 100%);
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
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
