import { model } from 'models/common'
import {SubjectsApi, ImagesApi} from 'services'
import modelExtend from 'dva-model-extend'
import Subject from '../services/tvapi/src/model/Subject'
import {routerRedux} from 'dva/router'



export default modelExtend(model, {
  namespace: 'subject',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    imgData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/subject') {
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
      const data = yield call([SubjectsApi, 'subjectsGet'],  payload.opts)
      // const data = jsondata;
      console.log(data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            subjectsData: data.data,
          },
        })
      }
    },

    * postSubject({ payload = {} }, { call, put }) {
      try {
        //const body = Recommend.constructFromObject(payload, null);
        console.log(payload);
        const data = yield call([SubjectsApi, 'subjectsPost'], payload);
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
  const data = yield call([SubjectsApi, 'subjectsIdPut'], payload.id , payload)
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

* searchImg({payload = {}}, {call, put}) {
  const data = yield call([ImagesApi, 'imagesGet'], payload.tag, payload.opts);
  if (data.data != null) {
    const imgData = data.data;
    yield put({type: 'searchImgSuccess', payload: imgData})
  }
},

* jump({payload = {}}, {call, put}) {
  yield put(routerRedux.push(`subject/subjectSeries/${payload.id}?app=${payload.app}`))
},


  },
  reducers: {
    querySuccess(state, { payload }) {
      console.log(payload);
      const { subjectsData } = payload;

      return {
        ...state,
        subjectsData,
        modalVisible: false,
        isLoading: false,
        error: null,
      }
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
      if (payload.searchType === 'searchBackgroundImg') {
        state.currentItem.background_url = payload.backgroundUrl;
        return {...state, searchModalVisible: false,imgData: []}
      } 
    },

  },

})
