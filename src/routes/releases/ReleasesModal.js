import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Upload, Button, Icon, message } from 'antd'
import city from '../../utils/city'
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
  files,
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
      console.log(data)
      data.file = data.file.file;
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }


  const uploadBefore = (file) => {

    console.log(file);
    return false;
  }


  const { TextArea } = Input;

  return (

    <Modal {...modalOpts}>

      <Form layout="horizontal">
        <FormItem label="上传客户端" hasFeedback {...formItemLayout}>
          {getFieldDecorator('file', {
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Upload name="logo" action="temp/" listType="text" beforeUpload={uploadBefore} accept=".apk" >
              <Button>
                <Icon type="upload" /> 选择文件
              </Button>
            </Upload>)}
        </FormItem>


        <FormItem label="应用名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Radio.Group   >
            <Radio value='education' > education </Radio>
            <Radio value='game' > game </Radio>
            <Radio value='child' > child </Radio>
          </Radio.Group>
          )}
        </FormItem>

        <FormItem label="渠道" hasFeedback {...formItemLayout}>
          {getFieldDecorator('channel', {
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Radio.Group   >
              <Radio value='guowang' > 国网 </Radio>
              <Radio value='shaanxi' > 陕西 </Radio>
              <Radio value='hainan' > 海南 </Radio>
              <Radio value='hubei' > 湖北 </Radio>
              <Radio value='shanxi' > 山西 </Radio>
            </Radio.Group>
          )}
        </FormItem>

        <FormItem label="版本名称" hasFeedback {...formItemLayout}>

          {getFieldDecorator('versionName', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}

        </FormItem>

        <FormItem label="MD5值" hasFeedback {...formItemLayout}>
          {getFieldDecorator('md5', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="版本说明" hasFeedback {...formItemLayout}>
          {getFieldDecorator('changeLog', {
            rules: [
              {
                required: true,
              },
            ],
          })(<TextArea rows={4} />)}
        </FormItem>


        <FormItem label="版本号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('versionCode', {
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(<InputNumber min={1} />)}
        </FormItem>


        <FormItem label="是否强制更新" hasFeedback {...formItemLayout}>
          {getFieldDecorator('force', {
            initialValue: false,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Radio.Group   >
              <Radio value={true} > 是 </Radio>
              <Radio value={false} > 否 </Radio>
            </Radio.Group>
            )}
        </FormItem>


        <FormItem hasFeedback {...formItemLayout}>
          <span className={styles.errorMessage} > { modalProps.errorMessage } </span>
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
