import { model } from 'models/common'
import {SubjectSeriesApi, SeriesApi,ImagesApi} from 'services'
import modelExtend from 'dva-model-extend'
import SubjectSeries from '../services/tvapi/src/model/SubjectSeries'
import pathToRegexp from 'path-to-regexp'


var app
export default modelExtend(model, {
  namespace: 'subjectSeries',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    imgData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/subject/subjectSeries/:id').exec(location.pathname);
        const match1 = pathToRegexp('?app=:app').exec(location.search);
        if (match1 !== null) {
          const appTemp = match1[1];
          if (appTemp !== null) {
            app=appTemp
          }
        }
        //console.log(app);
        // console.log(match1);
        // console.log(match);
        if (match !== null) {
          const id = match[1];
          if (id !== null) {
            const payload = {
              opts: {
                limit: 50000,
                offset: 0,
                model:'accurate'
              }
            }
            dispatch({type: 'query', payload,});
          }
        }
      })
    },
  },

  effects: {
    * query({ payload = {} }, { call, put }) {
      const match = pathToRegexp('/subject/subjectSeries/:id').exec(location.pathname);
      //console.log(match);
      if (match !== null) {
        const id = match[1];
        if (id !== null) {
          payload.opts.query=(payload.opts.query!=undefined?payload.opts.query+',subject_id:'+id:'subject_id:'+id);
        }
      }
      console.log(payload);
      const data = yield call([SubjectSeriesApi, 'subjectSeriesGet'],  payload.opts)
      // const data = jsondata;
      console.log(data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            subjectSeriesData: data.data,
          },
        })
      }
    },

    * postSubjectSeries({ payload = {} }, { call, put }) {
      try {
        //const body = Recommend.constructFromObject(payload, null);
        const match = pathToRegexp('/subject/subjectSeries/:id').exec(location.pathname);
        //console.log(match);
        if (match !== null) {
          const id = match[1];
          if (id !== null) {
            payload.subject_id=parseInt(id);
          }
        }
        console.log(payload);
        const data = yield call([SubjectSeriesApi, 'subjectSeriesPost'], payload);
        console.log(data);
        if (data) {
          yield put({
            type: 'query',
            payload: {
              opts: {
                limit: 50000,
                offset: 0,
                model:'accurate',
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
  const match = pathToRegexp('/subject/subjectSeries/:id').exec(location.pathname);
    //console.log(match);
    if (match !== null) {
      const id = match[1];
      if (id !== null) {
        payload.subject_id=parseInt(id);
      }
  }
  const data = yield call([SubjectSeriesApi, 'subjectSeriesIdPut'], payload.id , payload)
  console.log(data);
  if (data) {
    yield put({
      type: 'query',
      payload: {
        opts: {
          limit: 50000,
          offset: 0,
          model:'accurate',
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

* getJumpData({payload = {}}, {call, put}) {
  if (app != undefined) {
    payload.opts.query=payload.opts.query+",channel:"+app
  }
  const data = yield call([SeriesApi, 'seriesGet'], payload.opts);
    if (data) {
      yield put({type: 'getJumpDataSuccess', payload: {data: data.data}})
    }
},


  },
  reducers: {
    querySuccess(state, { payload }) {
      console.log(payload);
      const { subjectSeriesData } = payload;

      return {
        ...state,
        subjectSeriesData,
        modalVisible: false,
        isLoading: false,
        error: null,
      }
    },
    searchImgSuccess(state, {payload}) {
      return {...state, imgData: payload}
    },

    getJumpDataSuccess(state, {payload}) {
      return {...state, jumpData: payload.data}
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
      }else if (payload.searchType === 'searchCoverImg') {
        state.currentItem.cover_url = payload.coverUrl;
        return {...state, searchModalVisible: false,imgData: []}
      } 
    },

    setInputVal(state, {payload}) {
      state.currentItem.series_id = payload.id;
      state.currentItem.name = payload.name;
      state.currentItem.cover_url = payload.cover_url;
      return {...state, jumpModalVisible: false,jumpData:[]}
    },

  },

})
