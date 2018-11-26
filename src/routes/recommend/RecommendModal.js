import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal,Select, Row,Col,Cascader, Upload, Button, Icon, message,Tooltip } from 'antd'
import city from '../../utils/city'
import moment from 'moment';
import styles from './RecommendModal.less'
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
  recommend,
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
  const {jumpModalVisible,appTemp} = recommend;
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
    dispatch({type: 'recommend/public', payload: {jumpModalVisible: true,appTemp:data.app}})
  };

  const setInputVal = (type, object_id,object_name) => {
    setFieldsValue({type: type})
    setFieldsValue({object_id: object_id})
    setFieldsValue({object_name: object_name})
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const jumpModalProps = {
    loading,
    setInputVal: setInputVal,
    dispatch,
    recommend,
    visible: jumpModalVisible,
    title: "选择内容",
    app:appTemp,
    item: {},
    onCancel: () => {
      dispatch({type: 'recommend/public', payload: {jumpModalVisible: false,jumpData:[]}})
    },
    onOk: () => {
      dispatch({type: 'recommend/public', payload: {jumpModalVisible: false,jumpData:[]}})
    },
    maskClosable: false,
  };

  const addCoverImg = () => {
    dispatch({type: 'recommend/public', payload: {searchType: 'searchCoverImg',searchModalVisible: true,}})
  };

  const { TextArea } = Input;

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

        <FormItem label="频道名称" hasFeedback {...formItemLayout}>
        {getFieldDecorator('name', {
           rules: [
            {
              required: true,
            },
          ],
          initialValue: item.name != undefined ? item.name:'推荐',
        })(
          <Select style={{width: 150}}>
          <Select.Option value="推荐">推荐</Select.Option>
          <Select.Option value="动画屋">动画屋</Select.Option>
          <Select.Option value="精选">精选</Select.Option>
          <Select.Option value="婴幼">婴幼</Select.Option>
          <Select.Option value="小学">小学</Select.Option>
          <Select.Option value="初中">初中</Select.Option>
          <Select.Option value="高中">高中</Select.Option>
          <Select.Option value="兴趣">兴趣</Select.Option>
        </Select>)}
        </FormItem>

        <Row>
            <Col span={20}>
            <FormItem label="类型"
                    labelCol={{span: 7}}
                    wrapperCol={{span: 17}}>
            {getFieldDecorator('type', {
              initialValue: item.type,
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
              <Button type="dashed" onClick={setJump} size="default">选择内容</Button>
            </FormItem>
          </Row>

          <FormItem label="内容Id"
                    {...formItemLayout}>
            {getFieldDecorator('object_id', {
              initialValue: item.object_id,
              rules: [
                {
                  required: true,
                  type: 'number',
                },
              ],
            })(<InputNumber disabled={true}/>)}
          </FormItem>

         <FormItem label="内容名称"
                       {...formItemLayout}>
                {getFieldDecorator('object_name', {
                  initialValue: item.object_name,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input disabled={true}/>)}
              </FormItem>

<FormItem label="位置" hasFeedback {...formItemLayout}>
              {getFieldDecorator('position', {
                initialValue: item.position,
                rules: [
                  {
                    required: true,
                    type: 'number',
                  },
                ],
              })(<InputNumber min={1} />)}
            </FormItem>

          <FormItem
            {...formItemLayout}
            label="封面"
          >{getFieldDecorator('cover_url',{
            initialValue: item.cover_url,
            rules: [{
              required: false,
            }],
          })(
            <Tooltip placement="right" title='点击修改图片'>
              <div onClick={addCoverImg}
                   className={styles.frame}>
                <img
                  src={item.cover_url ? `${config.resPrefix}/${item.cover_url}` : ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: item.cover_url ? 'block' : 'none'
                  }}/>
                {item.cover_url ? '' : '点我添加图片'}
              </div>
            </Tooltip>
          )}

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

export default connect(({recommend, dispatch, loading}) => ({
  recommend,
  dispatch,
  loading
}))(Form.create()(modal))
