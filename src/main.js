import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from '@/App'
import store from '@/store'
import $ajax from './ajax'

Vue.use(MpvueRouterPatch)
Vue.prototype.$ajax = $ajax

Vue.config.productionTip = false

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
