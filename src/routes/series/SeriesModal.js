import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, DatePicker, Row, Col, Icon, Tooltip,Button } from 'antd'
import city from '../../utils/city'
import moment from 'moment';
import styles from './index.less'
import { config } from 'utils'
import JumpModal from "./JumpModal";
import {connect} from 'dva'


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
  series,
  item = {},
  onOk,
  addImage,
  loading,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const {jumpModalVisible} = series;
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }

      data.start_time = data.start_time.format(dateFormat);
      data.end_time = data.end_time.format(dateFormat);
      data.images = item.images;

      data.created = item.created;
      data.updated = item.updated;
      data.status=parseInt(data.status);
      console.log(data)
      // data.series_id = item.series_id;


      onOk(data)
    })
  }

  const setJump = () => {
    dispatch({type: 'series/public', payload: {jumpModalVisible: true}})
  };

  const setInputVal = (id,name) => {
    setFieldsValue({category_id: id})
    setFieldsValue({category_name: name})
  };
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const jumpModalProps = {
    loading,
    setInputVal: setInputVal,
    dispatch,
    series,
    visible: jumpModalVisible,
    title: "选择分类",
    item: {},
    onCancel: () => {
      dispatch({type: 'series/public', payload: {jumpModalVisible: false}})
    },
    onOk: () => {
      dispatch({type: 'series/public', payload: {jumpModalVisible: false}})
    },
    maskClosable: false,
  };

  const dateFormat = 'YYYY-MM-DD';
  const { TextArea } = Input;

  return (
    <Modal {...modalOpts}>
{
      <Form layout="horizontal">


        <Row >


          <Col span={10} key={1}   >
            <FormItem label="名称" hasFeedback {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>

          <Col span={10} key={2}    >
            <FormItem label="演员" hasFeedback {...formItemLayout}>
              {getFieldDecorator('actor', {
                initialValue: item.actor,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>

          </Col>

          <Col span={10} key={3}    >
            <FormItem label="关键字" hasFeedback {...formItemLayout}>
              {getFieldDecorator('keyword', {
                initialValue: item.keyword,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>

          </Col>

          <Col span={10} key={4}    >
            <FormItem label="语言" hasFeedback {...formItemLayout}>
              {getFieldDecorator('language', {
                initialValue: item.language  == undefined ? '中文' : item.language,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>

          <Col span={10} key={5}    >
            <FormItem label="字幕语言" hasFeedback {...formItemLayout}>
              {getFieldDecorator('subtitle', {
                initialValue: item.subtitle == undefined ? '中文' : item.subtitle,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>


          <Col span={10} key={6}    >
            <FormItem label="地区" hasFeedback {...formItemLayout}>
              {getFieldDecorator('origin', {
                initialValue: item.origin,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>


          <Col span={10} key={7}    >
            <FormItem label="年份" hasFeedback {...formItemLayout}>
              {getFieldDecorator('year', {
                initialValue: item.year,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>


          <Col span={10} key={8}    >
            <FormItem label="评论" hasFeedback {...formItemLayout}>
              {getFieldDecorator('comment', {
                initialValue: item.comment,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>

          <Col span={10} key={9}    >
            <FormItem label="导演" hasFeedback {...formItemLayout}>
              {getFieldDecorator('director', {
                initialValue: item.director,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>

          <Col span={10} key={10}    >
            <FormItem label="供应商" hasFeedback {...formItemLayout}>
              {getFieldDecorator('provider', {
                initialValue: item.provider,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>

          </Col>

          <Col span={10} key={12}    >
            <FormItem label="标签" help="多个标签时 以:号分割 必须为英文符号"   hasFeedback {...formItemLayout}>
              {getFieldDecorator('tag', {
                initialValue: item.tag,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <TextArea rows={2} />
                  )}
            </FormItem>
          </Col>

          <Col span={10} key={13}    >
            <FormItem label="集数" hasFeedback {...formItemLayout}>
              {getFieldDecorator('episodes', {
                initialValue: item.episodes,
                rules: [
                  {
                    required: true,
                    type: 'number',
                  },
                ],
              })(<InputNumber min={1} />)}
            </FormItem>
          </Col>

          <Col span={10} key={14}    >
            <FormItem label="价格" hasFeedback {...formItemLayout}>
              {getFieldDecorator('price', {
                initialValue: item.price,
                rules: [
                  {
                    required: true,
                    type: 'number',
                  },
                ],
              })(<InputNumber min={0} />)}
            </FormItem>
          </Col>


          <Col span={10} key={15}    >
            <FormItem label="评分" hasFeedback {...formItemLayout}>
              {getFieldDecorator('score', {
                initialValue: item.score,
                rules: [
                  {
                    required: true,
                    type: 'number',
                  },
                ],
              })(<InputNumber min={18} />)}
            </FormItem>
          </Col>

          <Col span={12} key={16}    >
            <FormItem label="频道" hasFeedback {...formItemLayout}>
              {getFieldDecorator('channel', {
                initialValue: item.channel == '' ? '少儿' : item.channel,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Radio.Group    >
                  <Radio value="少儿" > 少儿 </Radio>
                  <Radio value="教育" > 教育 </Radio>
                  <Radio value="游戏" > 游戏 </Radio>
                </Radio.Group>
                )}
            </FormItem>
          </Col>

          <Col span={10} key={17}    >
            <FormItem label="样式" hasFeedback {...formItemLayout}>
              {getFieldDecorator('style', {
                initialValue: item.style == '' ? '0' : item.style,        //   item.style != undefined ? item.style : 0,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Radio.Group     >
                  <Radio value="0" > 数字 </Radio>
                  <Radio value="1" > 图片 </Radio>
                </Radio.Group >
                )}
            </FormItem>
          </Col>

          <Col span={12} key={18}    >
            <FormItem label="类型" hasFeedback {...formItemLayout}>
              {getFieldDecorator('type', {
                initialValue: item.type == '' ? '正片':item.type,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Radio.Group     >
                  <Radio value="正片" > 正片 </Radio>
                  <Radio value="预告" > 预告 </Radio>
                  <Radio value="花絮" > 花絮 </Radio>
                </Radio.Group>
                )}
            </FormItem>
          </Col>

          <Col span={10} key={19}    >
            <FormItem label="上架日期" hasFeedback {...formItemLayout} >
              {getFieldDecorator('start_time', {
                initialValue: item.start_time && moment(item.start_time, dateFormat),
                rules: [{
                  type: 'object',
                  required: true,
                }],
              })(
                <DatePicker format={dateFormat} />
                )}

            </FormItem>
          </Col>

          <Col span={10} key={20}    >
            <FormItem label="下架日期" hasFeedback {...formItemLayout} >
              {getFieldDecorator('end_time', {
                initialValue: item.end_time && moment(item.end_time, dateFormat),
                rules: [{
                  type: 'object',
                  required: true,
                }],
              })
                (
                <DatePicker format={dateFormat} />
                )}
            </FormItem>
          </Col>

          <Col span={10} key={21}    >
            <FormItem label="简介" hasFeedback {...formItemLayout}>
              {getFieldDecorator('summary', {
                initialValue: item.summary,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<TextArea rows={4} />)}
            </FormItem>
          </Col>

          <Col span={10} >
            <FormItem label="首字母" hasFeedback {...formItemLayout}>
              {getFieldDecorator('first_letter', {
                initialValue: item.first_letter,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem label="状态" hasFeedback {...formItemLayout}>
              {getFieldDecorator('status', {
                initialValue: item.status != undefined ? item.status+"":'0',        //   item.style != undefined ? item.style : 0,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Radio.Group     >
                  <Radio value="0" > 上架 </Radio>
                  <Radio value="1" > 下架 </Radio>
                </Radio.Group >
                )}
            </FormItem>
          </Col>

            <Col span={8}>
            <FormItem label="分类id"
                    hasFeedback {...formItemLayout}>
            {getFieldDecorator('category_id', {
              initialValue: item.category_id,
              rules: [
                {
                  required: false,
                  type: 'number',
                },
              ],
            })(<InputNumber disabled={true}/>)}
          </FormItem>
            </Col>

            <Col span={10}>
            <FormItem label="分类名称"
                    hasFeedback {...formItemLayout}>
            {getFieldDecorator('category_name', {
              initialValue: item.category_name,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input disabled={true}/>)}
          </FormItem>
            </Col>
            <Col span={6}>
            <FormItem>
              <Button type="dashed" onClick={setJump} size="default">选择分类</Button>
            </FormItem>

            </Col>
            

        </Row>

        {/*   设置背景 和 设置封面 */}
        <Row >

          <Col span={10} key={21}    >
            <FormItem label="封面" hasFeedback {...formItemLayout} >
              {getFieldDecorator('cover_url', {
                initialValue: item.cover_url,
                rules: [{
                  required: false,
                }],
              })
                (
                <div>
                  <Tooltip placement="topLeft" title={item.cover_url == undefined ? '添加' : '修改'} arrowPointAtCenter='true' >
                    <img src={`${config.resPrefix}/${item.cover_url}`} className={styles.cover} onClick={e => addImage('cover')} />
                  </Tooltip >
                </div>
                )}
            </FormItem>
          </Col>


          <Col span={10} key={22}    >
            <FormItem label="背景" hasFeedback {...formItemLayout} >
              {getFieldDecorator('background_url', {
                initialValue: item.background_url,
                rules: [{
                  required: false,
                }],
              })
                (
                <div>
                  <Tooltip placement="topLeft" title={item.background_url == undefined ? '添加' : '修改'} arrowPointAtCenter='true' >
                    <img src={`${config.resPrefix}/${item.background_url}`} className={styles.background} onClick={e => addImage('background')} />
                  </Tooltip >
                </div>
                )}
            </FormItem>
          </Col>

        </Row>



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


export default connect(({series, dispatch, loading}) => ({
  series,
  dispatch,
  loading
}))(Form.create()(modal))
