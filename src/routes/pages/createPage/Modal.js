import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, InputNumber, Radio, Modal, Select, Row, Col, Button, Tooltip, Popover} from 'antd'
import {config} from 'utils'
import JumpModal from "./JumpModal";
import styles from './Modal.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const modal = ({
                 dispatch,
                 createPage,
                 item = {},
                 onOk,
                 loading,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                   setFieldsValue,
                 },
                 ...modalProps,
               }) => {

  const {changeTem, coverImgUrl, routeName,initPage, jumpModalVisible, modalType, activeCoverImgUrl, specialCoverImgUrl, temIndex, cellIndex} = createPage;
  const setInputVal = (jumpUrl, showUrl) => {
    setFieldsValue({route: jumpUrl})
    setFieldsValue({showUrl: showUrl})
  };
  const jumpModalProps = {
    loading,
    setInputVal,
    dispatch,
    createPage,
    visible: jumpModalVisible,
    title: "设置跳转路由",
    item: {},
    onCancel: () => {
      // dispatch({type: 'createPage/hideJumpModal', payload: {jumpModalVisible: false}})
      dispatch({type: 'createPage/public', payload: {jumpModalVisible: false}})

    },
    onOk: () => {
      // dispatch({type: 'createPage/hideJumpModal', payload: {jumpModalVisible: false}})
      dispatch({type: 'createPage/public', payload: {jumpModalVisible: false}})

    },
    maskClosable: false,
  };
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      };
      if (modalType == 'updateMessage') {
        item.activeBox = data.activeBox;
        item.cover = coverImgUrl !== '' ? coverImgUrl : item.cover;
        item.activeCover = activeCoverImgUrl !== '' ? activeCoverImgUrl : item.activeCover;
        item.route = data.route;
        item.name = data.name;
        item.specialIcon.cover = specialCoverImgUrl !== '' ? specialCoverImgUrl : item.specialIcon.cover;
        item.specialIcon.h = data.h;
        item.specialIcon.w = data.w;
        item.specialIcon.x = data.x;
        item.specialIcon.y = data.y;
        // dispatch({type: 'createPage/hideModal'});
        // dispatch({type: 'createPage/clearUrl'});
        dispatch({
          type: 'createPage/public',
          payload: {modalType: '', modalVisible: false, coverImgUrl: '', activeCoverImgUrl: '', specialCoverImgUrl: ''}
        })
      }
      else if (modalType === 'editCurrentTem') {
        const checkedTemps = initPage.content.sectionList;
        const tochangItem = checkedTemps[changeTem.index];
        tochangItem.title = data.title,
          tochangItem.disable = data.disable,
          tochangItem.offset = data.offset,
          tochangItem.contentFont.color = data.contentFontColor,
          tochangItem.contentFont.font = data.contentFont,
          tochangItem.contentFont.fontSize = data.contentFontSize,
          tochangItem.titleFont.color = data.titleFontColor,
          tochangItem.titleFont.font = data.titleFont,
          tochangItem.titleFont.fontSize = data.titleFontSize,
          dispatch({type: 'createPage/public', payload: {modalVisible: false, initPage}})
      }
    })
  };
  const delUpCoverImg = (e, item) => {
    const currentItem = initPage.content.sectionList[temIndex].contentList[cellIndex];
    currentItem.specialIcon.cover = '';
    dispatch({type: 'createPage/public', payload: {specialCoverImgUrl: '', initPage}})
  };
  const PopoverContent = (
    <Button type='danger' icon={'delete'} onClick={e => {
      delUpCoverImg(e, item)
    }}></Button>
  );
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
    onCancel: () => {
      if (modalType === 'editCurrentTem') {
        dispatch({type: 'createPage/public', payload: {modalVisible: false, modalType: ''}})
      } else if (modalType === 'updateMessage') {
        dispatch({
          type: 'createPage/public',
          payload: {modalType: '', modalVisible: false, coverImgUrl: '', activeCoverImgUrl: '', specialCoverImgUrl: ''}
        })
      }

    }
  };


  const addCoverImg = () => {
    dispatch({type: 'createPage/public', payload: {searchType: 'searchCoverImg', searchModalVisible: true,}})
  };
  const addActiveCoverImg = () => {
    dispatch({type: 'createPage/public', payload: {searchType: 'searchActiveCoverImg', searchModalVisible: true,}})

  };
  const specialIconCoverImg = () => {
    dispatch({type: 'createPage/public', payload: {searchType: 'searchSpecialCoverImg', searchModalVisible: true,}})

  };
  const setJump = () => {
    dispatch({type: 'createPage/public', payload: {jumpModalVisible: true}})
  };

  return (
    <Modal {...modalOpts} maskClosable={false}>
      {modalType === 'updateMessage' ? <Form layout="horizontal" hideRequiredMark>
          <FormItem label="磁贴名称"  {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
            })(<Input/>)}
          </FormItem>


          <FormItem label="跳转目标"
                    {...formItemLayout}>
            {getFieldDecorator('route', {
              initialValue: item.route,
              rules: [
                {
                  required: true,
                  type: 'string',
                },
              ],
            })(<Input disabled={true}/>)}
          </FormItem>
          <Row>
            <Col span={20}>
              <FormItem label="路由别名"
                        labelCol={{span: 7}}
                        wrapperCol={{span: 17}}>
                {getFieldDecorator('showUrl', {
                  initialValue: routeName,
                })(<Input disabled={true}/>)}
              </FormItem>
            </Col>
            <FormItem>
              <Button type="dashed" onClick={setJump} size="default">设置跳转</Button>
            </FormItem>
          </Row>


          <FormItem
            {...formItemLayout}
            label="封面"
            hasFeedback
          >{getFieldDecorator('cover')(
            <Tooltip placement="right" title='点击修改图片'>
              <div onClick={addCoverImg}
                   className={styles.frame}>
                <img
                  src={coverImgUrl !== '' ? `${config.resPrefix}/${coverImgUrl}` : `${config.resPrefix}/${item.cover}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: coverImgUrl || item.cover ? 'block' : 'none'
                  }}/>
                {coverImgUrl || (item.cover) ? '' : '点我添加图片'}
              </div>
            </Tooltip>
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="选中封面"
            hasFeedback
          >{getFieldDecorator('activeCover',)(
            <Tooltip placement="right" title='点击修改图片'>
              <div onClick={addActiveCoverImg}
                   className={styles.frame}>
                <img
                  src={activeCoverImgUrl !== '' ? `${config.resPrefix}/${activeCoverImgUrl}` : `${config.resPrefix}/${item.activeCover}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: activeCoverImgUrl || item.activeCover ? 'block' : 'none'
                  }}/>
                {activeCoverImgUrl || (item.activeCover) ? '' : '点我添加图片'}
              </div>
            </Tooltip>
          )}
          </FormItem>
          <FormItem
            label="显示选中框"
            {...formItemLayout}>
            {getFieldDecorator('activeBox', {initialValue: item.activeBox == undefined ? true : item.activeBox}
            )(<RadioGroup>
              <Radio value={true}>显示</Radio>
              <Radio value={false}>不显示</Radio>
            </RadioGroup>)}
          </FormItem>
          {
            item.tid == '2' ?
              <div>
                <FormItem
                  {...formItemLayout}
                  label="顶层图片"
                  hasFeedback
                >{getFieldDecorator('specialIconCover')(
                  <Popover placement="right" content={PopoverContent}>
                    <div onClick={specialIconCoverImg}
                         className={styles.frame}>
                      <img
                        src={specialCoverImgUrl ? `${config.resPrefix}/${specialCoverImgUrl}` : item.specialIcon ? `${config.resPrefix}/${item.specialIcon.cover}` : ''}
                        style={{
                          width: '100%',
                          height: '100%',
                          display: specialCoverImgUrl || item.specialIcon.cover ? 'block' : 'none'
                        }}/>
                      {specialCoverImgUrl || (item.specialIcon.cover) ? '' : '点我添加图片'}
                    </div>
                  </Popover>
                )}
                </FormItem>
                <Row type="flex" justify="center">
                  <Col span={12}>
                    <FormItem
                      labelCol={{span: 12}}
                      wrapperCol={{span: 8}}
                      label="X轴方向">
                      {getFieldDecorator('x', {initialValue: item.specialIcon ? `${item.specialIcon.x}` : '10'}
                      )(<InputNumber autoFocus={true} addonBefore="X方向"/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      labelCol={{span: 12}}
                      wrapperCol={{span: 8}}
                      label="Y轴方向">
                      {getFieldDecorator('y', {initialValue: item.specialIcon ? `${item.specialIcon.y}` : '10'}
                      )(<InputNumber/>)}
                    </FormItem>
                  </Col>
                </Row>
                <Row type="flex" justify="center">
                  <Col span={12}>
                    <FormItem
                      label="图片宽度"
                      labelCol={{span: 12}}
                      wrapperCol={{span: 8}}>
                      {getFieldDecorator('w', {initialValue: item.specialIcon ? `${item.specialIcon.w}` : '100'}
                      )(<InputNumber/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="图片高度"
                      labelCol={{span: 12}}
                      wrapperCol={{span: 8}}>
                      {getFieldDecorator('h', {initialValue: item.specialIcon ? `${item.specialIcon.h}` : '100'}
                      )(<InputNumber/>)}
                    </FormItem>
                  </Col>
                </Row>
              </div> : ''
          }
        </Form>
        /*判断ModalType的类型进行不同的渲染  为editCurrentTem 时渲染如下******************************************************** */
        :
        <Form>
          <FormItem label="专栏名称"  {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: item.title ? item.title : '',
            })(<Input placeholder="专栏名称"/>)}
          </FormItem>
          <FormItem label="专栏顶部间距"  {...formItemLayout}>
            {getFieldDecorator('offset', {
              initialValue: item.offset ? item.offset : 30,
              rules: [
                {
                  required: true,
                },
              ],
            })(<InputNumber min={30} placeholder="请输入期望的间距值" style={{width: 285}}/>)}
          </FormItem>
          <FormItem
            label="专栏能否选中"
            {...formItemLayout}>
            {getFieldDecorator('disable', {initialValue: item.disable}
            )(<RadioGroup>
              <Radio value={true}>能选中</Radio>
              <Radio value={false}>不能选中</Radio>
            </RadioGroup>)}
          </FormItem>
          <FormItem
            label="标题字体"
            {...formItemLayout}>
            {getFieldDecorator('titleFont', {initialValue: item.titleFont ? item.titleFont.font : '微软雅黑'}
            )(<Select>
                <Select.Option value="AZMRZT">安卓默认字体</Select.Option>
                <Select.Option value="FZZBHJT">方正毡笔黑简体</Select.Option>
                <Select.Option value="FZPTY">方正胖头鱼</Select.Option>
                <Select.Option value="FZSK">方正尚酷</Select.Option>
                <Select.Option value="FZCHY">方正粗活意</Select.Option>
                <Select.Option value="WRYH">微软雅黑</Select.Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            label="标题字体大小"
            {...formItemLayout}
          >
            {getFieldDecorator('titleFontSize', {initialValue: item.titleFont ? item.titleFont.fontSize : '60'}
            )(
              <Input/>
            )}
          </FormItem>
          <FormItem
            label="标题字体颜色"
            {...formItemLayout}
          >
            {getFieldDecorator('titleFontColor', {initialValue: item.titleFont ? item.titleFont.color : '#FFFFFF'}
            )(
              <Input/>
            )}
          </FormItem>

          <FormItem
            label="内容字体"
            {...formItemLayout}
          >
            {getFieldDecorator('contentFont', {initialValue: item.contentFont ? item.contentFont.font : 'WRYH'}
            )(<Select>
                <Select.Option value="AZMRZT">安卓默认字体</Select.Option>
                <Select.Option value="FZZBHJT">方正毡笔黑简体</Select.Option>
                <Select.Option value="FZPTY">方正胖头鱼</Select.Option>
                <Select.Option value="FZSK">方正尚酷</Select.Option>
                <Select.Option value="FZCHY">方正粗活意</Select.Option>
                <Select.Option value="WRYH">微软雅黑</Select.Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            label="内容字体大小"
            {...formItemLayout}
          >
            {getFieldDecorator('contentFontSize', {initialValue: item.contentFont ? item.contentFont.fontSize : '40'}
            )(
              <Input/>
            )}
          </FormItem>
          <FormItem
            label="内容字体颜色"
            {...formItemLayout}
          >
            {getFieldDecorator('contentFontColor', {initialValue: item.contentFont ? item.contentFont.color : '#FFFFFF'}
            )(
              <Input/>
            )}
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

export default Form.create()(modal)
