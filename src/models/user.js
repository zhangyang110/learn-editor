import {model} from 'models/common'
import {UsersApi, ProfileApi} from 'services'
import modelExtend from 'dva-model-extend'
import User from '../services/tvapi/src/model/User'

export default modelExtend(model, {
  namespace: 'user',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: '',
    selectedRowKeys: [],
    list: [],
    // userRole: ''
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const payload = {opts: {limit: 50, offset: 0}}
        if (location.pathname === '/usermagement') {
          // dispatch({
          //   type: 'getPermission',
          // })
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    }
  },

  effects: {
    * getPermission({payload = {}}, {call, put}) {
      const data = yield call([ProfileApi, 'profileGet'], payload)
      yield put({
        type: 'setUserRole',
        payload: data.data,
      })
    },

    * query({payload = {}}, {call, put}) {
      const data = yield call([UsersApi, 'usersGet'], payload.opts)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          },
        })
      }
    },

    * create({payload = {}}, {call, put}) {
      // const body = User.constructFromObject(payload, null);
      try {
        const data = yield call([UsersApi, 'usersPost'], payload)
        console.log(data)
        yield put({type: 'hideModal'})
      } catch (e) {
        if (e.response.text.includes('用户名已存在')) {
          yield put({type: 'hideModal'})
          throw '用户名已存在!请重新创建！'
        }
      }
    },

    * updatePermission({payload = {}}, {call, put}){
      const data = yield call([UsersApi, 'usersIdPermissionPut'], payload.id,`{"role":"${payload.permission.role}"}`)
      yield put({type: 'hideModal'})
      yield put({type: 'query'})

    },

    * updateEnable({payload = {}}, {call, put}){
      const data = yield call([UsersApi, 'usersIdEnablePut'], payload.id,payload.enable)
      yield put({type: 'hideModal'})
      yield put({type: 'query'})


    }

  },
  reducers: {
    querySuccess(state, {payload}) {
      // const {list} = payload;
      return {
        ...state,
        list: payload.list,
      }
    },

    hideModal(state) {
      return {...state, modalVisible: false}
    },

    showModal(state, {payload}) {
      if (payload.modalType == 'updatePermission') {
        return {...state, modalVisible: true, currentItem: payload.item, modalType: payload.modalType}
      }
      else if (payload.modalType == 'updateEnable') {

        return {...state, modalVisible: true,currentItem: payload.item, modalType: payload.modalType}

      }
      else if (payload.modalType == 'create') {

        return {...state, modalVisible: true, modalType: payload.modalType}
      }
    },

    // setUserRole(state, {payload}) {
    //   console.log(payload.permission);
    //   if (payload.permission.includes('admin')) {
    //     return {...state, userRole: 'admin'}
    //   }
    //   else if (payload.permission.includes('editor')) {
    //     return {...state, userRole: 'editor'}
    //   }
    //   else {
    //     return {...state, userRole: 'guest'}
    //   }
    // }
  }
})


























