import Fly from 'flyio/dist/npm/wx'

const fly = new Fly()
let _URL_
if (process.env.NODE_ENV === 'testing') {
  _URL_ = 'http://58.56.21.246:88'

// 开发
} else if (process.env.NODE_ENV === 'development') {
  // 开发
  _URL_ = 'http://58.56.21.246:88'

// 正式
} else if (process.env.NODE_ENV === 'production') {
  _URL_ = ''
}
const host = _URL_

let token = wx.getStorageSync('token')
console.log(process.env.NODE_ENV)
// 添加请求拦截器
fly.interceptors.request.use((request) => {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  console.log(request)
  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type']= 'application/json';
  request.headers = {
    'X-Tag': 'flyio',
    'content-type': 'application/json'
  }
  let authParams
  if (token) {
    authParams = {
      // 公共参数
      'categoryType': 'SaleGoodsType@sim',
      'streamNo': 'wxapp153570682909641893',
      'reqSource': 'MALL_H5',
      'appid': 'wxaae31db29df1f94d',
      'timestamp': new Date().getTime(),
      'sign': 'string',
      'authToken': token
    }
  } else {
    authParams = {
      // 公共参数
      'categoryType': 'SaleGoodsType@sim',
      'streamNo': 'wxapp153570682909641893',
      'reqSource': 'MALL_H5',
      'appid': 'wxaae31db29df1f94d',
      'timestamp': new Date().getTime(),
      'sign': 'string'
    }
  }

  request.body && Object.keys(request.body).forEach((val) => {
    if (request.body[val] === '') {
      delete request.body[val]
    }
  })
  request.body = {
    ...request.body,
    ...authParams
  }
  return request
})

// 添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading()
    return response.data// 请求成功之后将返回值返回
  },
  (err) => {
    // 请求出错，根据返回状态码判断出错原因
    console.log(err)
    wx.hideLoading()
    if (err) {
      return '请求失败'
    }
  }
)

fly.config.baseURL = host

export default fly
