/* global window */
import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
import { Layout, Loader } from 'components'
import { classnames, config } from 'utils'
import { Helmet } from 'react-helmet'
import { withRouter } from 'dva/router'
import '../themes/index.less'
import './app.less'
import Error from './error'
import {BackTop,Icon} from 'antd'

const { prefix, openPages } = config;

const { Header, Bread, Footer, Sider, styles } = Layout;
let lastHref

const App = ({ children, dispatch, app, loading, location }) => {
  const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible,
    navOpenKeys, menu, permission, sidebarBgImg, isShowSidebarBgImg, sidebarBgColor } = app;
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const { iconFontJS, iconFontCSS, logo } = config;
  const current = menu.filter(item => pathToRegexp(item.route || '').exec(pathname));
  const hasPermission = current.length ? permission.visit.includes(current[0].id) : false;
  const href = window.location.href;

  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href
    }
  }

  const headerProps = {
    menu,
    user,
    location,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout() {
      dispatch({ type: 'app/logout' })
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys(openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  };

  const siderProps = {
    menu,
    location,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme() {
      dispatch({ type: 'app/switchTheme' })
    },
    changeOpenKeys(openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  };

  const breadProps = {
    menu,
    location,
  };
  const toTopProps={
    visibilityHeight:300,
    target:()=>document.getElementById('scroll'),
  };
  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      {children}
    </div>)
  }

  return (
    <div>
     {  href.includes('previewPage')|| href.includes('updatePage')? <BackTop {...toTopProps}/>:''}
      <Loader fullScreen spinning={loading.effects['app/query']} />
      <Helmet>
        <title>TV EDITOR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={logo} type="image/x-icon" />
        {iconFontJS && <script src={iconFontJS} />}
        {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
      </Helmet>
      <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
        {!isNavbar ?
          <aside className={classnames(styles.sider, styles[`siderbar-bg-${sidebarBgColor}`])}>
            {
              isShowSidebarBgImg
                ? <div className={styles['siderbar-bg-img']} style={{ backgroundImage: `url(${require(`../../assets/sidebar-${sidebarBgImg}.jpg`)})` }} />
                : ''
            }
            <Sider {...siderProps} />

          </aside> : ''}
        <div className={styles.main} id='scroll'>
          <Header {...headerProps} />
          <Bread {...breadProps} />
          <div className={styles.container}>
            <div className={styles.content}>
              {hasPermission ? children : <Error />}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  location: PropTypes.object,
  loading: PropTypes.object,
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
