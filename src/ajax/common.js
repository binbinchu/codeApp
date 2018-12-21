import _fly from './config'

export default {
  // 首页数据热品推荐
  getHotGoods (data, config) {
    return _fly.post(`Goods.getRecommendGoods`, data, config)
  },
  // 获取省份
  getProvinceList (data, config) {
    return _fly.post(`Common.getProvinceList`, data, config)
  },
  // search
  loadSearch (data, config) {
    return _fly.post(`Goods.getSearchName`, data, config)
  },
  // 获取分类
  getGoodsClassify (data, config) {
    return _fly.post(`Goods.getClassify`, data, config)
  },
  // 获取全部pid!=0的分类
  getAllClassify (data, config) {
    return _fly.post(`getHomeClassify`, data, config)
  }
}
