import { model } from 'models/common'
import {RecommendsApi,CategorysApi, SeriesApi, SubjectsApi,ImagesApi} from 'services'
import Recommend from '../services/tvapi/src/model/Recommend'
import modelExtend from 'dva-model-extend'



export default modelExtend(model, {
  namespace: 'recommend',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    imgData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/recommend') {
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
      const data = yield call([RecommendsApi, 'recommendsGet'],  payload.opts)
      // const data = jsondata;
      console.log(data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            recommendsData: data.data,
          },
        })
      }
    },

    * getJumpData({payload = {}}, {call, put}) {
    if (payload.jumpType === 'bySeries') {
      const data = yield call([SeriesApi, 'seriesGet'], payload.opts);
      if (data) {
        yield put({type: 'getJumpDataSuccess', payload: {data: data.data, jumpType: 'bySeries'}})
      }
    } else if (payload.jumpType === 'byCategory') {
      const data = yield call([CategorysApi, 'categorysGet'], payload.opts);
      if (data) {
        yield put({type: 'getJumpDataSuccess', payload: {data: data.data, jumpType: 'byCategory'}})
      }
    } else if (payload.jumpType === 'bySubject1') {
      const data = yield call([SubjectsApi, 'subjectsGet'], payload.opts);
      if (data) {
        yield put({type: 'getJumpDataSuccess', payload: {data: data.data, jumpType: 'bySubject1'}})
      }
    }else if (payload.jumpType === 'bySubject2') {
      const data = yield call([SubjectsApi, 'subjectsGet'], payload.opts);
      if (data) {
        yield put({type: 'getJumpDataSuccess', payload: {data: data.data, jumpType: 'bySubject2'}})
      }
    }else if (payload.jumpType === 'bySubject3') {
      const data = yield call([SubjectsApi, 'subjectsGet'], payload.opts);
      if (data) {
        yield put({type: 'getJumpDataSuccess', payload: {data: data.data, jumpType: 'bySubject3'}})
      }
    }else if (payload.jumpType === 'bySubject4') {
      const data = yield call([SubjectsApi, 'subjectsGet'], payload.opts);
      if (data) {
        yield put({type: 'getJumpDataSuccess', payload: {data: data.data, jumpType: 'bySubject4'}})
      }
    }
  },

    * searchImg({payload = {}}, {call, put}) {
    const data = yield call([ImagesApi, 'imagesGet'], payload.tag, payload.opts);
    if (data.data != null) {
      const imgData = data.data;
      yield put({type: 'searchImgSuccess', payload: imgData})
    }
  },

    * postRecommend({ payload = {} }, { call, put }) {
      try {
        //const body = Recommend.constructFromObject(payload, null);
        console.log(payload);
        const data = yield call([RecommendsApi, 'recommendsPost'], payload);
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

    * post({payload = {}}, {call}) {
    const data = yield call([ImagesApi, 'imagesPost'], payload.file, payload.tag)
  },

  * update({ payload = {} }, { call, put }) {
      
  // const body = JSON.parse(payload.body,Series);
  //const body = Series.constructFromObject(payload.body,null);
  //console.log(body);
  const data = yield call([RecommendsApi, 'recommendsIdPut'], payload.id , payload)
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


  },
  reducers: {
    querySuccess(state, { payload }) {
      console.log(payload);
      const { recommendsData } = payload;

      return {
        ...state,
        recommendsData,
        modalVisible: false,
        isLoading: false,
        error: null,
      }
    },

    getJumpDataSuccess(state, {payload}) {
      return {...state, jumpData: payload.data, jumpType: payload.jumpType}
    },

    searchImgSuccess(state, {payload}) {
      return {...state, imgData: payload}
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

    setUrl(state, {payload}) {
      if (payload.searchType === 'searchCoverImg') {
        state.currentItem.cover_url = payload.coverImgUrl;
        return {...state, coverImgUrl: payload.coverImgUrl, searchModalVisible: false, imgData: []}
      } 
    },

  },

})
