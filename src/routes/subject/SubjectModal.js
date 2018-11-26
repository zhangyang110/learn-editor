import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal,Select, Row,Col,Cascader, Upload, Button, Icon, message,Tooltip } from 'antd'
import city from '../../utils/city'
import moment from 'moment';
import styles from './index.less'
import {connect} from 'dva'
// import JumpModal from "./JumpModal";
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
  subject,
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
  const {jumpModalVisible} = subject;
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      data.id = item.id;
      data.type=parseInt(data.type);
      console.log(data)
      onOk(data)
    })
  }
  const setJump = () => {
    // dispatch({type: 'subject/public', payload: {jumpModalVisible: true}})
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
    subject,
    visible: jumpModalVisible,
    title: "选择剧集",
    item: {},
    onCancel: () => {
      dispatch({type: 'subject/public', payload: {jumpModalVisible: false}})
    },
    onOk: () => {
      dispatch({type: 'subject/public', payload: {jumpModalVisible: false}})
    },
    maskClosable: false,
  };

  const addCoverImg = () => {
    dispatch({type: 'subject/public', payload: {searchType: 'searchBackgroundImg',searchModalVisible: true,}})
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

        <FormItem label="类型" hasFeedback {...formItemLayout}>
        {getFieldDecorator('type', {
           rules: [
            {
              required: true,
            },
          ],
          initialValue: item.type != undefined ? ''+item.type:'1',
        })(
          <Select style={{width: 150}} disabled={item.id!=undefined?true:false}>
          <Select.Option value="1">专题模版1</Select.Option>
          <Select.Option value="2">专题模版2</Select.Option>
          <Select.Option value="3">免费专区模版1</Select.Option>
          <Select.Option value="4">免费专区模版2</Select.Option>
        </Select>)}
        </FormItem>

          <FormItem label="名称"
                    hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="背景"
          >{getFieldDecorator('background_url',{
            initialValue: item.background_url,
            rules: [{
              required: false,
            }],
          })(
            <Tooltip placement="right" title='点击修改图片'>
              <div onClick={addCoverImg}
                   className={styles.frame}>
                <img
                  src={item.background_url ? `${config.resPrefix}/${item.background_url}` : ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: item.background_url ? 'block' : 'none'
                  }}/>
                {item.background_url ? '' : '点我添加图片'}
              </div>
            </Tooltip>
          )}

          </FormItem>
            

        <FormItem hasFeedback {...formItemLayout}>
          <span className={styles.errorMessage} > { modalProps.errorMessage } </span>
        </FormItem>


      </Form>
    }
      {/* {jumpModalVisible && <JumpModal {...jumpModalProps}/>} */}
    </Modal>

  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({subject, dispatch, loading}) => ({
  subject,
  dispatch,
  loading
}))(Form.create()(modal))
