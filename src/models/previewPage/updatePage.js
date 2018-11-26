import {model} from 'models/common'
import pathToRegexp from 'path-to-regexp'
import {PagesApi, TemplatesApi, ImagesApi, SeriesApi, GamesApi} from 'services'
import modelExtend from 'dva-model-extend'
import {routerRedux} from 'dva/router'
import Page from '../../services/tvapi/src/model/Page'
import {message} from 'antd'

export default modelExtend(model, {
  namespace: 'updatePage',

  state: {
    temps: [],
    searchTemp: [],
    currentPage: {},
    modalType: '',
    modalVisible: false,
    editTemp: {},
    currentTemMes: {},
    searchModalVisible: false,
    imgData: [],
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const match = pathToRegexp('/pages/updatePage/:id').exec(location.pathname);
        if (match !== null) {
          const id = match[1];
          if (id !== null) {
            dispatch({type: 'queryPage', payload: id});
          }
        }
      })
    }
  },
  effects: {
    * queryPage({payload = {}}, {call, put, select}) {
      const data = yield call([PagesApi, 'pagesIdGet'], payload)
      if (data.data) {
        const currentPage = data.data;
        console.log(currentPage);
        const sectionArray = currentPage.content.sectionList;
        const ids = [];
        /*得到该页面所有模板的id*/
        for (let i = 0; i < sectionArray.length; i++) {
          const curTid = sectionArray[i].tid;
          if (ids.indexOf(curTid) == -1) {
            ids.push(curTid);
          } else {
            continue
          }
        }
        /*state中得到temps数组 */
        const temps = yield select(state => {
          return state.updatePage.temps
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
        console.log(currentPage);
        yield put({type: 'querySuccess', payload: {temps, currentPage}})
      }
    },
    * searchTem({payload = {}}, {call, put}) {
      const data = yield call([TemplatesApi, 'templatesGet'], payload);
      if (data.data != null) {
        const searchTemp = data.data;
        yield put({type: 'searchTemSuccess', payload: searchTemp})
      }
    },
    * searchImg({payload = {}}, {call, put}) {
      const data = yield call([ImagesApi, 'imagesGet'], payload.tag, payload.opts);
      if (data.data != null) {
        const imgData = data.data;
        yield put({type: 'searchImgSuccess', payload: imgData})
      }
    },
    * putPage({payload = {}}, {call, put}) {
      const body = Page.constructFromObject(payload, null);
      const match = pathToRegexp('/pages/updatePage/:id').exec(location.pathname);
      const id = match[1];
      const data=yield call([PagesApi, 'pagesIdContentPut'], id, body)
      console.log(data);
      if(data.code=='200'){
        console.log(data);
        message.success('保存成功!')
      }
    },
    * goBack({payload = {}}, {call, put}) {
      yield put(routerRedux.goBack())
    },
    * getJumpData({payload = {}}, {call, put}) {

      if (payload.jumpType === 'bySeries') {
        const data = yield call([SeriesApi, 'seriesGet'], payload.opts);
        if (data) {
          yield put({type: 'getJumpDataSuccess', payload: {data: data.data, jumpType: 'bySeries'}})
        }
      } else if (payload.jumpType === 'byPage') {
        const data = yield call([PagesApi, 'pagesGet'], payload.opts);
        if (data) {
          yield put({type: 'getJumpDataSuccess', payload: {data: data.data, jumpType: 'byPage'}})
        }
      } else if (payload.jumpType === 'byApp') {
        const data = yield call([GamesApi, 'gamesGet'], payload.opts);
        if (data) {
          yield put({type: 'getJumpDataSuccess', payload: {data: data.data, jumpType: 'byApp'}})
        }
      }
    },
    * post({payload = {}}, {call}) {
      const data = yield call([ImagesApi, 'imagesPost'], payload.file, payload.tag)
    },
    * searchName({payload = {}}, {call,put}) {
      let data,routeName;
      let pre=payload.pre;
      if (pre.includes('剧集')) {
        data = yield call([SeriesApi,'seriesIdGet'],payload.cellId)
      } else if (pre.includes('页面')) {
        data = yield call([PagesApi,'pagesIdGet'],payload.cellId)
      } else if (pre.includes('App')) {
        data = yield call([GamesApi,'gamesIdGet'],payload.cellId)
      }
      routeName=`${pre}名称为${data.data.name}`;
      yield put({type:'public',payload:{routeName}})
    }
  },

  reducers: {
    querySuccess(state, {payload}) {
      return {...state, currentPage: payload.currentPage, temps: payload.temps}
    },
    searchTemSuccess(state, {payload}) {
      return {...state, searchTemp: payload}
    },
    searchImgSuccess(state, {payload}) {
      return {...state, imgData: payload}
    },

    setUrl(state, {payload}) {
      if (payload.searchType === 'searchBgImg') {
        return {...state, bgImgUrl: payload.bgImgUrl, searchModalVisible: false, imgData: []}
      } else if (payload.searchType === 'searchCoverImg') {
        return {...state, coverImgUrl: payload.coverImgUrl, searchModalVisible: false, imgData: []}
      } else if (payload.searchType === 'searchActiveCoverImg') {
        return {...state, activeCoverImgUrl: payload.activeCoverImgUrl, searchModalVisible: false, imgData: []}
      } else if (payload.searchType === 'searchSpecialCoverImg') {
        return {...state, specialCoverImgUrl: payload.specialCoverImgUrl, searchModalVisible: false, imgData: []}
      }
    },
    queryTempsSuccess(state, {payload}) {
      return {...state, ...payload}
    },
    getJumpDataSuccess(state, {payload}) {
      return {...state, jumpData: payload.data, jumpType: payload.jumpType}
    },

    public(state,{payload}){
      return {...state,...payload}
    },
    // setCurrentTemMes(state, {payload}) {
    //   return {...state, currentTemMes: payload}
    // },
    // updateCurrentPage(state, {payload}) {
    //   state.modalVisible = false;
    //   return {...state, currentPage: payload}
    // },
    // showModal(state, {payload}) {
    //   if (payload.modalType === 'editCurrentTem') {
    //     return {
    //       ...state,
    //       // modalType: 'editCurrentTem',
    //       // modalVisible: true,
    //       // editTemp: payload.editTemp,
    //       // tempIndex: payload.tempIndex
    //     }
    //   } else if (payload.modalType === 'editCell') {
    //     return {
    //       ...state,
    //       ...payload,
    //     }
    //   }
    //
    // },
    // hideModal(state, {payload}) {
    //   return {...state, modalVisible: false,}
    // },

    // showSearchImgModal(state, {payload}) {
    //   return {...state, searchModalVisible: true, searchType: payload.searchType}
    // },
    // hideSearchModal(state, {payload}) {
    //   return {...state, searchModalVisible: false, imgData: [],}
    // },

    // clearImgUrl(state, {payload}) {
    //   return {...state, coverImgUrl: '', activeCoverImgUrl: '', specialCoverImgUrl: ''}
    // },

    // dropUpdate(state, {payload}) {
    //   return {...state, ...payload}
    // },
    // showJumpModal(state, {payload}) {
    //   return {...state, ...payload}
    // },
    // hideJumpModal(state, {payload}) {
    //   return {...state, ...payload}
    // },

    // setJump(state, {payload}) {
    //   return {...state, jumpUrl: payload, jumpModalVisible: false}
    // },
    // setTemPage(state, {payload}) {
    //   return {...state, temPage: payload}
    // },
    // clearActiveCoverImg(state, {payload}) {
    //   return {...state, specialCoverImgUrl: '', currentPage: payload}
    // },
  },
})
