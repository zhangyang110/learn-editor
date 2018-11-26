import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal,Select, Row,Col,Cascader, Upload, Button, Icon, message,Tooltip } from 'antd'
import city from '../../utils/city'
import moment from 'moment';
import styles from './index.less'
import {connect} from 'dva'
import JumpModal from "./JumpModal";
import {config} from 'utils'



const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  dispatch,
  leaderBoards,
  item = {},
  onOk,
  files,
  loading,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const {jumpModalVisible,appTemp} = leaderBoards;
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      data.id = item.id;
      console.log(data)
      onOk(data)
    })
  }
  const setJump = () => {
    const data = {
      ...getFieldsValue(),
    }
    dispatch({type: 'leaderBoards/public', payload: {jumpModalVisible: true,appTemp:data.app}})
  };

  const setInputVal = (id,name) => {
    setFieldsValue({series_id: id})
    setFieldsValue({series_name: name})
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const jumpModalProps = {
    loading,
    setInputVal: setInputVal,
    dispatch,
    leaderBoards,
    app:appTemp,
    visible: jumpModalVisible,
    title: "选择剧集",
    item: {},
    onCancel: () => {
      dispatch({type: 'leaderBoards/public', payload: {jumpModalVisible: false,jumpData:[]}})
    },
    onOk: () => {
      dispatch({type: 'leaderBoards/public', payload: {jumpModalVisible: false,jumpData:[]}})
    },
    maskClosable: false,
  };

  return (

    <Modal {...modalOpts}>
{
      <Form layout="horizontal">

        <FormItem label="应用名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('app', {
            initialValue: item.app != undefined ? item.app:'少儿',
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Radio.Group   >
            <Radio value='少儿' > 少儿 </Radio>
            <Radio value='教育' > 教育 </Radio>
          </Radio.Group>
          )}
        </FormItem>

        <FormItem label="榜单类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name != undefined ? item.name : '总榜',
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Radio.Group   >
            <Radio value='总榜' > 总榜 </Radio>
            <Radio value='周榜' > 周榜 </Radio>
            <Radio value='月榜' > 月榜 </Radio>
          </Radio.Group>
          )}
        </FormItem>

        <Row>
            <Col span={20}>
            <FormItem label="剧集id"
                    hasFeedback {...formItemLayout}>
            {getFieldDecorator('series_id', {
              initialValue: item.series_id,
              rules: [
                {
                  required: true,
                  type: 'number',
                },
              ],
            })(<InputNumber disabled={true}/>)}
          </FormItem>
            </Col>
            <FormItem>
              <Button type="dashed" onClick={setJump} size="default">选择剧集</Button>
            </FormItem>
          </Row>

          <FormItem label="剧集名称"
                    hasFeedback {...formItemLayout}>
            {getFieldDecorator('series_name', {
              initialValue: item.series_name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input disabled={true}/>)}
          </FormItem>
            

        <FormItem hasFeedback {...formItemLayout}>
          <span className={styles.errorMessage} > { modalProps.errorMessage } </span>
        </FormItem>


      </Form>
    }
      {jumpModalVisible && <JumpModal {...jumpModalProps}/>}
    </Modal>

  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({leaderBoards, dispatch, loading}) => ({
  leaderBoards,
  dispatch,
  loading
}))(Form.create()(modal))
