import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const modal = ({
                 item = {},
                 onOk,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
                 ...modalProps,
               }) => {


  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }


  return (
    <Modal {...modalOpts}>
      {
        <Form>
          {
            modalOpts.modalType === 'updateShow_name' ?
              <FormItem label='显示名称'  {...formItemLayout}>
                {getFieldDecorator('val', {
                  initialValue: `${ item.show_name }`,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Input/>,
                )}
              </FormItem>
              :
              <FormItem label='类型'  {...formItemLayout}>
                {
                  console.log(item.ad_tag)
                }
                {getFieldDecorator('val', {
                  initialValue: `${ item.ad_tag }`,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <RadioGroup  >
                    <Radio value='0'>正片</Radio>
                    <Radio value='1'>广告</Radio>
                  </RadioGroup>,
                )}
              </FormItem>

          }


        </Form>}

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
