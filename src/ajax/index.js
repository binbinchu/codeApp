import _ from './config'
import common from './common'
import classify from './classify'

export default Object.assign({}, _, {
  ...common,
  ...classify
})
