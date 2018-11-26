import { model } from 'models/common'

import modelExtend from 'dva-model-extend'

export default modelExtend(model, {
  namespace: 'dashboard',
})
