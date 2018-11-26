import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Row, Col, Button, Popconfirm, Alert,Icon} from 'antd'
import {Page} from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import Iconfont from '../../components/Iconfont'


const User = ({location, dispatch, user, loading}) => {
  location.query = queryString.parse(location.search)
  const {list, userRole, pagination, currentItem, modalVisible, modalType} = user

  // const flag = user.modalType;
  const modalProps = {
    modalType:modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/update'],
    title: `${modalType === 'create' ? '创建用户' : modalType === 'updatePermission' ? '更新用户Permission' : '更新用户Enable'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      if (modalType === 'create') {
        data.id = null;
      } else {
        data.id = currentItem.id
      }

      data.permission = {role: `${data.permission}` }
      dispatch({
        type: `user/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'user/hideModal',
      })
    },
  }

  const listProps = {
    dispatch: dispatch,
    dataSource: list,
    loading: loading.effects['user/query'],
    pagination,
    location,
  }
  const filterProps = {
    filter: {
      ...location.query,
    },
    onSearch(fieldsValue) {
      dispatch({
        type: 'user/query',
        payload: {
          opts: {
            limit: 50,
            offset: 0,
            query: "name:" + fieldsValue,
          }
        },
      })
    },
    onAdd() {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({user, loading}) => ({user, loading}))(User)
