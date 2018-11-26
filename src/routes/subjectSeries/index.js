import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Input, Icon, Form, Radio, InputNumber, DatePicker, Button } from 'antd'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import { config } from 'utils'
import { Page, DropOption } from 'components'
import SubjectSeriesModal from './SubjectSeriesModal'
import SearchModal from './SearchModal'

import styles from './index.less'


const SubjectSeries = ({ subjectSeries, dispatch, loading }) => {
  const {searchModalVisible} = subjectSeries;

  const columns = [{
    title: 'ID',
    dataIndex: 'id',
  },{
    title: '剧集id',
    dataIndex: 'series_id',
  },{
    title: '名称',
    dataIndex: 'name',
  },{
    title: '封面',
    dataIndex: 'cover_url',
    width:100,
    render: (text, row, index) => {
      return <img src={`${config.resPrefix}/${text}`} className={styles.img} alt="xx"/>;
    },
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
    // dispatch({
    //   type: 'subjectSeries/query',
    //   payload: {
    //     opts: {
    //       limit: 50,
    //       offset: 0,
    //       query: "name:" + value,
    //     }
    //   },
    // })
  }

  /**
   *  弹框的初始数据
   */
  const modalProps = {
    item: subjectSeries.currentItem,
    files: {},
    visible: subjectSeries.modalVisible,
    maskClosable: false,
    title: '新增剧集',
    wrapClassName: 'vertical-center-modal',
    confirmLoading: subjectSeries.isLoading,
    errorMessage: subjectSeries.error,
    onOk(data) {
      console.log(loading)
      subjectSeries.isLoading = true
      if (data.id == undefined) {
        dispatch({
          type: `subjectSeries/postSubjectSeries`,
          payload: data,
        })
      }else{
        dispatch({
          type: `subjectSeries/update`,
          payload: data,
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'subjectSeries/hideModal',
      })
    },
  }

  /**
   * 上传按钮的点击事件
   */
  const uploadClick = () => {
    dispatch({
      type: 'subjectSeries/showModal',
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
      type: 'subjectSeries/showModal',
      payload: {
        currentItem: value,
      },
    })
  }


  return (
    <Page inner>

      <div className={styles.searchContiner}>
        <Button type="primary" className={styles.subjectSeriesUpload} className={styles.globalTextSize}
                onClick={uploadClick}>新增剧集</Button>
        <Search placeholder="暂不可用" className={styles.search} onSearch={value => searchClick(value)}/>
      </div>
      <br/>

      <Table columns={columns}
             dataSource={subjectSeries.subjectSeriesData}
             rowKey={record => record.id}
             loading={loading.effects['subjectSeries/query']}
      />

      {subjectSeries.modalVisible && <SubjectSeriesModal  {...modalProps} />}
      {searchModalVisible && <SearchModal/>}
    </Page>
  )
}

SubjectSeries.propTypes = {
  subjectSeries: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ subjectSeries, dispatch, loading }) => ({ subjectSeries, dispatch, loading }))(SubjectSeries)
