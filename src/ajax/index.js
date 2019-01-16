import _ from './config'
import common from './common'
import classify from './classify'
import shopping from './shopping'
import user from './user'

export default Object.assign({}, _, {
  ...common,
  ...classify,
  ...shopping,
  ...user
})
