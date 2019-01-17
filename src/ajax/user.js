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
  // 我的收藏列表
  getCollectList (data, config) {
    return _fly.post('Collection.myCollect', data, config)
  },
  // 添加收货地址
  addAddress (data, config) {
    return _fly.post(`Mall.createRecAddress`, data, config)
  },
  // 收货地址列表
  addressList (data, config) {
    return _fly.post(`Mall.getRecAddressList`, data, config)
  },
  // 修改收货地址
  updataAddress (data, config) {
    return _fly.post(`Mall.updRecAddress`, data, config)
  },
  // 删除地址
  deleteAddress (data, config) {
    return _fly.post(`Mall.delRecAddress`, data, config)
  },
  // 设置默认地址
  setDefault (data, config) {
    return _fly.post(`Mall.setRecDefault`, data, config)
  }
}
