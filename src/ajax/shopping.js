import _fly from './config'

export default {
  // 商品详情
  getGoodsDetail (data, config) {
    return _fly.post(`Goods.getGoodsInfo`, data, config)
  },
  // 加入购物车
  addShoppingCart (data, config) {
    return _fly.post(`ShoppingCar.addGoodsToCar`, data, config)
  },
  // 购物车列表
  shoppingCartList (data, config) {
    return _fly.post(`ShoppingCar.getMyGoodsCar`, data, config)
  }
}
