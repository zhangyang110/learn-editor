import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Input, Icon, Form, Radio, InputNumber, DatePicker, Button } from 'antd'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import { config } from 'utils'
import { Page, DropOption } from 'components'
import ReleasesModal from './ReleasesModal'


import styles from './index.less'


const Releases = ({ releases, dispatch, loading }) => {
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
  },
  //   {
  //   title: '版本号',
  //   dataIndex: 'versionCode',
  // },
  {
    title: '渠道',
    dataIndex: 'channel',
    render: (text, record, index) => {
      console.log(text)
      switch (text) {
        case 'guowang':
          return <span>国网</span>
        case 'shaanxi':
          return <span>陕西</span>
        case 'hainan':
          return <span>海南</span>
        case 'hubei':
          return <span>湖北</span>
        case 'shanxi':
          return <span>山西</span>
      }
    }
  },
  {
    title: '版本名称',
    dataIndex: 'versionName',
  }, {
    title: '应用名称',
    dataIndex: 'name',
  }, {
    title: '版本说明',
    dataIndex: 'changeLog',
    className: 'changeLog',
  }, {
    title: '是否强制更新',
    dataIndex: 'force',
    // width: '90',
    className: 'force',
    render: (text, record, index) => {

      return <span> {text ? '是' : '否'} </span>
    },
  }, {
    title: 'MD5',
    dataIndex: 'md5',

  }, {
    title: '上传时间',
    dataIndex: 'created',
    render: text => (<span>{text.slice(0, 10)}</span>),
  }, {
    title: '下载',
    key: 'action',
    render: (text, record, index) => {
      return <DropOption onMenuClick={e => downloadApp(record.url)}
        menuOptions={[{
          key: '2',
          name: <a href={`/res/v3/releases/${record.url}`} className={styles.releasesEdit}> 下载 </a>,
        }]}>

      </DropOption>
    },
  },
  ]

  const Search = Input.Search

  const FormItem = Form.Item


  /**
   *  点击搜索后的回调方法
   */
  const searchClick = (value) => {
    console.log(value)
    // dispatch({
    //   type: 'releases/query',
    //   payload: {
    //     opts: {
    //       limit: 50,
    //       offset: 0,
    //       query: "name:" + value,
    //     }
    //   },
    // })
  }

  const downloadApp = (params) => {

  }

  /**
   *  弹框的初始数据
   */
  const modalProps = {
    files: {},
    visible: releases.modalVisible,
    maskClosable: false,
    title: '上传新版本',
    wrapClassName: 'vertical-center-modal',
    confirmLoading: releases.isLoading,
    errorMessage: releases.error,
    onOk(data) {
      console.log(loading)
      releases.isLoading = true
      dispatch({
        type: `releases/uploads`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'releases/hideModal',
      })
    },
  }

  /**
   * 上传按钮的点击事件
   */
  const uploadClick = () => {
    dispatch({
      type: 'releases/showModal',
      payload: {
        modalVisible: true,
      },
    })
  }


  return (
    <Page inner>

      <div className={styles.searchContiner}>
        <Button type="primary" className={styles.releasesUpload} className={styles.globalTextSize}
          onClick={uploadClick}>上传新版本</Button>
        <Search placeholder="暂不可用" className={styles.releasesSearch} onSearch={value => searchClick(value)} />
      </div>
      <br />

      <Table columns={columns}
        dataSource={releases.releasesData}
        rowKey={record => record.id}
        loading={loading.effects['releases/query']}
      />

      {releases.modalVisible && <ReleasesModal  {...modalProps} />}

    </Page>
  )
}

Releases.propTypes = {
  releases: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ releases, dispatch, loading }) => ({ releases, dispatch, loading }))(Releases)
