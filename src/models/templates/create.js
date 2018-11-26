import { model } from 'models/common'
import pathToRegexp from 'path-to-regexp'
import { TemplatesApi } from 'services'
import Template from '../../services/tvapi/src/model/Template'
import modelExtend from 'dva-model-extend'
import { notification } from 'antd';
import { routerRedux } from 'dva/router'


export default modelExtend(model, {

  state: {
    createTemplate: {},
  },

  namespace: 'createTemplate',
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/templates/:id').exec(pathname)
        if (match != null) {
          const id = match[1];
          if (id != -1) {
            dispatch({
              type: 'query',
              payload: { id: id }
            })
          } else {
            dispatch({
              type: 'create',
              id: id,
            })
          }
        }

      })
    },
  },

  effects: {
    * query({ payload = {} }, { call, put }) {
      console.log(payload);
      const data = yield call([TemplatesApi, 'templatesIdGet'], payload.id)
      console.log(data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            createTemplate: data.data,
          },
        })
      }
    },

    * created({ payload = {} }, { call, put }) {
      try {
        const body = Template.constructFromObject(payload, null);
        console.log(body);
        const data = yield call([TemplatesApi, 'templatesPost'], body)
        if (data) {
          notification['success']({
            message: 'created template a success.',
          });
          yield put({
            type: 'querySuccess',
            payload: {
              createTemplate: data.data,
            },
          })
          // yield put(routerRedux.push(`/templates`))
        } else {
          notification['error']({
            message: 'created template fail.',
          });
        }
        console.log(data);
      } catch (error) {

        notification['error']({
          message: error.message,
        });

      }

    },



    * update({ payload = {} }, { call, put }) {
      try {
        const body = Template.constructFromObject(payload, null);
        console.log(body);
        const data = yield call([TemplatesApi, 'templatesIdContentPut'], body.id, body)
        console.log(data);
        if (data) {
          notification['success']({
            message: 'update template a success.',
          });
          // yield put(routerRedux.push(`/templates`))
        } else {
          notification['error']({
            message: 'update template fail',
          });
        }
      } catch (error) {
        notification['error']({
          message: error.message,
        });

      }

    },

    * jump({ payload = {} }, { call, put }) {
      yield put(routerRedux.goBack());
    },


  },

  reducers: {
    querySuccess(state, { payload }) {
      console.log(payload);
      const { createTemplate } = payload;

      return {
        ...state,
        createTemplate,
        currentCell: undefined,
        name: createTemplate.name,
        selectKey: undefined,
      }
    },

    create(state, { id }) {
      const createTemplate = {
        id: id,
        name: undefined,
        status: 0,
        content: {
          cellList: undefined,
          w: 1680,
        }
      }
      console.log(createTemplate);
      return {
        ...state,
        createTemplate,
        currentCell: undefined,
        name: undefined,
      }
    },

    layerClick(state, { payload }) {

      const currentCell = payload.createTemplate.content.cellList[payload.cellIndex];
      payload.currentCell = currentCell;
      return { ...state, ...payload }
    },

    emptyMessage(state) {
      return { ...state }
    },

  
  },
})
