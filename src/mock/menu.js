const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    name: 'Dashboard',
    icon: 'laptop',
    route: '/dashboard',
  },
  {
    id: '2',
    bpid: '1',
    name: 'Setting',
    icon: 'settings',
    route: '/setting',
  },
  {
    id: '3',
    bpid: '1',
    name: 'User',
    icon: 'usermanagement',
    route: '/usermagement',
  },
  {
    id: '4',
    bpid: '1',
    name: 'Page',
    icon: 'page',
    route: '/page',
  },
  {
    id: '5',
    bpid: '1',
    name: 'Template',
    icon: 'template',
    route: '/template',
  },
  {
    id: '6',
    bpid: '1',
    name: 'Picture',
    icon: 'tupian',
    route: '/picture',
  },
  {
    id: '7',
    bpid: '1',
    name: 'Series',
    icon: 'Movie',
    route: '/series',
  },
  {
    id: '8',
    bpid: '1',
    name: 'Game',
    icon: 'game',
    route: '/game',
  },
  {
    id: '9',
    bpid: '1',
    name: 'Release',
    icon: 'releaseproduct',
    route: '/release',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
