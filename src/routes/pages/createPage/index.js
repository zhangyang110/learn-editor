import React from 'react'
import PropTypes from 'prop-types'
import {Page} from 'components'
import {connect} from 'dva'
import {Button, Form, Pagination, Input, Radio, Select, Icon, Row, Col, Tooltip,message} from 'antd'
import styles from './index.less'
import SearchModal from './SearchModal'
import ViewPage from './viewPage'
import Modal from './Modal'
import {config} from 'utils'

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

const CreatePage = ({
                      createPage,
                      dispatch,
                      loading,
                      form: {
                        getFieldDecorator,
                        getFieldsValue,
                        validateFields,
                      }
                    }) => {
  const {modalVisible, isCreate, initPage, temPage, searchModalVisible, initPageTemps, bgImgUrl, searchTemp, currentTemMes, modalType, changeTem, temIndex, cellIndex,} = createPage;
  const addBgImg = () => {
    // dispatch({type: 'createPage/showSearchImgModal', payload: {searchType: 'searchBgImg'}})
    dispatch({type: 'createPage/public', payload: {searchType: 'searchBgImg', searchModalVisible: true,}})
  };
  const handleTemSearch = (value) => {
    const newValue = `name:${value}`;
    dispatch({type: 'createPage/searchTem', payload: {limit: 5000, offset: 0, query: newValue}})
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
    // dispatch({type: 'createPage/setCurrentTemMes', payload: currentTemMes})
    dispatch({type: 'createPage/public', payload: {currentTemMes,}})
  };
  const drop = (ev) => {
    ev.preventDefault();
    /*生成新的作用域*/
    const newCurrentTemMes = JSON.parse(JSON.stringify(currentTemMes));
    newCurrentTemMes.content = JSON.parse(newCurrentTemMes.content);
    const contentList = [];
    for (let i = 0; i < newCurrentTemMes.content.cellList.length; i++) {
      const curCell = newCurrentTemMes.content.cellList[i];
      const contentListItem = {
        activeBox: true,
        activeCover: "",
        cover: "",
        route: "",
        name: "",
        tid: curCell.tid,
        specialIcon: {
          anchor: "",
          cover: "",
          h: 100,
          w: 100,
          x: 0,
          y: 0
        }
      };
      contentList.push(contentListItem);
    }
    const sectionListItem = {
      disable: true,
      offset: 30,
      tid: newCurrentTemMes.id,
      name: newCurrentTemMes.name,
      title: "",
      contentFont: {
        color: "#FFFFFF",
        font: "AZMRZT",
        fontSize: 40
      },
      titleFont: {
        color: "#FFFFFF",
        font: "AZMRZT",
        fontSize: 60
      },
      contentList: contentList
    };

    initPageTemps.push(newCurrentTemMes);
    initPage.content.sectionList.push(sectionListItem);
    // dispatch({type: 'createPage/updateMes', payload: {initPage, initPageTemps}})
    dispatch({type: 'createPage/public', payload: {initPage, initPageTemps}})
  };
  const allowDrop = (ev) => {
    ev.preventDefault();
  };
  const onChange = (page, pageSize) => {
    // dispatch({type: 'createPage/setTemPage', payload: page})
    dispatch({type: 'createPage/public', payload: {temPage: page}})
  };
  const PaginationProps = {
    onChange,
    total: searchTemp.length,
    defaultPageSize: 3,
  };
  const mapTem = (searchTemp) => {
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
            {item.tid == undefined ? 'tid未定义' : item.tid == 1 ? "单" : "双"}
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
  const viewPageProps = {
    onDrop: drop,
    onDragOver: allowDrop,
    createPage: createPage,
    dispatch: dispatch,
  };
  const modalProps = {
    loading,
    title: `${modalType === 'updateMessage' ? '修改磁铁信息' : modalType === 'editCurrentTem' ? '修改专栏' : '其他'}`,
    item: modalType === 'editCurrentTem' ? changeTem.item : modalType === 'updateMessage' ? initPage.content.sectionList[temIndex].contentList[cellIndex] : {},
    createPage,
    dispatch,
    visible: createPage.modalVisible,
    closable: false,
  };
  const toCreatePage = () => {
    /*数据格式的改造 转换为pageData */
    const data = {
      ...getFieldsValue()
    };
    if (!data.name){
      message.warning('请检查信是否齐全?');
      return false
    }
      initPage.name = `${data.name}`;
    initPage.version = 1;
    initPage.type = `${data.type}`;
    initPage.has_top = data.has_top;
    initPage.content.background = `${bgImgUrl}`;
    if (isCreate) {
      dispatch({type: 'createPage/postPage', payload: initPage});
      dispatch({type: 'createPage/public', payload: {modalType: '', isCreate: false}})
    } else {
      dispatch({type: 'createPage/putPage', payload: initPage});
      dispatch({type: 'createPage/public', payload: {modalType: ''}})
    }
  };
  const goBack = () => {
    dispatch({type: 'createPage/goBack'});
    dispatch({type: 'createPage/public', payload: {isCreate: true}});
  };
  return (
    <Page inner>
      <Form className={styles.form}>
        <Row className={styles.pagePram}>
          <Row>
            <Col span={12}>
              <FormItem
                label="页面名称"
                {...formItemLayout}>
                {getFieldDecorator('name', {
                    rules: [{require: true, message: '至少四位', min: 4}]
                  }
                )(<Input/>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="顶部操作栏"
                {...formItemLayout}>
                {getFieldDecorator('has_top', {initialValue: true}
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
              >{getFieldDecorator('type', {initialValue: 'Simple', rules: [{require: true}]})(
                <Select>
                  <Select.Option value="Simple">简单页面</Select.Option>
                  <Select.Option value="Child">儿童页面</Select.Option>
                  <Select.Option value="Game">游戏页面</Select.Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} hasFeedback label="添加背景图片">
                {getFieldDecorator('background', {rules: [{require: true}]})(
                  <Tooltip placement="right" title='点击修改图片'>
                    <div onClick={addBgImg}
                         className={styles.frame}>
                      <img
                        src={bgImgUrl !== '' ? `${config.resPrefix}/${bgImgUrl}` : ''}
                        style={{
                          width: '100%',
                          height: '100%',
                          display: bgImgUrl ? 'block' : 'none'
                        }}/>
                      {bgImgUrl ? '' : '点我添加图片'}
                    </div>
                  </Tooltip>
                )}
              </FormItem>
            </Col>
          </Row>
        </Row>
        <Row className={styles.checkModel}>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="模板选取"
                hasFeedback>
                <Search
                  placeholder="输入模板名称"
                  onSearch={handleTemSearch}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                label="模板预览"
                labelCol={{span: 2}}
                wrapperCol={{span: 22}}>
                <div style={{
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  {mapTem(searchTemp)}
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
              <ViewPage {...viewPageProps}/>
            </FormItem>
          </Col>
        </Row>
      </Form>
      {modalVisible && <Modal {...modalProps}/>}
      {searchModalVisible && <SearchModal/>}
      {
        createPage.isCreate ?
          <Button type="primary" className={styles.toCreatePage} onClick={toCreatePage}>创建页面</Button> :
          (<div>
            <Button type="primary" onClick={toCreatePage} className={styles.savePage}>保存页面</Button>
            <Button type="primary" onClick={goBack} className={styles.goBack}>返回上一页</Button>
          </div>)
      }
    </Page>
  )
};
CreatePage.propTypes = {
  createPage: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  form: PropTypes.object
};

export default connect(({createPage, dispatch, loading}) => ({
  createPage,
  dispatch,
  loading
}))(Form.create()(CreatePage))
