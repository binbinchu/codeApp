import _fly from './config'

export default {
  // 获取省份
  getProvinceList (data, config) {
    return _fly.post(`Common.getProvinceList`, data, config)
  },
  // search
  loadSearch (data, config) {
    return _fly.post(`Goods.getSearchName`, data, config)
  }
}
