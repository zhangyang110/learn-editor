import {model} from 'models/common'
import {ImagesApi} from 'services'
import modelExtend from 'dva-model-extend'

export default modelExtend(model, {
  namespace: 'image',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isTag: false,
    // inputVal:'',
    pictureFile: null,
    flag: false,
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/image') {
          const payload = {tag: '可可'};
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },
  effects: {
    * query({payload = {}}, {call, put}) {
      const data = yield call([ImagesApi, 'imagesGet'], payload.tag, payload.opts);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          },
        })
      }
    },

    * post({payload = {}}, {call}) {
      const data = yield call([ImagesApi, 'imagesPost'], payload.file, payload.tag)
    },
    /*更新tag 接口调用 调用完刷新列表 列表为查询可可的数据*/
    * putTag({payload = {}}, {call, put}) {
      yield call([ImagesApi, 'imagesIdTagPut'], payload.id, payload.tag)
      yield put({type: 'hideModal'});

      const search = {tag: '可可'};
      const data = yield call([ImagesApi, 'imagesGet'], search.tag)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          },
        })
      }
    },
    /*更新图片 */
    * putPic({payload = {}}, {call, put}) {
      yield call([ImagesApi, 'imagesIdContentPut'], payload.id, payload.file)
      yield put({type: 'hideModal'})
      const search = {tag: '可可'};
      const data = yield call([ImagesApi, 'imagesGet'], search.tag)

      if (data) {
        const list = data.data;
        data.data.map(item => {
            if (item.id == payload.id) {
              item.url = item.url + '?'+ Date.parse( new Date())
            }
            return item
          }
        );
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          },
        })
      }
    }
  },
  reducers: {
    querySuccess(state, {payload}) {
      const {list} = payload;
      return {
        ...state,
        list,
      }
    },
    //显示或者隐藏对话框
    showModal(state, {payload}) {
      return {...state, currentItem: payload, modalVisible: true}
    },

    hideModal(state) {
      return {...state, modalVisible: false}
    },
    /*根据点击 的标签进行判断对话框显示为 picture 或者 tag */
    showTag(state) {
      return {...state, isTag: true}
    },
    showPicture(state) {
      return {...state, isTag: false}
    },
    // 在状态中设置
    setInput(state, {payload}) {
      return {...state, currentItem: {...state.currentItem, tag: payload}}
    },
    setPicture(state, {payload}) {
      // console.log(payload.pictureFile);
      return {...state, pictureFile: payload.pictureFile}
    },

    pictureFile(state){
      return {...state,pictureFile:null}
    }

  },


})
