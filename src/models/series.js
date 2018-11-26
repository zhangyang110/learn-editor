import { model } from 'models/common'
import { SeriesApi, ImagesApi ,CategorysApi} from 'services'
import Series from '../services/tvapi/src/model/Series'
import modelExtend from 'dva-model-extend'
import { notification } from 'antd';


export default modelExtend(model, {
  namespace: 'series',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/series') {
          const payload = { 
            opts: {
              limit: 50000,
              offset: 0,
              query: "allSeries:1,IsCategoryName:1",
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
      const data = yield call([SeriesApi, 'seriesGet'],  payload.opts)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            seriesData: data.data,
          },
        })
      }
    },

    * update({ payload = {} }, { call, put }) {
      
      // const body = JSON.parse(payload.body,Series);
      const body = Series.constructFromObject(payload.body,null);
      console.log(body);
      const data = yield call([SeriesApi, 'seriesIdPut'], payload.id , body)
      console.log(data);
      if (data) {
        yield put({
          type: 'query',
          payload: {
            opts: {
              limit: 50000,
              offset: 0,
              query: "allSeries:1,IsCategoryName:1",
            }
          },
        })
      }
    },

    * searchImage({payload = {}}, {call, put}) {
      const data = yield call([ImagesApi, 'imagesGet'], payload.tag, payload.opts)
      if (data) {
        yield put({
          type: 'showSearchModal',
          payload: {
            imageList: data.data,
          },
        })
      }
    },

    * postImg({payload = {}}, {call}) {
      const data = yield call([ImagesApi, 'imagesPost'], payload.file, payload.tag)
      if (data) {
        notification['success']({
          message: 'upload success.',
        });
      }
    },

    * getJumpData({payload = {}}, {call, put}) {
    const data = yield call([CategorysApi, 'categorysGet'], payload.opts);
      if (data) {
        yield put({type: 'getJumpDataSuccess', payload: {data: data.data}})
      }
  },


  },
  reducers: {
    querySuccess(state, { payload }) {
      console.log(payload);
      const { seriesData } = payload;
      const types = {
        searchClick: 'series/searchImage',
        imgClick: 'series/setCurrentItemImg',
        cancel: 'series/hideSearchModal',
        upload: 'series/postImg',
      };
      
      return {
        ...state,
        seriesData,
        currentItem: { },
        searchKeyWord: '',
        modalVisible: false,
        searchModalVisible: false,
        searchType: '',
        imageList: [],
        types: types,
      }
    },

    public(state,{payload}){
      return {...state,...payload}
    },
    getJumpDataSuccess(state, {payload}) {
      return {...state, jumpData: payload.data}
    },

    showModal (state, { payload }) {
      console.log(payload);
      return { ...state, ...payload, modalVisible: true,searchModalVisible: false }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showSearchModal (state, { payload }) {
      return { ...state, ...payload , searchModalVisible: true }
    },

    hideSearchModal (state) {
      return { ...state, searchModalVisible: false }
    },


    setCurrentItemImg (state , { url }){
     
      if (state.searchType === 'cover') {
        state.currentItem.cover_url = url;
      } else if (state.searchType === 'background') {
        state.currentItem.background_url = url;
      }
      return { ...state, modalVisible: true,searchModalVisible: false }
    }


  },

})
