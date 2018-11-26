import { model } from 'models/common'
import { TemplatesApi } from 'services'
import Template from '../../services/tvapi/src/model/Template'
import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'
import { notification } from 'antd';
import config from 'config'
const { prefix } = config


 
export default modelExtend(model, {
  namespace: 'templates',
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/templates') {
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
      const data = yield call([TemplatesApi, 'templatesGet'], payload.opts);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            templatesData: data.data,
          },
        })
      }
    },

    * publish({ payload = {} }, { call, put }) {
      try {
        const data = yield call([TemplatesApi, 'templatesIdPublishPut'], payload.id)
        console.log(data);
        if (data) {
          notification['success']({
            message: 'publish template a success.',
          });

        } else {
          notification['error']({
            message: 'publish template fail',
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

    * jump({ payload = {} }, { call, put }) {
      window.localStorage.setItem(`${prefix}templateCurrentPage`, payload.currentPage)
      yield put(routerRedux.push(`templates/${payload.id}`))
    },



  },
  reducers: {
    querySuccess(state, { payload }) {
      
      const { templatesData } = payload;
      return {
        ...state,
        templatesData,
        tabsKey: "templateList",
        cellList: null,
        modalVisible: false,
        editItem: null,
        imageLayerIndex: -1,
        name: null,
        currentPage: Number(window.localStorage.getItem(`${prefix}templateCurrentPage`) || 1),
      }
    },

    emptyMessage(state) {
      return { ...state }
    },

  },

})
