import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, InputNumber, Radio, Modal, Cascader} from 'antd'
import city from '../../utils/city'

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
      {modalOpts.modalType === 'create' ?

        <Form layout="horizontal" hideRequiredMark>
          <FormItem label="用户名" hasFeedback {...formItemLayout} help="姓名至少四位">
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  min: 4,
                  required: true,
                },
              ],
            })(<Input/>)}
          </FormItem>
          <FormItem label="密码" hasFeedback {...formItemLayout} help="姓名至少四位">
            {getFieldDecorator('password', {
              initialValue: item.password,
              rules: [
                {
                  min: 4,
                  required: true,
                  type: 'string',
                },
              ],
            })(<Input disabled={modalOpts.disabled}/>)}
          </FormItem>
          <FormItem label="角色" hasFeedback {...formItemLayout}>
            {getFieldDecorator('permission', {
              initialValue:'guest' ,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Radio.Group>
                <Radio value={"guest"}>Guest</Radio>
                <Radio value={'editor'}>Editor</Radio>
                <Radio value={'admin'}>Admin</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>

        : modalOpts.modalType === 'updatePermission' ?

          <Form>

            <FormItem label="角色" hasFeedback {...formItemLayout}>
              {getFieldDecorator('permission', {
                initialValue: item.permission.split(':')[1].slice(1, -2),
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={"guest"}>Guest</Radio>
                  <Radio value={'editor'}>Editor</Radio>
                  <Radio value={'admin'}>Admin</Radio>
                </Radio.Group>
              )}
            </FormItem>


          </Form>
          :
          <Form>
            <FormItem label="账号权限" hasFeedback {...formItemLayout}>
              {getFieldDecorator('enable', {
                initialValue: item.enable,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={true}>可用</Radio>
                  <Radio value={false}>禁用</Radio>
                </Radio.Group>
              )}
            </FormItem>
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
