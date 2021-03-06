import React from 'react'
import PropTypes from 'prop-types'
import {Form, Radio, Modal, Input, Select, Table, Row, Col, Icon, Tooltip} from 'antd'
import {config} from 'utils'

const Search = Input.Search;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const JumpModal = ({
                     dispatch,
                     series,
                     item = {},
                     setInputVal,
                     loading,
                     form: {
                       getFieldDecorator,
                       validateFields,
                       getFieldsValue,
                       setFieldsValue,
                       setFieldValue
                     },
                     ...jumpModalProps
                   }) => {
  const tableColum = [{
    title: 'ID',
    key: 'id',
    dataIndex: 'id'
  }, {
    title: '名称',
    key: 'name',
    dataIndex: 'name',
  }, {
    title: '操作',
    key: 'action',
    render: (record) => {
      return (<Tooltip title="点击选取" key='hh'><Icon type="check" style={{width: 50}}
                                                   onClick={e => handleSelect(record)}></Icon></Tooltip>)
    }
  }];
  const handleSelect = (record) => {
    setInputVal(record.id,record.name);
    dispatch({type: 'series/public', payload: {jumpModalVisible: false}})
  };
  const searchJump = (value) => {
    const data = {
      ...getFieldsValue()
    };

    const opts = {
      limit: 5000,
      offset: 0,
      query: "name:" + value,
    };
    dispatch({type: 'series/getJumpData', payload: {opts}});
  };
  return (
    <Modal {...jumpModalProps} title="选择内容">
      <Row>
        <Col span={12}>
          <FormItem>{getFieldDecorator('searchValue')(<Search placeholder="按名称查询" onSearch={searchJump}/>)}
          </FormItem>
        </Col>
      </Row>
      <Table rowKey='id' size='small' columns={tableColum} dataSource={series.jumpData}
             loading={loading.effects['series/getJumpData']}></Table>
    </Modal>
  )
};
JumpModal.propTypes = {
  form: PropTypes.object,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  setInputVal: PropTypes.func,
  loading: PropTypes.object,
};

export default Form.create()(JumpModal)
