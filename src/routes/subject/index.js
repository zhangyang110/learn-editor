import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Input, Icon, Form, Radio, InputNumber, DatePicker, Button } from 'antd'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import { config } from 'utils'
import { Page, DropOption } from 'components'
import SubjectModal from './SubjectModal'
import SearchModal from './SearchModal'

import styles from './index.less'


const Subject = ({ subject, dispatch, loading }) => {
  const {searchModalVisible} = subject;

  const columns = [{
    title: 'ID',
    dataIndex: 'id',
  },{
    title: '应用',
    dataIndex: 'app',
  },{
    title: '类型',
    dataIndex: 'type',
    render:(text, record, index)=>{
      console.log(text)
      switch (text){
        case 1:
          return <span>专题模版1</span>
        case 2:
          return <span>专题模版2</span>
        case 3:
          return <span>免费专区模版1</span>
        case 4:
          return <span>免费专区模版2</span>
      }
    }
  },{
    title: '名称',
    dataIndex: 'name',
  }, {
    title: '背景',
    dataIndex: 'background_url',
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
                           menuOptions={[{key: '1', name: '查看'}, {key: '2', name: '修改'}]}
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
      type: 'subject/query',
      payload: {
        opts: {
          limit: 50,
          offset: 0,
          query: "name:" + value,
        }
      },
    })
  }

  /**
   *  弹框的初始数据
   */
  const modalProps = {
    item: subject.currentItem,
    files: {},
    visible: subject.modalVisible,
    maskClosable: false,
    title: '新建专题',
    wrapClassName: 'vertical-center-modal',
    confirmLoading: subject.isLoading,
    errorMessage: subject.error,
    onOk(data) {
      console.log(loading)
      subject.isLoading = true
      if (data.id == undefined) {
        dispatch({
          type: `subject/postSubject`,
          payload: data,
        })
      }else{
        dispatch({
          type: `subject/update`,
          payload: data,
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'subject/hideModal',
      })
    },
  }

  /**
   * 上传按钮的点击事件
   */
  const uploadClick = () => {
    dispatch({
      type: 'subject/showModal',
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
    if (e.key == 1) {
      dispatch({
        type: "subject/jump",
        payload: {
          id: value.id,
          app:value.app,
        },
      })
    } else if (e.key == 2) {
      dispatch({
        type: 'subject/showModal',
        payload: {
          currentItem: value,
        },
      })
    }
  };


  return (
    <Page inner>

      <div className={styles.searchContiner}>
        <Button type="primary" className={styles.subjectUpload} className={styles.globalTextSize}
                onClick={uploadClick}>新建专题</Button>
        <Search placeholder="按专题名称查询" className={styles.search} onSearch={value => searchClick(value)}/>
      </div>
      <br/>

      <Table columns={columns}
             dataSource={subject.subjectsData}
             rowKey={record => record.id}
             loading={loading.effects['subject/query']}
      />

      {subject.modalVisible && <SubjectModal  {...modalProps} />}
      {searchModalVisible && <SearchModal/>}
    </Page>
  )
}

Subject.propTypes = {
  subject: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ subject, dispatch, loading }) => ({ subject, dispatch, loading }))(Subject)
