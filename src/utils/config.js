const API = '/api/v3'

module.exports = {
  name: 'TV Editor',
  prefix: 'tvEditor',
  footerText: 'TV Editor  © 2017 BabelTime',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v3',
  resPrefix: '/res/v3/images',
  API,
  api: {
    userLogin: `${API}/login`,
    userLogout: `${API}/logout`,
    userInfo: `${API}/userInfo`,
    users: `${API}/users`,
    posts: `${API}/posts`,
    user: `${API}/user/:id`,
    dashboard: `${API}/dashboard`,
    menus: `${API}/menus`,
    weather: `${API}/weather`,
    v1test: `${API}/test`,
    v2test: `${API}/test`,
  },
}
