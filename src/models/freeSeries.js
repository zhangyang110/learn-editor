import { model } from 'models/common'
import {FreeSeriesApi, SeriesApi} from 'services'
import modelExtend from 'dva-model-extend'
import FreeSeries from '../services/tvapi/src/model/FreeSeries'



export default modelExtend(model, {
  namespace: 'freeSeries',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    imgData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/freeSeries') {
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
      const data = yield call([FreeSeriesApi, 'freeSeriesGet'],  payload.opts)
      // const data = jsondata;
      console.log(data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            freeSeriesData: data.data,
          },
        })
      }
    },

    * post({ payload = {} }, { call, put }) {
      try {
        //const body = Recommend.constructFromObject(payload, null);
        console.log(payload);
        const data = yield call([FreeSeriesApi, 'freeSeriesPost'], payload);
        console.log(data);
        if (data) {
          yield put({
            type: 'query',
            payload: {
              opts: {
                limit: 50000,
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

  * update({ payload = {} }, { call, put }) {
      
  // const body = JSON.parse(payload.body,Series);
  //const body = Series.constructFromObject(payload.body,null);
  //console.log(body);
  const data = yield call([FreeSeriesApi, 'freeSeriesIdPut'], payload.id , payload)
  console.log(data);
  if (data) {
    yield put({
      type: 'query',
      payload: {
        opts: {
          limit: 50000,
          offset: 0,
        }
      },
    })
  }
},

* getJumpData({payload = {}}, {call, put}) {
  const data = yield call([SeriesApi, 'seriesGet'], payload.opts);
    if (data) {
      yield put({type: 'getJumpDataSuccess', payload: {data: data.data}})
    }
},


  },
  reducers: {
    querySuccess(state, { payload }) {
      console.log(payload);
      const { freeSeriesData } = payload;

      return {
        ...state,
        freeSeriesData,
        modalVisible: false,
        isLoading: false,
        error: null,
      }
    },

    getJumpDataSuccess(state, {payload}) {
      return {...state, jumpData: payload.data}
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
    public(state,{payload}){
      return {...state,...payload}
    },

    setInputVal(state, {payload}) {
      state.currentItem.series_id = payload.id;
      state.currentItem.name = payload.name;
      return {...state, jumpModalVisible: false,jumpData:[]}
    },

  },

})
