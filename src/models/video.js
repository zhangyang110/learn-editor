import { model } from 'models/common'
import { UsersApi, VideosApi, ProfileApi } from 'services'
import modelExtend from 'dva-model-extend'
import Video from '../services/tvapi/src/model/Video'
import Series from '../services/tvapi/src/model/Series'
import { message } from 'antd'

export default modelExtend(model, {
  namespace: 'video',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: '',
    selectedRowKeys: [],
    list: [],
    notFound: [],
    notFoundVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const payload = { opts: { limit: 50000000, offset: 0 } }
        if (location.pathname === '/video') {
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    * query({ payload = {} }, { call, put }) {
      const data = yield call([VideosApi, 'videosGet'], payload.opts)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          },
        })
      }
    },


    * update({ payload = {} }, { call, put }) {
      const body = Video.constructFromObject(payload.body, null)
      const data = yield call([VideosApi, 'videosIdPut'], payload.id, body)
      yield put({ type: 'hideModal' })
      yield put({ type: 'query' })
    },
    * putName({ payload = {} }, { call, put }) {
      const body = {
        'names': payload.names,
        'showNames': payload.showNames,
      }
      const res = yield call([VideosApi, 'videosUpdateShowNamesPost'], body)
      const data = res.data
      let notFound = []
      for (let i = 0; i < data.length; i++) {
        let cur = data[i]
        if (cur.id == 0) {
          notFound.push(payload.names[i])
        } else {
          continue
        }
      }

      if (notFound.length > 0) {
        yield put({ type: 'showNotFound', payload: { notFound } })
      } else {
        message.success('全部数据已经替换完成!')
      }
    },

  },
  reducers: {
    querySuccess(state, { payload }) {
      return {
        ...state,
        list: payload.list,
      }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    showModal(state, { payload }) {
      return { ...state, modalVisible: true, modalType: payload.modalType, currentItem: payload.item }
    },
    showNotFound(state, { payload }) {
      return { ...state, ...payload, notFoundVisible: true }

    },
    hideNotFoundModal(state, { payload }) {
      return { ...state, ...payload, notFoundVisible: false }

    },

  },
})



