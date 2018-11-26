import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/dashboard',
      component: () => import('./routes/dashboard/'),
    }, {
      path: '/setting',
      models: app,
      component: () => import('./routes/setting/'),
    }, {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    }, {
      path: '/image',
      models: () => [import('./models/image')],
      component: () => import('./routes/image/'),
    }, {
      path: '/series',
      models: () => [import('./models/series')],
      component: () => import('./routes/series/'),
    }, {
      path: '/games',
      models: () => [import('./models/games')],
      component: () => import('./routes/games/'),
    }, {
      path: '/releases',
      models: () => [import('./models/releases')],
      component: () => import('./routes/releases/'),
    }, {
      path: '/usermagement',
      models: () => [import('./models/user')],
      component: () => import('./routes/user/index'),
    },
    {
      path: '/pages',
      models: () => [import('./models/pages')],
      component: () => import('./routes/pages/index'),
    },

    {
      path: '/pages/createPage',
      models: () => [import('./models/previewPage/createPage')],
      component: () => import('./routes/pages/createPage/'),
    },
    {
      path: '/pages/previewPage/:id',
      models: () => [import('./models/previewPage/previewpage')],
      component: () => import('./routes/pages/previewPage/'),
    },
    {
      path: '/pages/updatePage/:id',
      models: () => [import('./models/previewPage/updatePage')],
      component: () => import('./routes/pages/updatePage/'),
    },

    {
      path: '/templates',
      models: () => [import('./models/templates/templates')],
      component: () => import('./routes/templates/'),
    }, {
      path: '/templates/:id',
      models: () => [import('./models/templates/create')],
      component: () => import('./routes/templates/create/'),
    }, {
      path: '/video',
      models: () => [import('./models/video')],
      component: () => import('./routes/video'),
    },{
      path: '/recommend',
      models: () => [import('./models/recommend')],
      component: () => import('./routes/recommend'),
    },{
      path: '/searchRecommend',
      models: () => [import('./models/searchRecommend')],
      component: () => import('./routes/searchRecommend'),
    },{
      path: '/subject',
      models: () => [import('./models/subject')],
      component: () => import('./routes/subject'),
    },{
      path: '/subject/subjectSeries/:id',
      models: () => [import('./models/subjectSeries')],
      component: () => import('./routes/subjectSeries'),
    },{
      path: '/freeSeries',
      models: () => [import('./models/freeSeries')],
      component: () => import('./routes/freeSeries'),
    },{
      path: '/leaderBoards',
      models: () => [import('./models/leaderBoards')],
      component: () => import('./routes/leaderBoards'),
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/dashboard"/>)}/>
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                     exact
                     path={path}
                     component={dynamic({
                       app,
                       ...dynamics,
                     })}
              />
            ))
          }
          <Route component={error}/>
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
