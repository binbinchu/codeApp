import _fly from './config'

export default {
  // 商品详情
  getGoodsDetail (data, config) {
    return _fly.post(`Goods.getGoodsInfo`, data, config)
  }
}
