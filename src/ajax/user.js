import _fly from './config'

export default {
  // 登录 换token
  WxLogin (data, config) {
    return _fly.post(`WxxCx.WxxCxLogin`, data, config)
  },
  // 获取用户信息
  getUserInfo (data, config) {
    return _fly.post(`User.getUserInfo`, data, config)
  },
  // 收获地址列表
  addressList (data, config) {
    return _fly.post(`Mall.getRecAddressList`, data, config)
  }
}
