import { model } from 'models/common'
import { ReleasesApi } from 'services'
import Release from '../services/tvapi/src/model/Release'
import modelExtend from 'dva-model-extend'



export default modelExtend(model, {
  namespace: 'releases',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/releases') {
          const payload = {
            opts: {
              limit: 50000,
              offset: 0,
            }
          }
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
      console.log(payload);
      const data = yield call([ReleasesApi, 'releasesGet'],  payload.opts)
      // const data = jsondata;
      console.log(data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            releasesData: data.data,
          },
        })
      }
    },

    * uploads({ payload = {} }, { call, put }) {
      console.log(payload);

      try {
        const data = yield call([ReleasesApi, 'releasesPost'], payload.name , payload.file , payload.versionCode ,
        payload.versionName ,payload.channel, payload.changeLog , payload.force ,payload.md5  );
        console.log(data);
        if (data) {
          yield put({
            type: 'query',
            payload: {
              opts: {
                limit: 50,
                offset: 0,
              }
            },
          })
        }
      } catch (error) {
        yield put({
          type: 'showError',
          error: error.message,
        })

      }
    },

    * download({ payload = {} }, { call, put }) {
      console.log(payload);
      const data = yield call([ReleasesApi, 'releasesGet'],  payload.opts)
      // const data = jsondata;
      console.log(data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            releasesData: data.data,
          },
        })
      }
    },


  },
  reducers: {
    querySuccess(state, { payload }) {
      console.log(payload);
      const { releasesData } = payload;

      return {
        ...state,
        releasesData,
        modalVisible: false,
        isLoading: false,
        error: null,
      }
    },


    showModal (state, { payload }) {
      console.log(payload);
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showError (state, { payload , error}) {
      console.log(payload);
      return { ...state, ...payload, error: error , isLoading: false,}
    },




  },

})
