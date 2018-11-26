import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, InputNumber, Radio, Modal, Select, Popover, Row, Col, Button, Tooltip} from 'antd'
import {config} from 'utils'
import {connect} from 'dva'
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
                 updatePage,
                 item = {},
                 onOk,
                 loading,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                   setFieldsValue,
                   setFieldValue
                 },
                 ...modalProps
               }) => {
  const {modalType, temps, modalVisible, routeName, jumpModalVisible, currentPage, cellIndex, tempIndex, coverImgUrl, currentCell, activeCoverImgUrl, specialCoverImgUrl} = updatePage;
  const setJump = () => {
    dispatch({type: 'updatePage/public', payload: {jumpModalVisible: true,}})
  }
  const setInputVal = (jumpUrl, showUrl) => {
    setFieldsValue({route: jumpUrl})
    setFieldsValue({showUrl: showUrl})

  };
  const delUpCoverImg = (e, item) => {
    const currentItem = currentPage.content.sectionList[tempIndex].contentList[cellIndex];
    currentItem.specialIcon.cover = '';
    dispatch({type: 'updatePage/public', payload: {specialCoverImgUrl: '',currentPage}})
  }
  const PopoverContent = (
    <Button type='danger' icon={'delete'} onClick={e => {
      delUpCoverImg(e, item)
    }}></Button>
  )
  const jumpModalProps = {
    loading,
    setInputVal: setInputVal,
    dispatch,
    updatePage,
    visible: jumpModalVisible,
    title: "设置跳转路由",
    item: {},
    onCancel: () => {
      dispatch({type: 'updatePage/public', payload: {jumpModalVisible: false}})
    },
    onOk: () => {
      dispatch({type: 'updatePage/public', payload: {jumpModalVisible: false}})
    },
    maskClosable: false,
  };
  const addCoverImg = () => {
    dispatch({type: 'updatePage/public', payload: {searchType: 'searchCoverImg',searchModalVisible: true,}})
  };
  const tid = (temps) => {

    const temId = currentPage.content.sectionList[tempIndex].tid;
    const tem = temps.filter(item => {
      return item.id == temId
    });
    const clickCellTid = tem[0].content.cellList[cellIndex].tid;
    return clickCellTid
  }
  const addActiveCoverImg = () => {
    dispatch({type: 'updatePage/public', payload: {searchType: 'searchActiveCoverImg',searchModalVisible: true,}})
  };
  const specialIconCoverImg = () => {
    dispatch({type: 'updatePage/public', payload: {searchType: 'searchSpecialCoverImg',searchModalVisible: true,}})
  };
  const handleOk = () => {
    if (modalType === 'editCurrentTem') {
      const data = {...getFieldsValue()}
      const currentTem = currentPage.content.sectionList[tempIndex]
      currentTem.contentFont = {
        color: data.contentFontColor,
        font: data.contentFont,
        fontSize: data.contentFontSize
      };

      currentTem.titleFont = {
        color: data.titleFontColor,
        font: data.titleFont,
        fontSize: data.titleFontSize
      };
      currentTem.offset = data.offset;
      currentTem.disable = data.disable;
      currentTem.title = data.title;
      dispatch({type: 'updatePage/public', payload: {currentPage,modalVisible: false,},})
    } else if (modalType === 'editCell') {
      const data = {...getFieldsValue()};
      const contentList = currentPage.content.sectionList[tempIndex].contentList;
      const cellIndex = contentList.indexOf(currentCell);
      currentPage.content.sectionList[tempIndex].contentList[cellIndex] = {
        ... currentPage.content.sectionList[tempIndex].contentList[cellIndex],
        activeBox: data.activeBox,
        activeCover: activeCoverImgUrl ? activeCoverImgUrl : currentCell.activeCover ? currentCell.activeCover : '',
        cover: coverImgUrl ? coverImgUrl : currentCell.cover ? currentCell.cover : '',
        name: data.name,
        route: data.route,
        specialIcon: {
          cover: specialCoverImgUrl ? specialCoverImgUrl : currentCell.specialIcon && currentCell.specialIcon.cover ? currentCell.specialIcon.cover : '',
          h: data.h,
          w: data.w,
          x: data.x,
          y: data.y,
        }
      };
      dispatch({type: 'updatePage/public',payload:{currentPage,modalVisible: false,coverImgUrl: '', activeCoverImgUrl: '', specialCoverImgUrl: ''}})
    }
  };
  const onCancel = () => {
    // dispatch({type: 'updatePage/clearImgUrl'})
    dispatch({type: 'updatePage/public',payload:{ modalVisible: false,coverImgUrl: '', activeCoverImgUrl: '', specialCoverImgUrl: ''}})
  };
  return (
    modalVisible && <Modal maskClosable={false} {...modalProps} onCancel={onCancel} onOk={handleOk}>
      {modalType == 'editCell' ? <Form layout="horizontal" hideRequiredMark>

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
              <FormItem
                label="路由别名"
                labelCol={{span: 7}}
                wrapperCol={{span:17}}>
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
          >{getFieldDecorator('cover',)(
            <Tooltip placement="right" title='点击修改图片'>
              <div onClick={addCoverImg}
                   className={styles.frame}>
                <img
                  src={coverImgUrl ? `${config.resPrefix}/${coverImgUrl}` : currentCell.cover ? `${config.resPrefix}/${currentCell.cover}` : ''}
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
          >{getFieldDecorator('activeCover',)(
            <Tooltip placement="right" title='点击修改图片'>
              <div onClick={addActiveCoverImg}
                   className={styles.frame}>
                <img
                  src={activeCoverImgUrl ? `${config.resPrefix}/${activeCoverImgUrl}` : currentCell.activeCover ? `${config.resPrefix}/${currentCell.activeCover}` : ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: activeCoverImgUrl || currentCell.activeCover ? 'block' : 'none'
                  }}/>
                {activeCoverImgUrl || currentCell.activeCover ? '' : '点我添加图片'}
              </div>
            </Tooltip>
          )}
          </FormItem>
          <FormItem
            label="显示选中框"
            {...formItemLayout}
          >
            {getFieldDecorator('activeBox', {initialValue: item.activeBox == undefined ? true : item.activeBox}
            )(<RadioGroup>
              <Radio value={true}>显示</Radio>
              <Radio value={false}>不显示</Radio>
            </RadioGroup>)}
          </FormItem>
          {
            tid(temps) == '2' ?
              <div>
                <Row>
                  <Col>
                    <FormItem
                      {...formItemLayout}
                      label="顶层图片"
                    >{getFieldDecorator('specialIconCover')(
                      <Popover placement="right" content={PopoverContent}>
                        <div onClick={specialIconCoverImg}
                             className={styles.frame}>
                          <img
                            src={specialCoverImgUrl ? `${config.resPrefix}/${specialCoverImgUrl}` : item.specialIcon && item.specialIcon.cover ? `${config.resPrefix}/${item.specialIcon.cover}` : ''}
                            style={{
                              width: '100%',
                              height: '100%',
                              display: specialCoverImgUrl || (item.specialIcon && item.specialIcon.cover ) ? 'block' : 'none'
                            }}/>
                          {specialCoverImgUrl || (item.specialIcon && item.specialIcon.cover ) ? '' : '点我添加图片'}
                        </div>
                      </Popover>
                    )}
                    </FormItem>
                  </Col>
                </Row>
                <Row type="flex" justify="center">
                  <Col span={12}>
                    <FormItem
                      label="X轴方向"
                      labelCol={{span: 12}}
                      wrapperCol={{span: 8}}>
                      {getFieldDecorator('x', {initialValue: item.specialIcon.x ? `${item.specialIcon.x}` : 0}
                      )(<InputNumber autoFocus={true}/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="Y轴方向"
                      labelCol={{span: 12}}
                      wrapperCol={{span: 8}}
                    >
                      {getFieldDecorator('y', {initialValue: item.specialIcon.y ? `${item.specialIcon.y}` : 0}
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
                      {getFieldDecorator('w', {initialValue: item.specialIcon.w ? `${item.specialIcon.w}` : 0}
                      )(<InputNumber/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="图片高度"
                      labelCol={{span: 12}}
                      wrapperCol={{span: 8}}
                    >
                      {getFieldDecorator('h', {initialValue: item.specialIcon.h ? `${item.specialIcon.h}` : 0}
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
              initialValue: item.offset ? `${item.offset}` : 30,
              rules: [
                {
                  required: true,
                },
              ],
            })(<InputNumber min={30} placeholder="请输入期望的间距值" style={{width: 285}}/>)}
          </FormItem>
          <FormItem
            label="专栏能否选中"
            {...formItemLayout}
          >
            {getFieldDecorator('disable', {initialValue: item.disable ? item.disable : true}
            )(<RadioGroup>
              <Radio value={true}>能选中</Radio>
              <Radio value={false}>不能选中</Radio>
            </RadioGroup>)}
          </FormItem>


          <FormItem
            label="标题字体"
            {...formItemLayout}
          >
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
            {getFieldDecorator('titleFontSize', {initialValue: item.titleFont ? item.titleFont.fontSize : '40'}
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
            {getFieldDecorator('contentFontSize', {initialValue: item.contentFont ? item.contentFont.fontSize : '30'}
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
export default connect(({updatePage, dispatch, loading}) => ({
  updatePage,
  dispatch,
  loading
}))(Form.create()(modal))


