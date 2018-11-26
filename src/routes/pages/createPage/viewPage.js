import React from 'react'
import PropTypes from 'prop-types'
import styles from './viewPage.less'
import {Button, Icon, Popconfirm, message, Row, Col, Input} from 'antd'
import createPage from "../../../models/previewPage/createPage";
import {config} from 'utils'

const ButtonGroup = Button.Group;

const ViewPage = ({onDrop, onDragOver, createPage, dispatch,}) => {
  const {initPageTemps, initPage, bgImgUrl} = createPage;
  const checkedTemps = initPage.content.sectionList
  /*
  * 点击盒子查看详情
  * */
  const handleClick = (e, index) => {
    e.stopPropagation();
    const parent = e.currentTarget.parentNode;
    const pageAry = e.currentTarget.parentNode.parentNode;
    const siblings = pageAry.children;
    let temIndex = [].indexOf.call(siblings, parent);

    const currentCell = initPage.content.sectionList[temIndex].contentList[index];
    if (currentCell.route !== '') {
      let pre, cellId;
      if (currentCell.route.includes('videoDetail')) {
        pre = '剧集'
      } else if (currentCell.route.includes('channel')) {
        pre = '页面'
      } else if (currentCell.route.includes('appDetail')) {
        pre = 'App'
      }
      cellId = currentCell.route.split('=')[1].split('&')[0];
      dispatch({type: 'createPage/searchName', payload: {pre, cellId}})
    }else{
      dispatch({type: 'createPage/public', payload: {routeName:''}})
    }
    dispatch({
      type: 'createPage/public',
      payload: {temIndex, cellIndex: index, modalType: 'updateMessage', modalVisible: true}
    })
  };
  /*
  * 鼠标经过，双图层换图
  * */
  const handleMouseOver = (e, cell) => {
    if (e.target.tagName.toUpperCase() == 'IMG') {
      if (cell.activeCover != '') {
        e.target.parentNode.childNodes[0].setAttribute('src', `${config.resPrefix}/${cell.activeCover}`)
      } else {
        return false
      }
    } else {
      return false
    }
  };
  const handleMouseLeave = (e, cell) => {
    if (e.target.tagName.toUpperCase() == 'IMG' || e.target.tagName.toUpperCase() == 'P'
    ) {
      e.target.parentNode.childNodes[0].setAttribute('src', `${config.resPrefix}/${cell.cover}`)
    } else {
      return false
    }
  };
  /*
  * 显示隐藏工具栏
  */
  const onMouseOut = (e, checkedTemps, item, index) => {
    e.stopPropagation();
    const allChild = e.currentTarget.childNodes;
    const style = allChild[0].setAttribute('style', "display:none")
  };
  const onMouseOver = (e, checkedTemps, item, index) => {
    e.stopPropagation();
    /*让其他的盒子消失*/
    const allTemps = e.currentTarget.parentNode.children;
    for (let i = 0; i < allTemps.length; i++) {
      const curTem = allTemps[i];
      curTem.children[0].setAttribute('style', 'display:none')
    }
    /*显示当前模板的工具栏*/
    const allChild = e.currentTarget.children;
    allChild[0].setAttribute('style', 'display:block')
  };
  /*
  * 工具栏操作
  * */
  const handleMoveUp = (e, checkedTemps, item, index) => {
    if (index >= 1) {
      const del = checkedTemps.splice(index, 1)[0];
      checkedTemps.splice(index - 1, 0, del);
      // dispatch({type: 'createPage/updateInitPage', payload: initPage})
      dispatch({type: 'createPage/public', payload: {initPage, modalType: ''}})
    }
  };
  const handleMoveDown = (e, checkedTemps, item, index) => {
    if (index < checkedTemps.length - 1) {
      const del = checkedTemps.splice(index, 1)[0];
      checkedTemps.splice(index + 1, 0, del);
      // dispatch({type: 'createPage/updateInitPage', payload: initPage})
      dispatch({type: 'createPage/public', payload: {initPage, modalType: ''}})

    }
  };
  const handleToTop = (e, checkedTemps, item, index) => {
    if (index >= 1) {
      const del = checkedTemps.splice(index, 1)[0];
      checkedTemps.unshift(del);
      // dispatch({type: 'createPage/updateInitPage', payload: initPage})
      dispatch({type: 'createPage/public', payload: {initPage, modalType: ''}})


    }
  };
  const handleToBottom = (e, checkedTemps, item, index) => {
    if (index < checkedTemps.length - 1) {
      const del = checkedTemps.splice(index, 1)[0];
      checkedTemps.push(del);
      // dispatch({type: 'createPage/updateInitPage', payload: initPage})
      dispatch({type: 'createPage/public', payload: {initPage, modalType: ''}})

    }
  };
  const cancelDel = (e, checkedTemps, item, index) => {
    message.warning('没事别瞎按,好吗?');
  };
  const confirmDel = (e, checkedTemps, item, index) => {
    const del = checkedTemps.splice(index, 1);
    // dispatch({type: 'createPage/updateInitPage', payload: initPage})
    dispatch({type: 'createPage/public', payload: {initPage, modalType: ''}})

  };
  const handleEdit = (e, checkedTemps, item, index) => {
    dispatch({
      type: 'createPage/public',
      payload: {modalType: 'editCurrentTem', modalVisible: true, changeTem: {checkedTemps, item, index}}
    });
  };
  const reSort = (e, initPage, sectionListItem, index) => {
    const sectionList = initPage.content.sectionList;
    const del = sectionList.splice(index, 1)[0];
    sectionList.splice(e.target.value - 1, 0, del);
    // dispatch({type: 'createPage/updatePage', payload: initPage})
    dispatch({type: 'createPage/public', payload: {initPage}})
  };
  const mapInitPage = (initPage) => {
    if (initPage.content.sectionList.length > 0 && initPageTemps.length > 0) {
      const temps = initPage.content.sectionList.map((sectionListItem, index) => {
        /*返回 独立的模板*/
        const currentTem = initPageTemps.filter((TempItem) => {
          return TempItem.id === sectionListItem.tid;
        })[0];
        const allCellHeight = [];
        const allCells = currentTem.content.cellList;
        for (let i = 0; i < allCells.length; i++) {
          const height = allCells[i].height ? allCells[i].height : 0;
          const top = allCells[i].y ? allCells[i].y : 0;
          const marginTop = height + top;
          allCellHeight.push(marginTop);
        }
        const maxHeight = Math.max(...allCellHeight);
        return (<div
          style={{
            width: 1680,
            height: `${maxHeight}px`,
            position: 'relative',
            marginTop: sectionListItem.title == '' ? `${ Number(sectionListItem.offset)}px` : `${Number(sectionListItem.titleFont.fontSize) + 36 + Number(sectionListItem.offset)}px`
          }}
          className={styles.tem}
          key={index}
          onMouseOver={e => {
            onMouseOver(e, checkedTemps, sectionListItem, index)
          }}
          onMouseOut={e => {
            onMouseOut(e, checkedTemps, sectionListItem, index)
          }}>
          {/*定位在右侧的按钮 集合*/}
          <div className={styles.control}>
            <div className={styles.rightToolTitle}>{sectionListItem.name}</div>
            <div style={{zoom: 2}}>
              <ButtonGroup style={{marginTop: 10}}>
                <Row gutter={2}>
                  <Col span={12}>
                    <Button type='primary' icon="arrow-up" style={{borderRadius: 5}}
                            onClick={e => {
                              handleMoveUp(e, checkedTemps, sectionListItem, index)
                            }}>上移</Button>
                  </Col>
                  <Col span={12}>
                    <Button type='primary'
                            icon="arrow-down"
                            size="default"
                            style={{borderRadius: 5}}
                            onClick={e => {
                              handleMoveDown(e, checkedTemps, sectionListItem, index)
                            }}>下移</Button>
                  </Col>
                </Row>
                <Row gutter={2}>
                  <Col span={12}>
                    <Button type='primary'
                            icon="up"
                            size="default"
                            style={{borderRadius: 5}}
                            onClick={e => {
                              handleToTop(e, checkedTemps, sectionListItem, index)
                            }}>置顶</Button>
                  </Col>
                  <Col span={12}>
                    <Button type='primary' icon="down" size="default" style={{borderRadius: 5}}
                            onClick={e => {
                              handleToBottom(e, checkedTemps, sectionListItem, index)
                            }}>置底</Button>
                  </Col>
                </Row>
                <Row gutter={2}>
                  <Col span={12}>
                    <Button type='primary'
                            icon="tool"
                            size="default"
                            style={{borderRadius: 5}}
                            onClick={e => {
                              handleEdit(e, checkedTemps, sectionListItem, index)
                            }}>编辑</Button>
                  </Col>
                  <Col span={12}>
                    <Popconfirm title="确定删除当前模板？"
                                placement="right"
                                onConfirm={e => {
                                  confirmDel(e, checkedTemps, sectionListItem, index)
                                }}
                                onCancel={cancelDel}
                                okText="YES"
                                cancelText="NO">
                      <Button type='primary' icon="delete" size="default"
                              style={{borderRadius: 5}}>删除</Button>
                    </Popconfirm>
                  </Col>
                </Row>
                <Row gutter={2}>
                  <Col span={10}>
                    <span>设置跳转:</span>
                  </Col>
                  <Col span={13}>
                    <Input className={styles.reSort} onPressEnter={e => {
                      reSort(e, initPage, sectionListItem, index)
                    }}/>
                  </Col>
                </Row>

              </ButtonGroup>
            </div>
          </div>
          {/*title 定位在 模板上部的*/}
          <div style={{
            position: 'absolute',
            left: 0,
            top: `${-(Number(sectionListItem.titleFont.fontSize) + 36)}px`,
            width: '100%',
            height: `${sectionListItem.titleFont.fontSize}px`,
            lineHeight: `${sectionListItem.titleFont.fontSize}px`,
            fontSize: `${sectionListItem.titleFont.fontSize}px`,
            font: `${sectionListItem.titleFont.font}`,
            color: `${sectionListItem.titleFont.color}`,
            textAlign: 'left',
            userSelect: 'none',
            display: sectionListItem.title ? 'block' : 'none'
          }}>{sectionListItem.title}</div>
          {
            /*返回 独立的cell盒子*/
            sectionListItem.contentList.map((cell, index) => {
              return (<div className={styles.forScale}
                           key={index}
                           style={{
                             height: allCells[index].height ? allCells[index].height : 0,
                             width: allCells[index].width ? allCells[index].width : 0,
                             left: allCells[index].x ? allCells[index].x : 0,
                             top: allCells[index].y ? allCells[index].y : 0,
                           }}
                           onClick={e => {
                             handleClick(e, index)
                           }}
                           onMouseOver={e => {
                             handleMouseOver(e, cell)
                           }}
                           onMouseLeave={e => {
                             handleMouseLeave(e, cell)
                           }}>
                {/*设置磁铁的链接route 字段*/}
                {
                  <a href='javascript:;' className={styles.route}>

                    <img src={`${config.resPrefix}/${cell.cover}`}
                         style={{display: cell.cover === '' ? 'none' : 'block'}}
                         className={styles.changeImg}/>

                    {<img
                      src={`${config.resPrefix}/${cell.specialIcon.cover}`}
                      className={styles.specialIcon}
                      style={{
                        height: `${cell.specialIcon.h}px`,
                        width: `${ cell.specialIcon.w}px`,
                        left: `${cell.specialIcon.x}px`,
                        top: `${cell.specialIcon.y}px`,
                        display: cell.specialIcon.cover === '' ? 'none' : 'block'
                      }}/>
                    }
                    <p style={{
                      fontSize: `${sectionListItem.contentFont.fontSize}px`,
                      height: `${sectionListItem.contentFont.fontSize}px`,
                      lineHeight: `${sectionListItem.contentFont.fontSize}px`,
                      font: `${sectionListItem.contentFont.font}px`,
                      color: `${sectionListItem.contentFont.color}`,
                      top: `${allCells[index].height + 22}px`,
                      display: cell.name == '' ? 'none' : 'block'
                    }} className={styles.bottom}>
                      {
                        cell.name
                      }
                    </p>
                  </a>
                }
              </div>)
            })
          }
          <div className={styles.index}>{index + 1}号模板</div>
        </div>)
      });
      return temps
    }
  };
  return (
    <div style={{position: 'relative'}}>
      <div className="view"
           style={{
             border: '120px solid rgba(210,219,219,1)',
             zoom: "0.5",
             width: 1920,
             background: 'grey',
             backgroundImage: `url(${config.resPrefix}/${bgImgUrl})`,
             backgroundRepeat: "no-repeat",
             backgroundOrigin: 'content-box',
             backgroundSize: 'cover',
           }}
           onDrop={onDrop}
           onDragOver={onDragOver}>
        {
          mapInitPage(initPage)
        }
      </div>
      <div style={{position: "absolute", left: 0, top: 0}}>拖拽模板至此 <Icon type="arrow-right"></Icon></div>
    </div>
  );
};

ViewPage.propTypes = {
  onDrop: PropTypes.func,
  onDragOver: PropTypes.func,
  dispatch: PropTypes.func,
};
export default ViewPage




















