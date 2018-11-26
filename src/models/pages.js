import {model} from 'models/common'
import {PagesApi, TemplatesApi, ImagesApi} from 'services'
import Page from '../services/tvapi/src/model/Page'
import modelExtend from 'dva-model-extend'
import {routerRedux} from 'dva/router'

export default modelExtend(model, {
  namespace: 'pages',
  state: {},
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/pages') {
          const payload = {
            opts: {
              limit: 5000,
              offset: 0,
            }
          };
          dispatch({
            type: 'query',
            payload,
          });
          let paginationNum;
          if(location.search){
            paginationNum= location.search.slice(1)
          }else {
            paginationNum=1;
          }
          dispatch({type: 'public', payload: {paginationNum: paginationNum}})
        }
      })
    },
  },
  effects: {
    * query({payload = {}}, {call, put}) {
      const data = yield call([PagesApi, 'pagesGet'], payload.opts);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            pagesData: data.data,
          },
        })
      }
    },
    * jump({payload = {}}, {call, put}) {
      if (payload.jumpType === 'createPage') {
        yield put(routerRedux.push(`pages/createPage`))
      } else if (payload.jumpType === 'previewPage') {
        yield put(routerRedux.push(`pages/previewPage/${payload.id}`))
      } else if (payload.jumpType === 'updatePage') {
        yield put(routerRedux.push(`pages/updatePage/${payload.id}`))
      } else if (payload.jumpType === 'setPagination') {
        console.log(routerRedux);
        yield put(routerRedux.replace(`pages?${payload.paginationNum}`))
        yield put({type: 'public', payload: {paginationNum: payload.paginationNum}})
      }
    },
  },
  reducers: {
    querySuccess(state, {payload}) {
      const {pagesData} = payload;
      return {
        ...state,
        pagesData,
        modalVisible: false,
        isLoading: false,
      }
    },
    showError(state, {payload, error}) {
      return {...state, ...payload, error: error, isLoading: false,}
    },
    public(state, {payload, error}) {
      return {...state, ...payload}
    }
  },

})


