import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Input, Icon, Form, InputNumber, Button, Layout, Card, notification, Tree, Radio, Tooltip, Modal, Alert } from 'antd'
import moment from 'moment';
import { routerRedux } from 'dva/router'
import { config } from 'utils'
import { Page } from 'components'
import styles from './index.less'
import { classnames } from 'utils'


const CreateTemplate = ({ createTemplate, dispatch, loading }) => {

  const TreeNode = Tree.TreeNode;
  const confirm = Modal.confirm;
  const datas = createTemplate.createTemplate;

  /**
   * 磁贴的点击事件
   */
  const onSelect = (selectedKeys, info) => {
    if (datas.status == 1) {
      notification['warning']({
        message: 'this template has been publish.',
      });
      return;
    }
    const key = selectedKeys[0] + '';
    dispatch({
      type: 'createTemplate/layerClick',
      payload: {
        ...createTemplate,
        cellIndex: key,
        selectKey: key,
      },
    })
  }


  /**
   * 创建cell节点  用于点击修改其属性
   */
  function initCellNode() {
    if (datas.content != undefined && datas.content.cellList != undefined) {
      const cellList = datas.content.cellList;
      const divs = [];
      for (let index = 0; index < cellList.length; index++) {
        const element = cellList[index];
        if (element.x == undefined) {
          element.x = 0;
        }
        if (element.y == undefined) {
          element.y = 0;
        }
        divs.push(<TreeNode className={styles.globalTextSize}  title={"第" + (index + 1) + "个"} key={index} />);
      }
      return divs;
    }
  }


  /**
   * 根据celllist的数量在预览区创建对应的图层
   */
  function initCellPreView() {
    if (datas.content != undefined && datas.content.cellList != undefined) {
      const cellList = datas.content.cellList;
      const divs = [];
      for (let index = 0; index < cellList.length; index++) {
        const element = cellList[index];
        if (element.x == undefined) {
          element.x = 0;
        }
        if (element.y == undefined) {
          element.y = 0;
        }
        divs.push(
          <div key={index} className={styles.createDiv} onClick= { e => onSelect([index],undefined) }
            style={{ width: element.width, height: element.height, marginLeft: element.x, marginTop: element.y, }}>
            {element.tid == 1 ? "单图层" : "双图层"}
            <br />
            <span className={styles.cellTip}> {(index + 1)}号磁贴 </span><br/>
            <span className={styles.cellTip}> {element.width + ' * ' + element.height} </span>
          </div>

        );
      }
      return divs;
    }
  }


  /**
   * 增加一个磁贴
   */
  function addCell() {
    if (datas.status == 1) {
      notification['warning']({
        message: 'this template has been publish.',
      });
      return;
    }
    const newCell = {
      "height": 240,
      "tid": 1,
      "width": 440,
      "x": 0,
      "y": 0
    }
    if (datas.content.cellList == undefined) {
      datas.content.cellList = [];
    }else{
      const lastcell = datas.content.cellList[datas.content.cellList.length - 1];
      newCell.y = lastcell.height + lastcell.y + 20;
    }
    datas.content.cellList.push(newCell);
    dispatch({
      type: 'createTemplate/emptyMessage',
    })
  }

  /**
   * 删除一个磁贴
   */
  function deleteCell() {
    if (datas.status == 1) {
      return;
    }
    datas.content.cellList = datas.content.cellList.del(createTemplate.cellIndex, datas.content.cellList);
    createTemplate.cellIndex = undefined;
    createTemplate.currentCell = {};

    dispatch({
      type: 'createTemplate/emptyMessage',
    })
  }


  /*
     concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
           这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
           组成的新数组，这中间，刚好少了第n项。
     slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
    */
  Array.prototype.del = (n, cellList) => {

    if (n < 0 || cellList == undefined) {
      return cellList;
    } else {
      n = +n;
      return cellList.slice(0, n).concat(cellList.slice(n + 1, cellList.length));
    }
  }


  function nameOnChange(value) {
    createTemplate.name = value;
    dispatch({
      type: 'createTemplate/emptyMessage',
    })
  }

  function attributeOnChange(type, value) {

    if (createTemplate.currentCell != undefined) {
      createTemplate.currentCell[type] = value
      dispatch({
        type: 'createTemplate/emptyMessage',
      })
    }
  }

  /**
   * 显示确认提交框
   */
  function showConfirm() {
    confirm({
      title: '提示',
      content: '确定要保存该模板吗?',
      onOk() {
        saveTemplate();
      },
     
    });
  }

   /**
   * 保存模板
   */
  function saveTemplate() {
    if (datas.status == 1) {
      notification['warning']({
        message: 'this template has been publish.',
      });
      return;
    }
    if (datas.id != -1) {
      dispatch({
        type: 'createTemplate/update',
        payload: datas,
      })
    } else {
      if (createTemplate.name == undefined || createTemplate.name == '') {
        notification['error']({
          message: 'template name cannot empty.',
        });
        return;
      }else if (datas.content.cellList == undefined) {
        notification['error']({
          message: 'template cell cannot empty.',
        });
        return;
      }

      datas.name = createTemplate.name;
      console.log(datas)
      dispatch({
        type: 'createTemplate/created',
        payload: datas,
      })
    }

  }


  /**
   * 回退到上一页
   */
  function goBack() {
    dispatch({
      type: "createTemplate/jump",
      payload: { },
    })
  }


  return (

    <Page inner styles={{ padding: 0 }}>

      {/* 顶部的按钮 */}
      <Alert className={ classnames(styles.globalTextSize,styles.titleAlert ) } message="模板设置" />
      <div className={ classnames(styles.btnContiner,styles.globalTextSize)  }  >
      模板名称：
        <Input placeholder="模板名称" className={styles.topName} value={createTemplate.name}
          onChange={(e) => nameOnChange(e.target.value)} />
        <span className={styles.topBtn}> 宽度：1680 </span>

        <Button type="primary" className={ classnames(styles.topBtn,styles.globalTextSize)  } onClick={e => addCell()}>增加磁贴</Button>
        <Button type="primary" className={ classnames(styles.topBtn,styles.globalTextSize) } onClick={e => showConfirm()}>保存模板</Button>

        <Button type="danger" ghost className={classnames(styles.topBtn,styles.globalTextSize)} onClick={e => goBack()}>返回</Button>
        <span className={styles.publish}> {datas.status == 1 && '此模板已发布 无法编辑'} </span>
      </div>
      <br />

      {/* 中部磁贴列表和磁贴属性 */}
      <Alert className={styles.titleAlert} message="修改属性" />
      <div className={styles.cellListContiner}>

        <Card title="磁贴数量" className={styles.cellCount}>
          <Tree showLine onSelect={onSelect} selectedKeys={[createTemplate.selectKey && createTemplate.selectKey]} >
            {initCellNode()}
          </Tree>
        </Card>

        <Card title="磁贴属性" className={ classnames(styles.cellAttribute,styles.globalTextSize) }>
          宽度 ：<InputNumber min={0} max={1680} value={createTemplate.currentCell && createTemplate.currentCell.width}
            onChange={(value) => attributeOnChange('width', value)} />
          <br />
          <br />
          高度 ：<InputNumber min={0} value={createTemplate.currentCell && createTemplate.currentCell.height}
            onChange={(value) => attributeOnChange('height', value)} />
          <br />
          <br />
        
          上边距：<InputNumber min={0} value={createTemplate.currentCell && createTemplate.currentCell.y}
            onChange={(value) => attributeOnChange('y', value)} />
          <br />
          <br />
        
          左边距：<InputNumber min={0} value={createTemplate.currentCell && createTemplate.currentCell.x}
            onChange={(value) => attributeOnChange('x', value)} />
        
          <br />
          <br />
          类型：<Radio.Group value={createTemplate.currentCell && createTemplate.currentCell.tid + ''}
            onChange={(e) => attributeOnChange('tid', e.target.value)}>
            <Radio className={styles.globalTextSize} value='1'> 单 </Radio>
            <Radio className={styles.globalTextSize} value='2'> 双 </Radio>
          </Radio.Group>
          <br />
          <br />
          <Button type="danger" className={styles.globalTextSize} onClick={e => deleteCell()} >删除</Button>
        </Card>
      </div>

      {/* 底部预览区 */}
      <Alert className={styles.titleAlert} message="效果预览" />

      <div style={{ overflowX: 'scroll', }}>
        <div className={styles.preview}>
          {
            initCellPreView()
          }
        </div>
      </div>

    </Page>
  )
}

CreateTemplate.propTypes = {
  createTemplate: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ createTemplate, dispatch, loading }) => ({ createTemplate, dispatch, loading }))(CreateTemplate)
