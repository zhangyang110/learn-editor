import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Input, Icon, Form, Radio, InputNumber, DatePicker, Button } from 'antd'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import { config } from 'utils'
import { Page, DropOption } from 'components'
import RecommendModal from './RecommendModal'
import SearchModal from './SearchModal'

import styles from './index.less'


const Recommend = ({ recommend, dispatch, loading }) => {
  const {searchModalVisible} = recommend;

  const columns = [{
    title: 'ID',
    dataIndex: 'id',
  },{
    title: '应用',
    dataIndex: 'app',
  },{
    title: '频道名称',
    dataIndex: 'name',
  },
    {
      title: '类型',
      dataIndex: 'type',
      render:(text, record, index)=>{
        console.log(text)
        switch (text){
          case 1:
            return <span>剧集</span>
          case 2:
            return <span>分类</span>
          case 3:
            return <span>专题模版1</span>
          case 4:
            return <span>专题模版2</span>
          case 5:
            return <span>免费专区模版1</span>
          case 6:
            return <span>免费专区模版2</span>
        }
      }
    },
    {
      title: '内容Id',
      dataIndex: 'object_id',
    }, {
      title: '内容名称',
      dataIndex: 'object_name',
    },{
      title: '封面',
      dataIndex: 'cover_url',
      width:100,
      render: (text, row, index) => {
        return <img src={`${config.resPrefix}/${text}`} className={styles.img} alt="xx"/>;
      },
    },{
      title: '位置',
      dataIndex: 'position',
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
      type: 'recommend/query',
      payload: {
        opts: {
          limit: 50,
          offset: 0,
          query: "name:" + value,
          model:"accurate",
        }
      },
    })
  }

  /**
   *  弹框的初始数据
   */
  const modalProps = {
    item: recommend.currentItem,
    files: {},
    visible: recommend.modalVisible,
    maskClosable: false,
    title: '新建运营位',
    wrapClassName: 'vertical-center-modal',
    confirmLoading: recommend.isLoading,
    errorMessage: recommend.error,
    onOk(data) {
      console.log(loading)
      recommend.isLoading = true
      if (data.id == undefined) {
        dispatch({
          type: `recommend/postRecommend`,
          payload: data,
        })
      }else{
        dispatch({
          type: `recommend/update`,
          payload: data,
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'recommend/hideModal',
      })
    },
  }

  /**
   * 上传按钮的点击事件
   */
  const uploadClick = () => {
    dispatch({
      type: 'recommend/showModal',
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
      type: 'recommend/showModal',
      payload: {
        currentItem: value,
      },
    })
  }


  return (
    <Page inner>

      <div className={styles.searchContiner}>
        <Button type="primary" className={styles.recommendUpload} className={styles.globalTextSize}
                onClick={uploadClick}>新建运营位</Button>
        <Search placeholder="根据频道名称查询" className={styles.search} onSearch={value => searchClick(value)}/>
      </div>
      <br/>

      <Table columns={columns}
             dataSource={recommend.recommendsData}
             rowKey={record => record.id}
             loading={loading.effects['recommend/query']}
      />

      {recommend.modalVisible && <RecommendModal  {...modalProps} />}
      {searchModalVisible && <SearchModal/>}
    </Page>
  )
}

Recommend.propTypes = {
  recommend: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ recommend, dispatch, loading }) => ({ recommend, dispatch, loading }))(Recommend)
