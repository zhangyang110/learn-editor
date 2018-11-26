import React from 'react'
import PropTypes from 'prop-types'
import {Form, Radio, Modal, Input, Select, Table, Row, Col, Icon, Tooltip} from 'antd'
import {config} from 'utils'

const Search = Input.Search;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const JumpModal = ({
                     dispatch,
                     recommend,
                     item = {},
                     setInputVal,
                     app,
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
    let type,object_id,object_name;
    if (recommend.jumpType === 'bySeries') {
      type = 1;
    } else if (recommend.jumpType === 'byCategory') {
      type = 2;
    } else if (recommend.jumpType === 'bySubject1') {
      type = 3;
    }else if (recommend.jumpType === 'bySubject2') {
      type = 4;
    }else if (recommend.jumpType === 'bySubject3') {
      type = 5;
    }else if (recommend.jumpType === 'bySubject4') {
      type = 6;
    }
    object_id=record.id
    object_name=record.name
    setInputVal(type, object_id,object_name);
    dispatch({type: 'recommend/public', payload: {jumpModalVisible: false,jumpData:[]}})
  };
  const searchJump = (value) => {
    const data = {
      ...getFieldsValue()
    };
    let query
    switch (`${data.searchType}`){
      case 'bySubject1':
        query="name:" + value +",type:1"+",app:"+app
        break
      case 'bySubject2':
        query="name:" + value +",type:2"+",app:"+app
        break
      case 'bySubject3':
        query="name:" + value +",type:3"+",app:"+app
        break
      case 'bySubject4':
        query="name:" + value +",type:4"+",app:"+app
        break
      case 'bySeries':
        query="name:" + value+",channel:"+app
        break
      case 'byCategory':
        query="name:" + value
        break
      // default:
      //   query="name:" + value
      // break
    }

    const opts = {
      limit: 5000,
      offset: 0,
      query: query,
    };
    dispatch({type: 'recommend/getJumpData', payload: {jumpType: `${data.searchType}`, opts}});
  };
  return (
    <Modal {...jumpModalProps} title="选择内容">
      <Row>
        <Col span={8}>
          <FormItem>{getFieldDecorator('searchType', {initialValue: "bySeries"})(<Select style={{width: 150}}>
            <Select.Option value="bySeries">搜索剧集</Select.Option>
            <Select.Option value="byCategory">搜索分类</Select.Option>
            <Select.Option value="bySubject1">搜索专题模版1</Select.Option>
            <Select.Option value="bySubject2">搜索专题模版2</Select.Option>
            <Select.Option value="bySubject3">搜索免费专区模版1</Select.Option>
            <Select.Option value="bySubject4">搜索免费专区模版2</Select.Option>
          </Select>)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem>{getFieldDecorator('searchValue')(<Search placeholder="按名称查询" onSearch={searchJump}/>)}
          </FormItem>
        </Col>
      </Row>
      <Table rowKey='id' size='small' columns={tableColum} dataSource={recommend.jumpData}
             loading={loading.effects['recommend/getJumpData']}></Table>
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
  app:PropTypes.string,
};

export default Form.create()(JumpModal)
