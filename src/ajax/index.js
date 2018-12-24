import _ from './config'
import common from './common'
import classify from './classify'
import shopping from './shopping'

export default Object.assign({}, _, {
  ...common,
  ...classify,
  ...shopping
})
