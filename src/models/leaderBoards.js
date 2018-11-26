import { model } from 'models/common'
import {LeaderBoardsApi, SeriesApi} from 'services'
import modelExtend from 'dva-model-extend'
import Leaderboard from '../services/tvapi/src/model/Leaderboard'



export default modelExtend(model, {
  namespace: 'leaderBoards',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    imgData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/leaderBoards') {
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
      console.log(LeaderBoardsApi);
      const data = yield call([LeaderBoardsApi, 'leaderboardsGet'],  payload.opts)
      

      console.log(data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            leaderBoardsData: data.data,
          },
        })
      }
    },

    * post({ payload = {} }, { call, put }) {
      try {
        
        console.log(payload);
        const data = yield call([LeaderBoardsApi, 'leaderboardsPost'], payload);
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
  const data = yield call([LeaderBoardsApi, 'leaderboardsIdPut'], payload.id , payload)
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
      // console.log(payload);
      const { leaderBoardsData } = payload;

      return {
        ...state,
        leaderBoardsData: leaderBoardsData,
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

  },

})
