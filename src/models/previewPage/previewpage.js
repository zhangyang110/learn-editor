import {model} from 'models/common'
import pathToRegexp from 'path-to-regexp'
import {PagesApi, TemplatesApi, ImagesApi} from 'services'
// import Page from '../services/tvapi/src/model/Page'
import modelExtend from 'dva-model-extend'
import {routerRedux} from 'dva/router'

export default modelExtend(model, {
  namespace: 'previewPage',
  state: {
    currentPage: '',
    temps: [],
    modalVisible: false,
    modalType:'',

  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const match = pathToRegexp('/pages/previewPage/:id').exec(location.pathname);
        // console.log(match);
        if (match !== null) {
          const id = match[1];
          if (id !== null) {
            dispatch({type: 'query', payload: id});
          }
        }
      })
    }
  },

  effects: {
    * query({payload = {}}, {call, put, select}) {
      const data = yield call([PagesApi, 'pagesIdGet'], payload)
      if (data.data) {

        const currentPage = data.data;
        const sectionArray = currentPage.content.sectionList;
        const ids = [];
        /*得到该页面所有模板的id*/

        for (let i = 0; i < sectionArray.length; i++) {
          const curTid=sectionArray[i].tid;
          if(ids.indexOf(curTid)==-1){
            ids.push(curTid);
          }else{
            continue
          }
        }
        console.log(ids);

        /*state中得到temps数组 */

        const temps = yield select(state => {
          return state.previewPage.temps
        });

        /*获取对应的模板数据*/
        for (let i = 0; i < ids.length; i++) {
          const data = yield call([TemplatesApi, 'templatesIdGet'], ids[i]);
          if (data.data) {
            temps.push(data.data)
          } else {
            continue
          }
        }
        yield put({type: 'querySuccess', payload: {temps, currentPage}})
      }
    },
  },
  reducers: {
    querySuccess(state, {payload}) {
      return {...state, currentPage: payload.currentPage, temps: payload.temps}
    },
    updateCurrentPage(state, {payload}) {
      return {...state, currentPage: payload}
    },
    showModal(state, {payload}) {
      return {...state,modalVisible:true}
    }
  },


})
