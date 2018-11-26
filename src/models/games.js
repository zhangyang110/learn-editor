import { model } from 'models/common'
import { GamesApi,ImagesApi } from 'services'
import Game from '../services/tvapi/src/model/Game'
import modelExtend from 'dva-model-extend'
import { notification } from 'antd';

export default modelExtend(model, {
  namespace: 'games',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/games') {
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
      const data = yield call([GamesApi, 'gamesGet'],  payload.opts)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            gamesData: data.data,
          },
        })
      }
    },

    * update({ payload = {} }, { call, put }) {

      const body = Game.constructFromObject(payload.body,null);
      console.log(body);
      try {
        const data = yield call([GamesApi, 'gamesIdPut'], payload.id , body)
        console.log(data);
        if (data) {
          notification['success']({
            message: 'update success.',
          });
        }else{
          notification['error']({
            message: 'update faild.',
          });
        }
      } catch (error) {
        notification['error']({
          message: error.message,
        });
      }
      yield put({
        type: 'query',
        payload: {
          opts: {
            limit: 50000,
            offset: 0,
          }
        },
      })
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


  },
  reducers: {
    querySuccess(state, { payload }) {
      console.log(payload);
      const { gamesData } = payload;
      const types = {
        searchClick: 'games/searchImage',
        imgClick: 'games/setCurrentItemImg',
        cancel: 'games/hideSearchModal',
        upload: 'games/postImg',
      };

      return {
        ...state,
        gamesData,
        currentItem: { },
        searchKeyWord: '',
        modalVisible: false,
        searchModalVisible: false,
        imageList: [ ],
        searchType: '',
        types: types,
      }
    },


    showModal (state, { payload }) {
      console.log(payload);
      return { ...state, ...payload, modalVisible: true }
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
     
      if (state.searchType === 'icon') {
        state.currentItem.icon = url;
      } else if (state.searchType === 'background') {
        state.currentItem.background = url;
      } else if (state.searchType === 'screenshot') {
        if (state.currentItem.screenshot == null || state.currentItem.screenshot === '') {
          state.currentItem.screenshot = url;
        } else {
          state.currentItem.screenshot = state.currentItem.screenshot + '|' + url;
        }
      }
      return { ...state, modalVisible: true, searchModalVisible: false }
    }

  },

})
