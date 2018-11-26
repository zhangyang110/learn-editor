import React from 'react'
import PropTypes from 'prop-types'
import {Table, Modal} from 'antd'
import {DropOption} from 'components'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({onDeleteItem, dispatch, onEditItem, isMotion, location, ...tableProps}) => {
  const handleMenuClick = (record, e) => {
    if (e.key == 1) {
      dispatch({type: 'user/showModal', payload: {modalType: 'updatePermission', item: record}})
    }else if(e.key==2){
      dispatch({type: 'user/showModal', payload: {modalType: 'updateEnable', item: record}})
    }
  }

  const columns = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      className: styles.avatar,
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
      render: text => (<span>{text.slice(0,10)}</span>)
    },
    {
      title: '创建时间',
      dataIndex: 'updated',
      key: 'updated',
      render: text => (<span>{text.slice(0,10)}</span>)

    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e) }
                           menuOptions={[{key: '1', name: '修改Permission'}, {key: '2', name: '修改Enable'}]}
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
