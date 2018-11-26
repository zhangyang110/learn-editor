import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Input, Icon, Form, Tabs, InputNumber, Button, Modal, Row, Col, } from 'antd'
import moment from 'moment';
import { routerRedux } from 'dva/router'
import { config } from 'utils'
import { Page, DropOption, SearchImage } from 'components'

import SeriesModal from './SeriesModal'

import styles from './index.less'

const TabPane = Tabs.TabPane
const { TextArea } = Input;

const Series = ({ series, dispatch, loading }) => {
  const columns = [{
    title: 'id',
    dataIndex: 'id',
  }, {
    title: '名称',
    dataIndex: 'name',
  }, {
    title: '封面',
    dataIndex: 'cover_url',
    render: (text, row, index) => {
      return <img src={`${config.resPrefix}/${text}`} className={styles.img} />;
    },
  }, {
    title: '样式',
    dataIndex: 'style',
  }, {
    title: '频道',
    dataIndex: 'channel',
  }, {
    title: '集数',
    dataIndex: 'episodes',
  }, {
    title: '价格',
    dataIndex: 'price',
  }, {
    title: '状态',
    dataIndex: 'status',
    render: (text, record, index) => {
      console.log(text)
      switch (text) {
        case 1:
          return <span>下架</span>
        default:
          return <span>上架</span>
      }
    }
  },
  {
    title: '修改',
    key: 'action',
    render: (text, record, index) => {
      // return <span> <Icon type="edit" className={styles.seriesEdit} onClick={e => edit(record, e)} />  </span>
      return <DropOption onMenuClick={e => edit(record, e)}
        menuOptions={[{ key: '2', name: '修改' }]}
      />
    },
  },
  ]

  const Search = Input.Search;

  const FormItem = Form.Item;




  /**
   *  点击编辑后的回调方法
   */
  const edit = (value, e) => {
    dispatch({
      type: 'series/showModal',
      payload: {
        currentItem: value,
      },
    })
  }


  /**
     *  点击搜索后的回调方法
     */
  const searchClick = (value) => {
    console.log(value);
    series.searchKeyWord = value;
    dispatch({
      type: 'series/query',
      payload: {
        opts: {
          limit: 50,
          offset: 0,
          query: "name:" + value + ",allSeries:1,IsCategoryName:1",
        }
      },
    })
  }

  /**
   * 显示搜索图片的弹框
   * @param {*} type
   */
  const showSearchModal = (type) => {
    series.searchType = type;
    dispatch({
      type: 'series/showSearchModal',
    })
  }


  /**
    *  编辑信息的 弹框 的初始化
    */
  const editModalProps = {
    item: series.currentItem,
    addImage: showSearchModal,
    visible: series.modalVisible,
    maskClosable: false,
    title: series.currentItem.name,
    wrapClassName: 'vertical-center-modal',
    width: 800,
    // zIndex: 2500,
    onOk(data) {
      console.log(data);

      dispatch({
        type: `series/update`,
        payload: {
          id: series.currentItem.id,
          body: data,
        },
      })
    },
    onCancel() {
      dispatch({
        type: 'series/query',
        payload: {
          opts: {
            limit: 50000,
            offset: 0,
            query: "name:" + series.searchKeyWord + ",allSeries:1,IsCategoryName:1",
          }
        },
      })
    },
  }

  /**
 * 批量上下架
 */
  function onBtnClick (tag) {
    console.log(tag);
    
    // dispatch({
    //   type: 'releases/showModal',
    //   payload: {
    //     modalVisible: true,
    //   },
    // })
  }



  return (
    <Page inner>

      <Tabs >
        <TabPane tab="视频列表" key="1">

          <div className={styles.searchContiner}>
            <Search placeholder="输入剧集名称" className={styles.seriesSearch} onSearch={value => searchClick(value)} />
          </div>
          <br />

          {/* 所有视频列表 */}
          <Table columns={columns}
            dataSource={series.seriesData}
            rowKey={record => record.id}
            loading={loading.effects['series/query']}
          />

          {/* 编辑视频内容的弹框 */}
          {series.modalVisible && <SeriesModal  {...editModalProps} />}

          {/* 搜索图片 */}
          {
            series.searchModalVisible &&
            <SearchImage
              dispatch={dispatch} types={series.types}
              searchData={series.imageList}    >
            </SearchImage>
          }

        </TabPane>

        <TabPane tab="批量上下架" key="2">
          <p className="ant-upload-text">在输入框内输入要下架的剧集id以英文逗号分割   示例-> 1,2,33,44,55,88</p> <br />
          <TextArea rows={4} />
          <br />
          <br />
          <Button type="primary" onClick={value => onBtnClick(111)} >批量上架</Button>
          <br />
          <br />
          <Button type="danger" onClick={value => onBtnClick(222)} >批量下架</Button>


        </TabPane>

      </Tabs>





    </Page>
  )
}

Series.propTypes = {
  series: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ series, dispatch, loading }) => ({ series, dispatch, loading }))(Series)
