/* global window */
/* global document */
/* global location */
import {routerRedux} from 'dva/router'
import {parse} from 'qs'
import config from 'config'
import {EnumRoleType} from 'enums'
import {AuthApi, Login, ProfileApi, ApiClient} from 'services'
import queryString from 'query-string'

const {prefix} = config

const MENU_ITEMS = [
  {
    id: '1',
    name: '导航',
    icon: 'laptop',
    route: '/dashboard',
  },
  {
    id: '2',
    bpid: '1',
    name: '设置',
    icon: 'settings',
    route: '/setting',
  },
  {
    id: '3',
    bpid: '1',
    name: '用户管理',
    icon: 'usermanagement',
    route: '/usermagement',
  },


  {
    id: '4',
    bpid: '1',
    name: '页面管理',
    icon: 'page',
    route: '/pages',
  },
  {
    id: '4',
    bpid: '4',
    name: '页面预览',
    mpid: '-1',
    route: '/pages/previewPage/:id',
  },

  {
    id: '4',
    bpid: '4',
    name: '创建页面',
    mpid: '-1',
    route: '/pages/createPage',
  },
  {
    id: '4',
    bpid: '4',
    name: '更新页面',
    mpid: '-1',
    route: '/pages/updatePage/:id',
  },


  {
    id: '5',
    bpid: '1',
    name: '模板管理',
    icon: 'template',
    route: '/templates',
  },
  {
    id: '5',
    mpid: '-1',
    bpid: '5',
    name: '创建模板',
    route: '/templates/:id',
  },
  {
    id: '6',
    bpid: '1',
    name: '图片管理',
    icon: 'tupian',
    route: '/image',
  },
  {
    id: '7',
    bpid: '1',
    name: '剧集管理',
    icon: 'Movie',
    route: '/series',
  },
  {
    id: '8',
    bpid: '1',
    name: 'APP管理',
    icon: 'game',
    route: '/games',
  },
  {
    id: '9',
    bpid: '1',
    name: '客户端管理',
    icon: 'releaseproduct',
    route: '/releases',
  },
  {
    id: '10',
    bpid: '1',
    name: 'Video管理',
    icon: 'releaseproduct',
    route: '/video',
  },{
    id: '11',
    bpid: '1',
    name: '频道管理',
    icon: 'releaseproduct',
    route: '/recommend',
  },{
    id: '12',
    bpid: '1',
    name: '搜索推荐',
    icon: 'releaseproduct',
    route: '/searchRecommend',
  },{
    id: '13',
    bpid: '1',
    name: '专题管理',
    icon: 'releaseproduct',
    route: '/subject',
  },{
    id: '13',
    bpid: '13',
    name: '专题详情',
    mpid: '-1',
    route: '/subject/subjectSeries/:id',
  }
  // ,{
  //   id: '14',
  //   bpid: '1',
  //   name: '限时免费专区',
  //   icon: 'releaseproduct',
  //   route: '/freeSeries',
  // }
  ,{
    id: '15',
    bpid: '1',
    name: '排行榜专区',
    icon: 'releaseproduct',
    route: '/leaderBoards',
  },
]

export default {
  namespace: 'app',
  state: {
    user: {},
    permission: {
      visit: [],
    },
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
    ],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
    sidebarBgColor: 'black',
    sidebarBgImg: localStorage.getItem(`${prefix}sidebarBgImg`) ? localStorage.getItem(`${prefix}sidebarBgImg`) : '1',
    isShowSidebarBgImg: true,
  },
  subscriptions: {
    setupHistory({dispatch, history}) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },

    setup({dispatch}) {
      dispatch({type: 'query'})
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({type: 'changeNavbar'})
        }, 300)
      }
    },

  },
  effects: {
    * query({
              payload,
            }, {call, put, select}) {
      const {locationPathname} = yield select(_ => _.app)
      try {
        const {data: user} = yield call([ProfileApi, 'profileGet'], payload)
        let list = Object.assign([], MENU_ITEMS)
        const permission = JSON.parse(user.permission)
        let menu = list
        if (permission.role === EnumRoleType.ADMIN || permission.role === EnumRoleType.DEVELOPER) {
          permission.visit = list.map(item => item.id)
        } else if(permission.role === EnumRoleType.EDITOR||permission.role === EnumRoleType.GUEST){
          permission.visit= list.map(item =>{
            if(item.id!=3){
              return item.id
            }
          } )
          menu = list.filter((item) => {
            const cases = [
              permission.visit.includes(item.id),
              item.mpid ? permission.visit.includes(item.mpid) || item.mpid === '-1' : true,
              item.bpid ? permission.visit.includes(item.bpid) : true,
            ]
            return cases.every(_ => _)
          })
        } else {
          menu = list.filter((item) => {
            const cases = [
              permission.visit.includes(item.id),
              item.mpid ? permission.visit.includes(item.mpid) || item.mpid === '-1' : true,
              item.bpid ? permission.visit.includes(item.bpid) : true,
            ]
            return cases.every(_ => _)
          })

        }
        yield put({
          type: 'updateState',
          payload: {
            user,
            permission,
            menu,
          },
        })

        if (location.pathname === '/login') {
          yield put(routerRedux.push({
            pathname: '/dashboard',
          }))
        }
      } catch (e) {
        yield put(routerRedux.push({
          pathname: '/login',
          search: queryString.stringify({
            from: locationPathname,
          }),
        }))
      }
    },

    * logout({
               payload,
             }, {put}) {
      ApiClient.instance.authentications.Bearer.apiKey = undefined
      window.localStorage.removeItem(`${prefix}token`)

      yield put({type: 'query'})
    },

    * changeNavbar(action, {put, select}) {
      const {app} = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({type: 'handleNavbar', payload: isNavbar})
      }
    },

  },
  reducers: {
    updateState(state, {payload}) {
      // 1. 获取当前要打开页面的名称
      const pathname = payload.locationPathname;
      // 2. 如果不是模板页面  则设置列表默认值为第一页
      if (pathname && pathname.indexOf('templates') == -1) {
        window.localStorage.setItem(`${prefix}templateCurrentPage`, 1)
      }

      // 3. 如果不是编辑页面  则设置列表默认值为第一页
      // if (pathname && pathname.indexOf('pages') == -1) {
      //   window.localStorage.setItem(`${prefix}pagesCurrentPage`, 1)
      // }
      return {
        ...state,
        ...payload,
      }
    },

    switchSider(state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme(state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver(state) {

      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar(state, {payload}) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys(state, {payload: navOpenKeys}) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },

    switchSidebarBgImg(state, action) {
      localStorage.setItem(`${prefix}sidebarBgImg`, action.payload)
      return {...state, sidebarBgImg: action.payload}
    },

    switchSidebarBgColor(state, action) {
      localStorage.setItem(`${prefix}sidebarBgColor`, action.payload)
      return {...state, sidebarBgColor: action.payload}
    },

    switchIsShowSidebarBgImg(state) {
      return {
        ...state, isShowSidebarBgImg: !state.isShowSidebarBgImg
      }
    },
  },
}
