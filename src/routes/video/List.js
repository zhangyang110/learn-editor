import React from 'react'
import PropTypes from 'prop-types'
import {Table, Modal} from 'antd'
import {DropOption} from 'components'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({onDeleteItem, dispatch, onEditItem, isMotion, location, ...tableProps}) => {
  const handleMenuClick = (record, e) => {
    if (e.key == 1) {
      dispatch({type: 'video/showModal', payload: {modalType: 'updateShow_name', item: record}})
    }else if(e.key==2){
      dispatch({type: 'video/showModal', payload: {modalType: 'updateAd_tag', item: record}})
    }
  }

  const columns = [
    {
      title: '视频ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      className: styles.avatar,
    },
    {
      title: '视频名称',
      dataIndex: 'name',
      key: 'name',
      render: text => (<span>{text}</span>)

    },
    {
      title: '更新时间',
      dataIndex: 'updated',
      key: 'updated',
      render: text => (<span>{text.slice(0,10)}</span>)
    },
    {
      title: '显示名称',
      dataIndex: 'show_name',
      key: 'show_name',
      render: text => (<span>{text}</span>)

    },
    {
      title: '类型',
      dataIndex: 'ad_tag',
      key: 'ad_tag',
      render: text => {return text===1?<span>广告</span>:<span>正片</span>}

    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e) }
                           menuOptions={[{key: '1', name: '修改显示名称'}, {key: '2', name: '修改类型'}]}
              />
      },
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{x: 1250}}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
