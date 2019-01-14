import _fly from './config'

export default {
  // 获取分类列表
  getClassifyList (data, config) {
    return _fly.post(`Goods.getClassify`, data, config)
  },
  // 根据分类获取商品列表
  getShopping (data, config) {
    return _fly.post(`Goods.getGoodsList`, data, config)
  },
  // 商品分类列表
  getGoodsList (data, config) {
    return _fly.post(`Goods.getGoodsList`, data, config)
  }
}
