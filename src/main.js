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
