import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Input, Icon, Form, Radio, InputNumber, DatePicker, Button } from 'antd'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import { config } from 'utils'
import { Page, DropOption } from 'components'
import SearchRecommendModal from './SearchRecommendModal'

import styles from './index.less'


const SearchRecommend = ({ searchRecommend, dispatch, loading }) => {
  const {searchModalVisible} = searchRecommend;

  const columns = [{
    title: 'ID',
    dataIndex: 'id',
  },{
    title: '应用',
    dataIndex: 'app',
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
      type: 'searchRecommend/query',
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
    item: searchRecommend.currentItem,
    files: {},
    visible: searchRecommend.modalVisible,
    maskClosable: false,
    title: '新建推荐',
    wrapClassName: 'vertical-center-modal',
    confirmLoading: searchRecommend.isLoading,
    errorMessage: searchRecommend.error,
    onOk(data) {
      console.log(loading)
      searchRecommend.isLoading = true
      if (data.id == undefined) {
        dispatch({
          type: `searchRecommend/post`,
          payload: data,
        })
      }else{
        dispatch({
          type: `searchRecommend/update`,
          payload: data,
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'searchRecommend/hideModal',
      })
    },
  }

  /**
   * 上传按钮的点击事件
   */
  const uploadClick = () => {
    dispatch({
      type: 'searchRecommend/showModal',
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
      type: 'searchRecommend/showModal',
      payload: {
        currentItem: value,
      },
    })
  }


  return (
    <Page inner>

      <div className={styles.searchContiner}>
        <Button type="primary" className={styles.searchRecommendUpload} className={styles.globalTextSize}
                onClick={uploadClick}>新建推荐</Button>
        <Search placeholder="按剧集id查询" className={styles.search} onSearch={value => searchClick(value)}/>
      </div>
      <br/>

      <Table columns={columns}
             dataSource={searchRecommend.searchRecommendsData}
             rowKey={record => record.id}
             loading={loading.effects['searchRecommend/query']}
      />

      {searchRecommend.modalVisible && <SearchRecommendModal  {...modalProps} />}
    </Page>
  )
}

SearchRecommend.propTypes = {
  searchRecommend: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ searchRecommend, dispatch, loading }) => ({ searchRecommend, dispatch, loading }))(SearchRecommend)
