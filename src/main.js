import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from '@/App'
import store from '@/store'
import $ajax from './ajax'
import _ from 'lodash'

Vue.use(MpvueRouterPatch)
Vue.prototype.$ajax = $ajax
Vue.prototype._ = _
Vue.config.productionTip = false

Vue.mixin({
  data () {
    return {}
  },
  methods: {
    WxToLogin (data) {
      let that = this
      wx.login({
        success (res) {
          console.log(res.code)
          wx.checkSession({
            success () {
              const obj = {
                code: res.code,
                // code: '081sMK240CLaHK1ybo140gso240sMK2Y',
                iv: data.iv,
                encryptedData: data.encryptedData,
                recommendId: ''
              }
              that.$ajax.WxLogin(obj).then((res) => {
                if (res.code === 0) {
                  let createTime = new Date()
                  wx.setStorageSync('createdTime', createTime)
                  wx.setStorageSync('token', res.data)
                }
              })
            },
            fail () {
              wx.login({
                success (res) {
                  if (res.code) {
                    wx.setStorageSync('code', res.code)
                  }
                }
              })
            }
          })
        }
      })
    },
    isTokenTimeOut () {
      let createTime = wx.getStorageSync('createdTime')
      let newTime = new Date()
      if (newTime - createTime > 30 * 24 * 3600 * 3600) {
        // 过期
        return true
      } else {
        // 没过期
        return false
      }
    }
  }
})
const app = new Vue({
  mpType: 'app',
  store,
  ...App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [],
    window: {
      'navigationBarTitleText': '标题',
      'navigationBarTextStyle': 'white',
      'navigationBarBackgroundColor': '#ec5045',
      'onReachBottomDistance': 0,
      'backgroundTextStyle': 'light'
    }
  }
}
