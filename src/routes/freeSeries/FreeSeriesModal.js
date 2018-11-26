import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal,Select, Row,Col,Cascader, Upload, Button, Icon, message,Tooltip,DatePicker } from 'antd'
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
  freeSeries,
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
  const {jumpModalVisible} = freeSeries;
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      data.id = item.id;
      data.date = data.date.format(dateFormat);
      console.log(data)
      onOk(data)
    })
  }
  const setJump = () => {
    dispatch({type: 'freeSeries/public', payload: {jumpModalVisible: true}})
  };

  const setInputVal = (id,name) => {
    setFieldsValue({series_id: id})
    setFieldsValue({name: name})
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const jumpModalProps = {
    loading,
    setInputVal: setInputVal,
    dispatch,
    freeSeries,
    visible: jumpModalVisible,
    title: "选择剧集",
    item: {},
    onCancel: () => {
      dispatch({type: 'freeSeries/public', payload: {jumpModalVisible: false}})
    },
    onOk: () => {
      dispatch({type: 'freeSeries/public', payload: {jumpModalVisible: false}})
    },
    maskClosable: false,
  };
  const dateFormat = 'YYYY-MM-DD';
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

       <FormItem label="日期" hasFeedback {...formItemLayout} >
              {getFieldDecorator('date', {
                initialValue: item.date && moment(item.date, dateFormat),
                rules: [{
                  type: 'object',
                  required: true,
                }],
              })(
                <DatePicker format={dateFormat} />
                )}

            </FormItem>

             <FormItem label="类型"
                    hasFeedback {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue: item.type,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input/>)}
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
            {getFieldDecorator('name', {
              initialValue: item.name,
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

export default connect(({freeSeries, dispatch, loading}) => ({
  freeSeries,
  dispatch,
  loading
}))(Form.create()(modal))
