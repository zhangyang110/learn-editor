import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, DatePicker, Row, Col, Icon, Tooltip } from 'antd'
import city from '../../utils/city'
import moment from 'moment';
import styles from './index.less'
import { config } from 'utils'

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
  deleteClick,
  addImage,
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
      data.poster = item.poster;
      data.created = item.created;
      data.updated = item.updated;
      data.version = item.version;
      data.download_url = item.download_url;
      data.update_time = item.update_time;

      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const dateFormat = 'YYYY-MM-DD';
  const { TextArea } = Input;
  const divs = [];

  /**
   * 切分所有截图url 进行展示
   * @param {*} screenshot 
   */
  function spliteSort(screenshot) {
    const shotImg = screenshot.split('|');

    for (let index = 0; index < shotImg.length; index++) {
      const url = shotImg[index];

      divs.push(
        <div style={{display:'inline-block'  }} >
          <img src={`${config.resPrefix}/${url}`} className={styles.screenshot} />
          <Icon type="minus-square-o" className={styles.gameIconDel} onClick={e => deleteClick(e.target, url)} />
          </div>
      )
    }
    return divs;
  }

  const options = [
    {
      value: "格斗冒险",
      label: "格斗冒险",
    },
    {
      value: "射击飞行",
      label: "射击飞行",
    },
    {
      value: "角色扮演",
      label: "角色扮演",
    },
    {
      value: "棋牌益智",
      label: "棋牌益智",
    },
    {
      value: "休闲益智",
      label: "休闲益智",
    },
  ];


  return (
    <Modal {...modalOpts}  >
      <Form layout="horizontal"   >
        {console.log(item.screenshot)}
        {console.log('divs length: ' + divs.length)}


        <Row >
          <Col span={10} key={1}    >
            <FormItem label="包名" hasFeedback {...formItemLayout}   >
              {getFieldDecorator('package_name', {
                initialValue: item.package_name,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input disabled="false" />)}
            </FormItem>
          </Col>


          <Col span={10} key={2}    >
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
            <FormItem label="类型" hasFeedback {...formItemLayout}>
              {getFieldDecorator('type', {
                initialValue: item.type,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                // defaultValue={[item.type]}  defaultValue={["射击飞行"]}
                // <Cascader   options={options}  placeholder='请选择' />
                <Radio.Group >
                <Radio value="格斗冒险" > 格斗冒险 </Radio>
                <Radio value="射击飞行" > 射击飞行 </Radio>
                <Radio value="角色扮演" > 角色扮演 </Radio>
                <Radio value="棋牌益智" > 棋牌益智 </Radio>
                <Radio value="休闲益智" > 休闲益智 </Radio>
                <Radio value="动作冒险" > 动作冒险 </Radio>
              </Radio.Group>

                )}
            </FormItem>
          </Col>


          <Col span={10} key={6}    >
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


          <Col span={10} key={7}    >
            <FormItem label="开发者" hasFeedback {...formItemLayout}>
              {getFieldDecorator('developer', {
                initialValue: item.developer,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>


          <Col span={10} key={8}    >
            <FormItem label="交互方式" hasFeedback {...formItemLayout}>
              {getFieldDecorator('interaction_type', {
                initialValue: item.interaction_type,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Radio.Group >
                  <Radio value="遥控器" > 遥控器 </Radio>
                  <Radio value="游戏手柄" > 游戏手柄 </Radio>
                </Radio.Group>
                )}
            </FormItem>
          </Col>


          <Col span={10} key={9}    >
            <FormItem label="评分" hasFeedback {...formItemLayout}>
              {getFieldDecorator('score', {
                initialValue: item.score,
                rules: [
                  {
                    required: true,
                    type: 'number',
                  },
                ],
              })(<InputNumber min={0} max={10} />)}
            </FormItem>
          </Col>

          <Col span={10} key={10}    >
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


        </Row>

        {/*   设置背景 和 设置封面 */}
        <Row >

          <Col span={10} key={21}    >
            <FormItem label="图标" hasFeedback {...formItemLayout} >
              {getFieldDecorator('icon', {
                initialValue: item.icon,
                rules: [{
                  required: false,
                }],
              })
                (
                <div>
                  <Tooltip placement="topLeft" title={item.icon == undefined ? '添加' : '修改'} arrowPointAtCenter='true' >
                  <img src={`${config.resPrefix}/${item.icon}`} className={styles.icon} onClick={e => addImage('icon')} />
                  </Tooltip >
                </div>
                )}
            </FormItem>
          </Col>


          <Col span={10} key={22}    >
            <FormItem label="背景" hasFeedback {...formItemLayout} >
              {getFieldDecorator('background', {
                initialValue: item.background,
                rules: [{
                  required: false,
                }],
              })
                (
                <div>
                  <Tooltip placement="topLeft" title={item.background == undefined ? '添加' : '修改'} arrowPointAtCenter='true' >
                  <img src={`${config.resPrefix}/${item.background}`} className={styles.background} onClick={e => addImage('background')} />
                  </Tooltip >
                </div>
                )}
            </FormItem>
          </Col>

        </Row>

        <FormItem label="游戏截图" hasFeedback {...formItemLayout} style={{ marginLeft: -150, }} >
          {getFieldDecorator('screenshot', {
            initialValue: item.screenshot == null ? null : item.screenshot,
            rules: [{
              required: false,
            }],
          })
            (
            <div style={{ width: 800, }} >
              <Icon type="plus-square-o" className={styles.gameEdit} onClick={e => addImage('screenshot')} /> <br />
              <div>
                {
                  item.screenshot != null && spliteSort(item.screenshot)
                }

              </div>

            </div>
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
