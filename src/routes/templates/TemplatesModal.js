import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Upload, Button, Icon, notification } from 'antd'
import moment from 'moment';
import styles from './index.less'




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
  onOk,
  imageLayer,
  name,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      const cellWidth = data.width + data.x ;
      if (cellWidth > 1680) {
        notification['error']({
          message: 'cell width cannot  >  1680.',
        });
        return;
      }

      
      onOk(data);
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }


  const isDisabled = 'false';

  return (

    <Modal {...modalOpts}>

      <Form layout="horizontal">


       

        <FormItem label="模板宽度" hasFeedback {...formItemLayout}>
             <Input disabled={isDisabled} value="1680" />
        </FormItem>

        <FormItem label="模板名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: name ,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>

    
        <FormItem label="图层宽度" hasFeedback {...formItemLayout}>
           
          {getFieldDecorator('width', {
              initialValue: imageLayer && imageLayer.width ,
            rules: [
              {
                required: true,
              },
            ],
          })(<InputNumber min={0} />)}

        </FormItem>

        <FormItem label="图层高度" hasFeedback {...formItemLayout}>
        
          {getFieldDecorator('height', {
              initialValue: imageLayer && imageLayer.height ,
            rules: [
              {
                required: true,
              },
            ],
          })(<InputNumber />)}
        </FormItem>

        <FormItem label="图层上边距" hasFeedback {...formItemLayout}>
        
          {getFieldDecorator('y', {
              initialValue: imageLayer && imageLayer.y ,
            rules: [
              {
                required: true,
              },
            ],
          })(<InputNumber />)}
        </FormItem>

        <FormItem label="图层左边距" hasFeedback {...formItemLayout}>
        
          {getFieldDecorator('x', {
              initialValue: imageLayer && imageLayer.x ,
            rules: [
              {
                required: true,
              },
            ],
          })(<InputNumber />)}
        </FormItem>


        <FormItem label="图层类型" hasFeedback {...formItemLayout}>
        
          {getFieldDecorator('tid', {
            initialValue: imageLayer == null ? 1 : imageLayer.tid ,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Radio.Group   >
              <Radio value={1} > 单图层 </Radio>
              <Radio value={2} > 双图层 </Radio>
            </Radio.Group>
            )}
        </FormItem>

      </Form>
    </Modal>

  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
