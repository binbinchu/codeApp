import _fly from './config'

export default {
  // search
  loadSearch (data, config) {
    return _fly.post(`Goods.getSearchName`, data, config)
  },
  // 首页轮播
  getBannerTop (data, config) {
    return _fly.post(`Widget.getWidgetBanner`, data, config)
  },
  // 首页数据热品推荐
  getHotGoods (data, config) {
    return _fly.post(`Goods.getRecommendGoods`, data, config)
  },
  // 首页menu-tags
  getMenuTags (data, config) {
    return _fly.post(`getHomeClassify`, data, config)
  },
  // 获取省份
  getProvinceList (data, config) {
    return _fly.post(`Common.getProvinceList`, data, config)
  },
  // 获取城市
  getCityList (data, config) {
    return _fly.post(`Common.getCityList`, data, config)
  },
  // 获取分类
  getGoodsClassify (data, config) {
    return _fly.post(`Goods.getClassify`, data, config)
  },
  // 获取全部pid!=0的分类
  getAllClassify (data, config) {
    return _fly.post(`getHomeClassify`, data, config)
  },
  // 收藏
  likeThis (data, config) {
    return _fly.post(`Collection.collectionData`, data, config)
  },
  // 取消收藏
  noLikeThis (data, config) {
    return _fly.post(`Collection.cancelCollect`, data, config)
  }
}
