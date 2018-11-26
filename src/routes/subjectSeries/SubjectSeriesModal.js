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
  subjectSeries,
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
  const {jumpModalVisible} = subjectSeries;
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
      dispatch({type: 'subjectSeries/public', payload: {jumpModalVisible: true}})
  };

  const setInputVal = (id,name,cover_url) => {
    setFieldsValue({series_id: id})
    setFieldsValue({name: name})
    setFieldsValue({cover_url: cover_url})
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const jumpModalProps = {
    loading,
    setInputVal: setInputVal,
    dispatch,
    subjectSeries,
    visible: jumpModalVisible,
    title: "选择剧集",
    item: {},
    onCancel: () => {
      dispatch({type: 'subjectSeries/public', payload: {jumpModalVisible: false,jumpData:[]}})
    },
    onOk: () => {
      dispatch({type: 'subjectSeries/public', payload: {jumpModalVisible: false,jumpData:[]}})
    },
    maskClosable: false,
  };

  const addCoverImg = () => {
    dispatch({type: 'subjectSeries/public', payload: {searchType: 'searchCoverImg',searchModalVisible: true,}})
  };

  return (

    <Modal {...modalOpts}>
{
      <Form layout="horizontal">

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

          <FormItem
            {...formItemLayout}
            label="封面"
          >{getFieldDecorator('cover_url',{
            initialValue: item.cover_url,
            rules: [{
              required: true,
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

export default connect(({subjectSeries, dispatch, loading}) => ({
  subjectSeries,
  dispatch,
  loading
}))(Form.create()(modal))
