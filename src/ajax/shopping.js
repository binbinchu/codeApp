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
  },
  // 购物车状态更新
  upDataTheCart (data, config) {
    return _fly.post(`ShoppingCar.updateGoodsCar`, data, config)
  },
  // 购物车删除
  deleteCarItem (data, config) {
    return _fly.post(`ShoppingCar.delGoodsCar`, data, config)
  },
  // 判断商品收藏状态
  isLikeApi (data, config) {
    return _fly.post(`Collection.judgeCollect`, data, config)
  },
  // 商品订单获取默认地址
  getDefaultAddress (data, config) {
    return _fly.post(`Mall.getDefAddress`, data, config)
  }
}
