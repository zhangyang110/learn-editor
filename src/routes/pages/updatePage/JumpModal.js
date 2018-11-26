import React from 'react'
import PropTypes from 'prop-types'
import {Form, Radio, Modal, Input, Select, Table, Row, Col, Icon, Tooltip} from 'antd'
import {config} from 'utils'

const Search = Input.Search;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const JumpModal = ({
                     dispatch,
                     updatePage,
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
    let jumpUrl, showUrl;
    if (updatePage.jumpType === 'bySeries') {
      jumpUrl = `lztv://videoDetail?id=${record.id}`;
      showUrl = `剧集名称为${record.name}`
    } else if (updatePage.jumpType === 'byPage') {
      jumpUrl = `lztv://channel?id=${record.id}`;
      showUrl = `页面名称为${record.name}`
    } else if (updatePage.jumpType === 'byApp') {
      jumpUrl = `lztv://appDetail?id=${record.id}&pkg=${record.package_name}`;
      showUrl = `App名称为${record.name}`
    }
    setInputVal(jumpUrl, showUrl);
    dispatch({type: 'updatePage/public', payload: {jumpUrl, jumpModalVisible: false}})
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
    dispatch({type: 'updatePage/getJumpData', payload: {jumpType: `${data.searchType}`, opts}});
  };
  return (
    <Modal {...jumpModalProps} title="设置跳转路由">
      <Row>
        <Col span={8}>
          <FormItem>{getFieldDecorator('searchType', {initialValue: "bySeries"})(<Select style={{width: 150}}>
            <Select.Option value="bySeries">搜索剧集</Select.Option>
            <Select.Option value="byPage">搜索页面</Select.Option>
            <Select.Option value="byApp">搜索游戏</Select.Option>
          </Select>)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem>{getFieldDecorator('searchValue')(<Search placeholder="按名称查询" onSearch={searchJump}/>)}
          </FormItem>
        </Col>
      </Row>
      <Table rowKey='id' size='small' columns={tableColum} dataSource={updatePage.jumpData}
             loading={loading.effects['updatePage/getJumpData']}></Table>
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
