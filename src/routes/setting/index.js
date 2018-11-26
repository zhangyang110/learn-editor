import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Input, Icon, Form, Radio, Switch, Tag, Button, Modal, Row, Col, } from 'antd'
import moment from 'moment';
import { routerRedux } from 'dva/router'
import classnames from 'classnames'
import { config } from 'utils'
import { Page, ImageSearch, DropOption } from 'components'



import styles from './index.less'



class Setting extends React.Component {


  handleSettingColor = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/switchSidebarBgColor',
      payload: value
    })
  }

  handleSettingImg = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/switchSidebarBgImg',
      payload: value
    })
  }

  handleSettingImgIsClose = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'app/switchIsShowSidebarBgImg' })
  }




  render() {

    const { dispatch, app } = this.props;
    const { sidebarBgColor, isShowSidebarBgImg, sidebarBgImg } = app;

    const img1 = require('../../../assets/sidebar-1.jpg')
    const img2 = require('../../../assets/sidebar-2.jpg')
    const img3 = require('../../../assets/sidebar-3.jpg')
    const img4 = require('../../../assets/sidebar-4.jpg')

    function btnClick() {
      console.log('aaaaaa');
      dispatch({ type: 'app/switchTheme' })
    }

    return (
      // <Page inner>
      <div className={styles.container}>
        <Row>
          <Col span={24}>
            <h2>侧边栏背景颜色</h2>
            <Tag color='#d80b0b' className={classnames(styles.tags, { [styles.tagActive]: sidebarBgColor === 'red' || false })} onClick={() => this.handleSettingColor('red')} />
            <Tag color='#000' className={classnames(styles.tags, { [styles.tagActive]: sidebarBgColor === 'black' || false })} onClick={() => this.handleSettingColor('black')} />
            <Tag color='#ff9800' className={classnames(styles.tags, { [styles.tagActive]: sidebarBgColor === 'yellow' || false })} onClick={() => this.handleSettingColor('yellow')} />
            <Tag color='#1e90ff' className={classnames(styles.tags, { [styles.tagActive]: sidebarBgColor === 'blue' || false })} onClick={() => this.handleSettingColor('blue')} />
          </Col>
          <Col span={32}>
            <h2 style={{ marginBottom: 15, }} >侧边栏背景图</h2>
            <Switch checkedChildren='ON' unCheckedChildren='OFF' size='default' checked={isShowSidebarBgImg} onChange={this.handleSettingImgIsClose} />
            <Row gutter={48}>
              <Col span={6}>
                <img alt='sidebar-bg' className={classnames(styles.sidebarImg, { [styles.active]: sidebarBgImg === '1' || false })} src={img1} onClick={() => this.handleSettingImg('1')} />
              </Col>
              <Col span={6}>
                <img alt='sidebar-bg' className={classnames(styles.sidebarImg, { [styles.active]: sidebarBgImg === '2' || false })} src={img2} onClick={() => this.handleSettingImg('2')} />
              </Col>
              <Col span={6}>
                <img alt='sidebar-bg' className={classnames(styles.sidebarImg, { [styles.active]: sidebarBgImg === '3' || false })} src={img3} onClick={() => this.handleSettingImg('3')} />
              </Col>
              <Col span={6}>
                <img alt='sidebar-bg' className={classnames(styles.sidebarImg, { [styles.active]: sidebarBgImg === '4' || false })} src={img4} onClick={() => this.handleSettingImg('4')} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      // </Page>
    )
  }
}

// Setting.propTypes = {
//   setting: PropTypes.object,
//   dispatch: PropTypes.func,
//   loading: PropTypes.object,
// }

export default connect(({ app }) => ({ app }))(Setting)
