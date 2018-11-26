import {model} from 'models/common'
import pathToRegexp from 'path-to-regexp'
import {PagesApi, TemplatesApi, ImagesApi, GamesApi, SeriesApi} from 'services'
import modelExtend from 'dva-model-extend'
import {routerRedux} from 'dva/router'
import Page from '../../services/tvapi/src/model/Page'
import {message} from 'antd'

export default modelExtend(model, {
  namespace: 'createPage',
  state: {
    modalVisible: false,
    searchModalVisible: false,
    imgData: [],
    searchType: '',
    bgImgUrl: '',
    coverImgUrl: '',
    activeCoverImgUrl: '',
    specialCoverImgUrl: '',
    searchTemp: [],
    currentTemMes: {},
    modalType: '',
    temIndex: '',
    cellIndex: '',
    initPageTemps: [],
    initPage: {},
    isCreate: true
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const match = pathToRegexp('/pages/createPage').exec(location.pathname);
        if (match != null && match[0].includes('/createPage')) {
          /*跳转到本页面后 就创建一个空的pageData数据*/
          const initPage = {
            name: "",
            version: 0,
            content: {
              name: "",
              background: "",
              sectionList: []
            },
            "type": "",
            "has_top": true
          };
          dispatch({type: 'public', payload: {initPage,isCreate:true}})
        }
      })
    }
  },

  effects: {
    * searchImg({payload = {}}, {call, put}) {
      const data = yield call([ImagesApi, 'imagesGet'], payload.tag, payload.opts);
      if (data.data !== null) {
        const imgData = data.data;
        yield put({type: 'searchImgSuccess', payload: imgData})
      }
    },
    * searchTem({payload = {}}, {call, put}) {
      const data = yield call([TemplatesApi, 'templatesGet'], payload);
      if (data.data !== null) {
        const searchTemp = data.data;
        yield put({type: 'searchTemSuccess', payload: searchTemp})
      }
    },
    * postPage({payload = {}}, {call, put}) {
      const body = Page.constructFromObject(payload, null);
      const res = yield call([PagesApi, 'pagesPost'], body);
      const resId = res.data.id;
      yield put({type: 'public', payload: {resId}})
      // yield put(routerRedux.push(`/pages`))
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
    * putPage({payload = {}}, {call, put,select}) {
      const body = Page.constructFromObject(payload, null);
      const id = yield select(state => state.createPage.resId);
      yield call([PagesApi, 'pagesIdContentPut'], id, body)
      message.success('保存成功!')
    },
    * post({payload = {}}, {call}) {
      const data = yield call([ImagesApi, 'imagesPost'], payload.file, payload.tag)
    },
    * goBack({payload = {}}, {call, put}) {
      yield put(routerRedux.goBack())
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
      console.log(routeName);
      yield put({type:'public',payload:{routeName}})
    }
  },
  reducers: {
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
    searchTemSuccess(state, {payload}) {
      return {...state, searchTemp: payload}
    },

    getJumpDataSuccess(state, {payload}) {
      return {...state, jumpData: payload.data, jumpType: payload.jumpType}
    },
    public(state, {payload}) {
      return {...state, ...payload}
    },
  },
})
