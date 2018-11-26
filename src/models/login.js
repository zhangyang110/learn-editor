import { routerRedux } from 'dva/router'
import config from 'config'
import { AuthApi, ApiClient } from 'services'
const { prefix } = config

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login({
      payload,
    }, { put, call, select }) {
      const data = yield call([AuthApi, 'authLoginPost'], payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.code === 200) {
        ApiClient.instance.authentications.Bearer.apiKey = `Bearer ${data.data}`
        window.localStorage.setItem(`${prefix}token`, data.data)

        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data
      }
    },
  },

}
