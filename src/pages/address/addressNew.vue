<template>
  <div class="addressNew">
    <form @submit="formSubmit" @reset="formReset">
      <div class="section">
        <div class="section__title">收货人</div>
        <input class="input" name="name" placeholder="姓名" placeholder-class="input" v-model="name"/>
      </div>
      <div class="section">
        <div class="section__title">联系方式</div>
        <input class="input" name="phone" placeholder="手机号码" placeholder-class="input" v-model="phone"/>
      </div>
      <div class="section" @click="openTree">
        <div class="section__title">所在地区</div>
        <input class="input" name="area" placeholder="选择所在地区" placeholder-class="input" v-model="area"
               disabled="disabled"/>
      </div>
      <div class="section detail-box">
        <div class="section__title">详细地址</div>
        <textarea class="textarea" name="detail" placeholder="详细地址需填写楼栋楼层或房间号信息" placeholder-class="detail"
                  v-model="detail"/>
      </div>
      <div class="btn-area">
        <button form-type="submit">Submit</button>
        <button form-type="reset">Reset</button>
      </div>
    </form>
    <i-action-sheet :visible="visible">
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
            <div v-for="(item,index) in cityData" style="line-height: 50px" :key="index">{{item.name}}日</div>
          </picker-view-column>
        </picker-view>
      </div>
    </i-action-sheet>
  </div>
</template>

<script>
  export default {
    name: 'addressNew',
    data () {
      return {
        visible: false,
        provinceData: [],
        cityData: [],
        provinceId: 1,
        provinceNum: 0,
        value: [1, 0],
        days: [],
        addressData: {
          name: '',
          phone: '',
          detail: '',
          area: ''
        }
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
      for (let i = 1; i <= 31; i++) {
        this.days.push(i)
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
        console.log(this.value)
        this.provinceId = this.provinceData[this.value[0]].id
        console.log(this.provinceData[this.value[0]].name)
        if (this.cityData.length > 0) {
          console.log(this.cityData)
          console.log(this.cityData[this.value[1]].name)
        }
        // console.log(e)
      },
      formSubmit (e) {
        console.log('form发生了submit事件，携带数据为：', e.mp.detail.value)
        this.addressData.name = e.mp.detail.value.name
        this.addressData.phone = e.mp.detail.value.phone
        this.addressData.detail = e.mp.detail.value.detail
      },
      formReset () {
        console.log('form发生了reset事件')
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
          }
        })
      }
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
    .section__title {
      text-align: left;
      width: rpx(100);
      font-size: $fontB;
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
