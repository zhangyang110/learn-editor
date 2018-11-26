import React from 'react'
import PropTypes from 'prop-types'
import {Page} from 'components'
import {connect} from 'dva'
import {Button, Form, Input, Radio, Select, Pagination, Icon, Row, Col,Tooltip,message} from 'antd'
import styles from './index.less'
import {config} from 'utils'
import ViewPage from './viewPage'
import Modal from './Modal'
import SearchModal from './SearchModal'


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Search = Input.Search;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 11,
  },
}

const UpdatePage = ({
                      updatePage,
                      dispatch,
                      loading,
                      form: {
                        getFieldDecorator,
                        getFieldsValue,
                      }
                    }) => {
  const {currentPage, searchTemp, modalVisible, temPage, bgImgUrl, searchModalVisible, modalType, editTemp, currentCell} = updatePage;
  const handleTemSearch = (value) => {
    const newValue = `name:${value}`;
    dispatch({type: 'updatePage/searchTem', payload: {limit: 5000, offset: 0, query: newValue}})
  };
  const drag = (ev) => {
    const currentTem = ev.target;
    const siblings = ev.target.parentNode.childNodes;
    const temIndex = [].indexOf.call(siblings, currentTem);
    let newTemIndex;
    if (temPage) {
      newTemIndex = temIndex + (temPage - 1) * 3;
    } else {
      newTemIndex = temIndex;
    }

    const currentTemMes = searchTemp[newTemIndex];
    const newCurrentTemMes = JSON.parse(JSON.stringify(currentTemMes))
    newCurrentTemMes.content = JSON.parse(newCurrentTemMes.content);
    dispatch({type: 'updatePage/public', payload: {currentTemMes:newCurrentTemMes}})
  };
  const addBgImg = () => {
    dispatch({type: 'updatePage/public', payload: {searchType: 'searchBgImg',searchModalVisible: true,}})
  };
  const onChange = (page, pageSize) => {
    dispatch({type: 'updatePage/public', payload: {temPage:page}})
  };

  const PaginationProps = {
    onChange,
    total: searchTemp.length,
    defaultPageSize: 3,
  };

  const modalProps = {
    loading,
    visible: modalVisible,
    title: modalType === 'editCurrentTem' ? '修改模板信息' : modalType === 'editCell' ? '修改磁贴' : '其他',
    item: modalType === 'editCurrentTem' ? editTemp : modalType === 'editCell' ? currentCell : {},
    closable: false,
  };
  const handleSave = () => {
    const data = {
      ...getFieldsValue()
    };
    currentPage.name = data.name;
    currentPage.type = data.type;
    currentPage.has_top = data.has_top;
    currentPage.content.background = bgImgUrl ? `${bgImgUrl}` : currentPage.content && currentPage.content.background ? `${ currentPage.content.background}` : '';
    console.log(currentPage);
    dispatch({type: 'updatePage/putPage', payload: currentPage})
  };
  const handleBack=()=>{
    dispatch({type:'updatePage/goBack'})
  };
  const mapSearchTemp = (searchTemp) => {
    if (searchTemp.length > 0) {
      const temps = searchTemp.map((searchTemItem, index) => {
        const cells = JSON.parse(searchTemItem.content).cellList.map((item, index) => {
          return (<div key={index} className={styles.createDiv}
                       style={{
                         width: item.width,
                         height: item.height,
                         left: item.x,
                         top: item.y
                       }}>
            {item.tid == 1 ? "单" : "双"}
          </div>)
        });
        /*比较各个盒子的 高度值  区最大的  作为tem外层盒子的高度*/
        const allCellHeight = [];
        const allCells = JSON.parse(searchTemItem.content).cellList;
        for (let i = 0; i < allCells.length; i++) {
          const height = allCells[i].height ? allCells[i].height : 0;
          const top = allCells[i].y ? allCells[i].y : 0;
          const marginTop = height + top;
          allCellHeight.push(marginTop);
        }
        const maxHeight = Math.max(...allCellHeight);
        return (<div key={index}
                     style={{height: maxHeight,}}
                     draggable="true"
                     id={searchTemp.id}
                     onDragStart={drag}
                     className={styles.template}

        >{cells}</div>)

      });
      let newTemps;
      if (temPage) {
        newTemps = temps.slice((temPage - 1) * 3, (temPage - 1) * 3 + 3)
      } else {
        newTemps = temps.slice(0, 3);
      }
      return newTemps
    } else {
      return false
    }
  };

  return (
    <Page inner loading={loading.effects['updatePage/queryPage']}>
      <Form>
        <Row className={styles.pagePram}>
          <Row>
            <Col span={12}>
              <FormItem
                label="页面名称"
                {...formItemLayout}>
                {getFieldDecorator('name', {
                    initialValue: currentPage.name,
                    rules: [{require: true, message: 'plaese enter the name of your page', min: 4}]
                  }
                )(<Input disabled={true}/>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="顶部操作栏"
                {...formItemLayout}>
                {getFieldDecorator('has_top', {initialValue: currentPage && currentPage.has_top}
                )(<RadioGroup>
                  <Radio value={true}>需要</Radio>
                  <Radio value={false}>不需要</Radio>
                </RadioGroup>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="页面类型"
              >{getFieldDecorator('type', {initialValue: currentPage.type, rules: [{require: true}]})(
                <Select>
                  <Select.Option value="Simple">简单页面</Select.Option>
                  <Select.Option value="Child">儿童页面</Select.Option>
                  <Select.Option value="Game">游戏页面</Select.Option>
                </Select>)}
              </FormItem></Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="添加背景图片">
                {getFieldDecorator('background', {
                  rules: [{require: true}],
                })
                (
                  <Tooltip placement="right" title='点击修改图片'>
                    <div onClick={addBgImg}
                         className={styles.frame}>
                      <img
                        src={bgImgUrl ? `${config.resPrefix}/${bgImgUrl}` : currentPage.content && currentPage.content.background ? `${config.resPrefix}/${ currentPage.content.background}` : ''}
                        style={{
                          width: '100%',
                          height: '100%',
                          display: bgImgUrl ||currentPage.content && currentPage.content.background ? 'block' : 'none'
                        }}/>
                      {bgImgUrl ||currentPage.content && currentPage.content.background  ? '' : '点我添加图片'}
                    </div>
                  </Tooltip>
                )}
              </FormItem></Col>
          </Row>
        </Row>
        <Row className={styles.checkModel}>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="模板选取">
                <Search
                  placeholder="输入模板名称"
                  onSearch={handleTemSearch}
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                label="模板预览"
                labelCol={{span: 2}}
                wrapperCol={{span: 22}}>
                <div className={styles.previewTemps}>
                  {mapSearchTemp(searchTemp)}
                </div>
                <Pagination {...PaginationProps}/>
              </FormItem>
            </Col>
          </Row>
        </Row>
        <Row className={styles.viewPage}>
          <Col span={24}>
            <FormItem
              label="页面预览"
              labelCol={{span: 2}}
              wrapperCol={{span: 16}}>
              <div style={{position: 'relative'}}>
                <div>拖拽模板至此 <Icon type="enter" className={styles.icon}></Icon></div>
                <ViewPage/>
              </div>
            </FormItem>
          </Col>
        </Row>

      </Form>
      <Modal {...modalProps}/>
      {searchModalVisible && <SearchModal/>}
      <Button type='primary' onClick={handleSave} style={{marginRight:'10px'}}>保存修改</Button>
      <Button type='primary' onClick={handleBack}>返回上一页</Button>
    </Page>
  )
};
UpdatePage.propTypes = {
  updatePage: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  form: PropTypes.object
}
export default connect(({updatePage, dispatch, loading}) => ({
  updatePage,
  dispatch,
  loading
}))(Form.create()(UpdatePage))



































