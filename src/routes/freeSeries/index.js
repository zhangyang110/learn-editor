import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Input, Icon, Form, Radio, InputNumber, DatePicker, Button } from 'antd'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import { config } from 'utils'
import { Page, DropOption } from 'components'
import FreeSeriesModal from './FreeSeriesModal'

import styles from './index.less'


const FreeSeries = ({ freeSeries, dispatch, loading }) => {
  const {searchModalVisible} = freeSeries;

  const columns = [{
    title: 'ID',
    dataIndex: 'id',
  },{
    title: '应用',
    dataIndex: 'app',
  },{
    title: '日期',
    dataIndex: 'date',
  },{
    title: '类型',
    dataIndex: 'type',
  },
    {
      title: '剧集id',
      dataIndex: 'series_id',
    }, {
      title: '剧集名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => {
        // return <span> <Icon type="edit" className={styles.seriesEdit} onClick={e => edit(record, e)} />  </span>
        return <DropOption onMenuClick={e => edit(record, e)}
                           menuOptions={[{key: '2', name: '修改'}]}
        />
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
    dispatch({
      type: 'freeSeries/query',
      payload: {
        opts: {
          limit: 50,
          offset: 0,
          query: "date:" + value,
        }
      },
    })
  }

  /**
   *  弹框的初始数据
   */
  const modalProps = {
    item: freeSeries.currentItem,
    files: {},
    visible: freeSeries.modalVisible,
    maskClosable: false,
    title: '新增剧集',
    wrapClassName: 'vertical-center-modal',
    confirmLoading: freeSeries.isLoading,
    errorMessage: freeSeries.error,
    onOk(data) {
      console.log(loading)
      freeSeries.isLoading = true
      if (data.id == undefined) {
        dispatch({
          type: `freeSeries/post`,
          payload: data,
        })
      }else{
        dispatch({
          type: `freeSeries/update`,
          payload: data,
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'freeSeries/hideModal',
      })
    },
  }

  /**
   * 上传按钮的点击事件
   */
  const uploadClick = () => {
    dispatch({
      type: 'freeSeries/showModal',
      payload: {
        modalVisible: true,
        currentItem: {},
      },
    })
  }

  /**
   *  点击编辑后的回调方法
   */
  const edit = (value, e) => {
    dispatch({
      type: 'freeSeries/showModal',
      payload: {
        currentItem: value,
      },
    })
  }


  return (
    <Page inner>

      <div className={styles.searchContiner}>
        <Button type="primary" className={styles.freeSeriesUpload} className={styles.globalTextSize}
                onClick={uploadClick}>新增剧集</Button>
        <Search placeholder="按日期查询" className={styles.search} onSearch={value => searchClick(value)}/>
      </div>
      <br/>

      <Table columns={columns}
             dataSource={freeSeries.freeSeriesData}
             rowKey={record => record.id}
             loading={loading.effects['freeSeries/query']}
      />

      {freeSeries.modalVisible && <FreeSeriesModal  {...modalProps} />}
    </Page>
  )
}

FreeSeries.propTypes = {
  freeSeries: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ freeSeries, dispatch, loading }) => ({ freeSeries, dispatch, loading }))(FreeSeries)
