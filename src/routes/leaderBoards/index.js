import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Input, Icon, Form, Radio, InputNumber, DatePicker, Button } from 'antd'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import { config } from 'utils'
import { Page, DropOption } from 'components'
import LeaderBoardsModal from './LeaderBoardsModal'

import styles from './index.less'


const LeaderBoards = ({ leaderBoards, dispatch, loading }) => {
  

  const columns = [{
    title: 'ID',
    dataIndex: 'id',
  },{
    title: '应用',
    dataIndex: 'app',
  },{
    title: '榜单类型',
    dataIndex: 'name',
  },
    {
      title: '剧集id',
      dataIndex: 'series_id',
    }, {
      title: '剧集名称',
      dataIndex: 'series_name',
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
      type: 'leaderBoards/query',
      payload: {
        opts: {
          limit: 50,
          offset: 0,
          query: "series_id:" + value,
        }
      },
    })
  }

  /**
   *  弹框的初始数据
   */
  const modalProps = {
    item: leaderBoards.currentItem,
    files: {},
    visible: leaderBoards.modalVisible,
    maskClosable: false,
    title: '新增榜单',
    wrapClassName: 'vertical-center-modal',
    confirmLoading: leaderBoards.isLoading,
    errorMessage: leaderBoards.error,
    onOk(data) {
      console.log(loading)
      leaderBoards.isLoading = true
      if (data.id == undefined) {
        dispatch({
          type: `leaderBoards/post`,
          payload: data,
        })
      }else{
        dispatch({
          type: `leaderBoards/update`,
          payload: data,
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'leaderBoards/hideModal',
      })
    },
  }

  /**
   * 上传按钮的点击事件
   */
  const uploadClick = () => {
    dispatch({
      type: 'leaderBoards/showModal',
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
      type: 'leaderBoards/showModal',
      payload: {
        currentItem: value,
      },
    })
  }


  return (
    <Page inner>

      <div className={styles.searchContiner}>
        <Button type="primary" className={styles.leaderBoardsUpload} className={styles.globalTextSize}
                onClick={uploadClick}>新建推荐</Button>
        <Search placeholder="按剧集id查询" className={styles.search} onSearch={value => searchClick(value)}/>
      </div>
      <br/>


      <Table columns={columns}
             dataSource={leaderBoards.leaderBoardsData}
             rowKey={record => record.id}
             loading={loading.effects['leaderBoards/query']}
      />

      {leaderBoards.modalVisible && <LeaderBoardsModal  {...modalProps} />}
    </Page>
  )
}

LeaderBoards.propTypes = {
  leaderBoards: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ leaderBoards, dispatch, loading }) => ({ leaderBoards, dispatch, loading }))(LeaderBoards)
