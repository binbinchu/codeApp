<template>
  <div class="addressNew">
    <form @submit="formSubmit">
      <div class="section">
        <div class="section__title">收货人</div>
        <input class="input" name="name" placeholder="姓名" placeholder-class="input" v-model="addressData.name"/>
      </div>
      <div class="section">
        <div class="section__title">联系方式</div>
        <input class="input" name="tel" placeholder="手机号码" placeholder-class="input" maxlength="11"
               v-model="addressData.tel" type="number"/>
      </div>
      <div class="section" @click="openTree">
        <div class="section__title">所在地区</div>
        <input class="input" name="area" placeholder="选择所在地区" placeholder-class="input" v-model="addressData.area"
               disabled="disabled"/>
      </div>
      <div class="section detail-box">
        <div class="section__title">详细地址</div>
        <textarea class="textarea" name="address" placeholder="详细地址需填写楼栋楼层或房间号信息" placeholder-class="detail"
                  v-model="addressData.address"/>
      </div>
      <div class="section section_gap">
        <div class="section__title">默认地址</div>
        <switch name="default" :checked="isDefault"/>
      </div>
      <div class="section section_btn btn-area">
        <button form-type="submit">确认</button>
      </div>
    </form>
    <i-action-sheet :visible="visible" @click.stop="addArea(1)">
      <div slot="header">
        <picker-view
          indicator-style="height: 50px;"
          style="width: 100%; height: 300px;"
          :value="value"
          @change="bindChange">
          <picker-view-column v-if="provinceData.length>0">
            <div v-for="(item,index) in provinceData" style="line-height: 50px" :key="index">{{item.name}}</div>
          </picker-view-column>
          <picker-view-column v-if="cityData.length>0">
            <div v-for="(item,index) in cityData" style="line-height: 50px" :key="index">{{item.name}}</div>
          </picker-view-column>
        </picker-view>
        <div class="btn-group">
          <div class="picker-btn sure" @click="addArea(1)">取消</div>
          <div class="picker-btn cancel" @click="addArea(2)">确定</div>
        </div>
      </div>
    </i-action-sheet>
    <i-toast id="toast"/>
    <i-message id="message"/>
  </div>
</template>

<script>
  export default {
    name: 'addressNew',
    data () {
      return {
        timer: null,
        visible: false,
        provinceData: [],
        cityData: [],
        provinceId: 1,
        value: [1, 0],
        days: [],
        province: '',
        city: '',
        addressData: {
          name: '',
          tel: '',
          area: '',
          address: '',
          default: ''
        },
        isDefault: false
      }
    },
    onShow () {
      wx.setNavigationBarTitle({
        title: this.$route.query.title
      })
      if (!wx.getStorageSync('province')) {
        this.getProvinceList()
      } else {
        this.provinceData = JSON.parse(wx.getStorageSync('province'))
      }
      if (this.$route.query.addressData) {
        this.addressData = JSON.parse(this.$route.query.addressData)
        // this.addressData.default = this.addressData.default === '02' ? true : false
        if (this.addressData.default === '02') {
          this.isDefault = true
        } else if (this.addressData.default === '01') {
          this.isDefault = false
        }
      } else {
        this.addressData = { name: '', tel: '', area: '', address: '', default: '' }
      }
    },
    watch: {
      'provinceId' (val) {
        this.getCityList(val)
      }
    },
    methods: {
      openTree () {
        this.visible = true
      },
      bindChange (e) {
        const val = e.mp.detail.value
        this.value = [val[0], val[1] || 0]
        this.provinceId = this.provinceData[this.value[0]].id
        this.province = this.provinceData[this.value[0]].name
        // console.log(e)
      },
      formSubmit (e) {
        this.addressData.name = e.mp.detail.value.name
        this.addressData.tel = e.mp.detail.value.tel
        this.addressData.address = e.mp.detail.value.address
        this.addressData.area = e.mp.detail.value.area
        this.addressData.default = e.mp.detail.value.default ? '02' : '01'
        if (!e.mp.detail.value.name) return this.toast('请填写收货人姓名')
        if (!e.mp.detail.value.tel) return this.toast('请填写收货人联系方式')
        if (!e.mp.detail.value.address) return this.toast('请填写收货详细地址')
        if (!e.mp.detail.value.area) return this.toast('请填写收货地址')
        if (this.$route.query.id) {
          this.addressData = Object.assign({}, this.addressData, {
            id: this.$route.query.id
          })
          this.updataAddress()
        } else {
          this.addAddress()
        }
      },
      addAddress () {
        const obj = { ...this.addressData }
        this.$ajax.addAddress(obj).then((res) => {
          if (res.code === 0) {
            this.message('添加成功', 'success')
            this.timer = setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 500)
          }
        })
      },
      updataAddress () {
        const obj = { ...this.addressData }
        this.$ajax.updataAddress(obj).then((res) => {
          if (res.code === 0) {
            this.message('修改成功', 'success')
            this.timer = setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 500)
          }
        })
      },
      getProvinceList () {
        this.$ajax.getProvinceList().then((res) => {
          if (res.code === 0) {
            this.provinceData = res.data
            wx.setStorageSync('province', JSON.stringify(res.data))
          }
        })
      },
      getCityList (id) {
        const obj = {
          provinceId: id
        }
        this.$ajax.getCityList(obj).then((res) => {
          if (res.code === 0) {
            this.cityData = res.data
            if (this.cityData.length > 0) {
              // console.log(this.cityData)
              // console.log(this.cityData[this.value[1]].name)
              this.city = this.cityData[this.value[1]].name
            } else {
              this.city = ''
            }
          }
        })
      },
      addArea (type) {
        this.visible = false
        if (type === 1) {
          this.addressData.address = this.addressData.address
        } else if (type === 2) {
          this.addressData.area = ''
          if (this.province) {
            this.addressData.area = this.province + this.city
          } else {
            this.addressData.area = '北京市'
          }
        }
      }
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    }
  }
</script>
<style lang="scss">
  @import "../../_sass/reset";

  .detail, .input {
    font-size: $fontB;
    padding-top: rpx(1);
  }
</style>
<style scoped lang="scss">
  @import "../../_sass/reset";

  .addressNew {
    width: 100%;
    height: 100%;
  }

  .btn-group {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    border-top: rpx(1) solid $color-theme-bg;
    .picker-btn {
      flex: 1;
      text-align: center;
      height: rpx(56);
      line-height: rpx(56);
      &.cancel {
        border-right: rpx(1) solid $color-theme-bg;
      }
    }
  }

  .section {
    padding: rpx(15) rpx(30);
    margin: 0;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: left;
    background: $colorM;
    border-bottom: rpx(1) solid $color-theme-bg;
    &.detail-box {
      align-items: flex-start;
      align-center: flex-start;
    }
    &.section_gap {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: space-between;
    }
    &.section_btn {
      padding: 0;
      margin: rpx(30) rpx(15);
      button {
        width: 100%;
        border: none;
        font-size: $fontB;
        background: $colorV;
        color: $colorM;
      }
    }
    .section__title {
      text-align: left;
      width: rpx(100);
      font-size: $fontB;
      color: $colorT;
    }
    .input {
      font-size: $fontB;
      flex: 1;
      padding-left: rpx(15);
    }
    .textarea {
      min-height: rpx(100);
      max-height: rpx(125);
      font-size: $fontB;
      padding-top: rpx(5);
      padding-left: rpx(15);
    }
  }
</style>
