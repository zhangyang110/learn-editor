import React from 'react'
import PropTypes from 'prop-types'
import styles from './viewPage.less'
import { Button, Icon, Input, Popconfirm, message, Row, Col } from 'antd'
import { config } from 'utils'
import { connect } from 'dva'

const ButtonGroup = Button.Group
const ViewPage = ({ updatePage, dispatch, loading }) => {
  const { currentPage, temps, bgImgUrl, currentTemMes, } = updatePage
  const buttonProps = { type: 'primary', style: { marginRight: 5, borderRadius: 7 } }
  const handleMouseOver = (e, cell) => {
    if (e.target.tagName.toUpperCase() === 'IMG') {
      if (cell.activeCover != undefined && cell.activeCover != '') {
        e.target.parentNode.childNodes[0].setAttribute('src', `${config.resPrefix}/${cell.activeCover}`)
      }
    } else {
      return false
    }
  }
  const handleMouseLeave = (e, cell) => {
    if (e.target.tagName.toUpperCase() === 'IMG' || e.target.tagName.toUpperCase() === 'P') {
      e.target.parentNode.childNodes[0].setAttribute('src', `${config.resPrefix}/${cell.cover}`)
    } else {
      return false
    }

  }
  const onMouseOver = (e) => {
    /*让其他的盒子消失*/
    const allTemps = e.currentTarget.parentNode.children
    for (let i = 0; i < allTemps.length; i++) {
      const curTem = allTemps[i]
      curTem.children[0].setAttribute('style', 'display:none')
    }
    /*
    *显示当前模板的工具栏
    * */
    const allChild = e.currentTarget.children
    allChild[0].setAttribute('style', 'display:block')
  }
  const onMouseOut = (e) => {
    const allChild = e.currentTarget.children
    const style = allChild[0].setAttribute('style', 'display:none')
  }
  const handleMoveUp = (e, currentPage, sectionListItem, index) => {
    if (index >= 1) {
      const sectionList = currentPage.content.sectionList
      const del = sectionList.splice(index, 1)[0]
      sectionList.splice(index - 1, 0, del)
      dispatch({ type: 'updatePage/public', payload: { currentPage, modalVisible: false } })
    }
  }
  const confirmDel = (e, currentPage, sectionListItem, index) => {
    const sectionList = currentPage.content.sectionList
    const del = sectionList.splice(index, 1)
    dispatch({ type: 'updatePage/public', payload: { currentPage } })
  }
  const cancelDel = (e, currentPage, sectionListItem, index) => {
    message.warning('没事别瞎按,好吗?')
  }
  const handleMoveDown = (e, currentPage, sectionListItem, index) => {
    const sectionList = currentPage.content.sectionList

    if (index < sectionList.length - 1) {
      const del = sectionList.splice(index, 1)[0]
      sectionList.splice(index + 1, 0, del)
      dispatch({ type: 'updatePage/public', payload: { currentPage } })
    }
  }
  const handleToTop = (e, currentPage, sectionListItem, index) => {
    const sectionList = currentPage.content.sectionList
    if (index >= 1) {
      const del = sectionList.splice(index, 1)[0]
      sectionList.unshift(del)
      dispatch({ type: 'updatePage/public', payload: { currentPage } })
    }
  }
  const handleToBottom = (e, currentPage, sectionListItem, index) => {
    const sectionList = currentPage.content.sectionList

    if (index < sectionList.length - 1) {
      const del = sectionList.splice(index, 1)[0]
      sectionList.push(del)
      dispatch({ type: 'updatePage/public', payload: { currentPage } })
    }
  }
  const handleEdit = (e, currentPage, sectionListItem, index) => {
    dispatch({
      type: 'updatePage/public',
      payload: { modalType: 'editCurrentTem', modalVisible: true, editTemp: sectionListItem, tempIndex: index },
    })
  }
  const reSort = (e, currentPage, sectionListItem, index) => {
    const sectionList = currentPage.content.sectionList
    const del = sectionList.splice(index, 1)[0]
    sectionList.splice(e.target.value - 1, 0, del)
    dispatch({ type: 'updatePage/public', payload: { currentPage } })

  }
  const drop = (ev) => {
    ev.preventDefault()
    /*先插模板 在插页面中*/
    const contentList = []
    for (let i = 0; i < currentTemMes.content.cellList.length; i++) {
      const contentListItem = {
        activeBox: true,
        cover: '',
        name: '',
        route: '',
        // tid:currentTemMes.content.cellList[i].tid,
        specialIcon: {
          cover: '',
          h: 100,
          w: 100,
          x: 0,
          y: 0,
        },
      }
      contentList.push(contentListItem)
    }

    const pushPage = {
      contentFont: {
        color: '#FFFFFF',
        font: 'AZMRZT',
        fontSize: 30,
      },
      titleFont: {
        color: '#FFFFFF',
        font: 'AZMRZT',
        fontSize: 40,
      },
      contentList: contentList,
      disable: true,
      offset: 30,
      tid: currentTemMes.id,
      title: '',
    }
    temps.push(currentTemMes)
    currentPage.content.sectionList.push(pushPage)
    dispatch({ type: 'updatePage/public', payload: { currentPage: currentPage, temps: temps } })
  }
  const allowDrop = (ev) => {
    ev.preventDefault()
  }
  const handleCellClick = (e, index, sectionListItem) => {
    e.stopPropagation()
    const tempIndex = currentPage.content.sectionList.indexOf(sectionListItem)
    const cellIndex = index
    const currentCell = currentPage.content.sectionList[tempIndex].contentList[cellIndex]
    if (currentCell.route !== '') {
      let pre,
        cellId
      if (currentCell.route.includes('videoDetail')) {
        pre = '剧集'
      } else if (currentCell.route.includes('channel')) {
        pre = '页面'
      } else if (currentCell.route.includes('appDetail')) {
        pre = 'App'
      }
      cellId = currentCell.route.split('=')[1].split('&')[0]
      console.log(cellId)
      dispatch({ type: 'updatePage/searchName', payload: { pre, cellId } })
    } else {
      dispatch({ type: 'updatePage/public', payload: { routeName: '' } })
    }


    dispatch({
      type: 'updatePage/public',
      payload: { modalType: 'editCell', currentCell, tempIndex: tempIndex, modalVisible: true, cellIndex },
    })
  }
  const mapPage = (currentPage) => {
    if (JSON.stringify(currentPage) !== '{}') {
      const templates = currentPage.content.sectionList.map((sectionListItem, index) => {
        // 获取当前数据的模板 currentTem
        const currentTem = temps.filter((item, index) => {
          return item.id === sectionListItem.tid
        })[0]
        const allCellHeight = []
        const allCells = currentTem.content.cellList
        for (let i = 0; i < allCells.length; i++) {
          const height = allCells[i].height ? allCells[i].height : 0
          const top = allCells[i].y ? allCells[i].y : 0
          const marginTop = height + top
          allCellHeight.push(marginTop)
        }
        const maxHeight = Math.max(...allCellHeight)
        /*创建所有模板 */
        return (
          <div
            className={styles.template}
            key={index}
            style={{
              height: `${maxHeight}px`,
              marginTop: sectionListItem.title == '' ||
              sectionListItem.title == undefined ? `${ Number(sectionListItem.offset)}px` :
                `${Number(sectionListItem.titleFont.fontSize) + 36 + Number(sectionListItem.offset)}px`,
            }}
            onMouseOver={e => {
              onMouseOver(e)
            }}
            onMouseOut={e => {
              onMouseOut(e)
            }}>
            {/*定位在右侧的按钮 集合*/}
            <div className={styles.control}>
              <div className={styles.rightToolTitle}>{currentTem.name}</div>
              <div style={{ zoom: 2, backgroundColor: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                <ButtonGroup style={{ marginTop: 10 }}>
                  <Row gutter={2}>
                    <Col span={12}>
                      <Button {...buttonProps} icon="arrow-up" onClick={e => {
                        handleMoveUp(e, currentPage, sectionListItem, index)
                      }}>上移</Button>
                    </Col>
                    <Col span={12}>
                      <Button {...buttonProps} icon="arrow-down" onClick={e => {
                        handleMoveDown(e, currentPage, sectionListItem, index)
                      }}>下移</Button>
                    </Col>
                  </Row>
                  <Row gutter={2}>
                    <Col span={12}>
                      <Button {...buttonProps} icon="up" onClick={e => {
                        handleToTop(e, currentPage, sectionListItem, index)
                      }}>置顶</Button>
                    </Col>
                    <Col span={12}>
                      <Button {...buttonProps} icon="down" onClick={e => {
                        handleToBottom(e, currentPage, sectionListItem, index)
                      }}>置底</Button>
                    </Col>
                  </Row>
                  <Row gutter={2}>
                    <Col span={12}>
                      <Button {...buttonProps} icon="tool" onClick={e => {
                        handleEdit(e, currentPage, sectionListItem, index)
                      }}>编辑</Button>
                    </Col>
                    <Col span={12}>
                      <Popconfirm title="确定删除当前模板？"
                                  placement="right"
                                  onConfirm={e => {
                                    confirmDel(e, currentPage, sectionListItem, index)
                                  }}
                                  onCancel={cancelDel}
                                  okText="YES"
                                  cancelText="NO">
                        <Button icon="delete"{...buttonProps}>删除</Button>
                      </Popconfirm>
                    </Col>
                  </Row>
                  <Row gutter={2}>
                    <Col span={10}>
                      <span>设置跳转:</span>
                    </Col>
                    <Col span={13}>
                      <Input className={styles.reSort} onPressEnter={e => {
                        reSort(e, currentPage, sectionListItem, index)
                      }}/>
                    </Col>
                  </Row>
                </ButtonGroup>
              </div>
            </div>
            {/*title 盒子*/}
            {
              sectionListItem.title && <div className="title" style={{
                position: 'absolute',
                left: 0,
                top: sectionListItem.title == '' ? '0px' : `${-(Number(sectionListItem.titleFont.fontSize) + 36)}px`,
                width: '100%',
                height: `${sectionListItem.titleFont.fontSize}px`,
                lineHeight: `${sectionListItem.titleFont.fontSize}px`,
                fontSize: `${sectionListItem.titleFont.fontSize}px`,
                font: `${sectionListItem.titleFont.font}px`,
                color: `${sectionListItem.titleFont.color}`,
                textAlign: 'left',
                userSelect: 'none',
              }}>
                {sectionListItem.title ? sectionListItem.title : ''}
              </div>}
            {/*内部cells*/}
            {
              sectionListItem.contentList.map((contentListItem, index) => {

                return (
                  <div className={styles.content} key={index}
                       style={{
                         height: currentTem.content.cellList[index].height ? `${currentTem.content.cellList[index].height}px` : 0,
                         width: currentTem.content.cellList[index].width ? currentTem.content.cellList[index].width : 0,
                         left: currentTem.content.cellList[index].x ? currentTem.content.cellList[index].x : 0,
                         top: currentTem.content.cellList[index].y ? currentTem.content.cellList[index].y : 0,
                         background: contentListItem.cover ? `url(${config.resPrefix}/${contentListItem.cover})` : '#82a503',
                         position: 'absolute',
                         cursor: 'pointer',
                       }}
                       onMouseOver={e => {
                         handleMouseOver(e, contentListItem)
                       }}
                       onMouseLeave={e => {
                         handleMouseLeave(e, contentListItem)
                       }}
                       onClick={e => {
                         handleCellClick(e, index, sectionListItem, index)
                       }}>
                    {
                      contentListItem.route && <div
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                        }}>
                        <img src={contentListItem.cover ? `${config.resPrefix}/${contentListItem.cover}` : ''}
                             className={styles.changeImg}/>
                        {contentListItem.specialIcon.cover &&
                        <img src={`${config.resPrefix}/${contentListItem.specialIcon.cover}`}
                             style={{
                               position: 'absolute',
                               height: `${contentListItem.specialIcon.h}px`,
                               width: `${ contentListItem.specialIcon.w}px`,
                               left: contentListItem.specialIcon.x ? `${contentListItem.specialIcon.x}px` : 0,
                               top: contentListItem.specialIcon.y ? `${contentListItem.specialIcon.y}px` : 0,
                             }} alt=""/>
                        }
                        <p style={sectionListItem.contentFont && {
                          height: `${sectionListItem.contentFont.fontSize}px`,
                          lineHeight: `${sectionListItem.contentFont.fontSize}px`,
                          fontSize: `${sectionListItem.contentFont.fontSize}px`,
                          font: `${sectionListItem.contentFont.font}`,
                          color: `${sectionListItem.contentFont.color}`,
                          top: `${contentListItem.height + 22}px`,
                          display: 'block',
                        }}
                           className={styles.p}>
                          {
                            contentListItem.name
                          }
                        </p>
                      </div>
                    }
                  </div>
                )
              })
            }
            <div className={styles.index}>{index + 1}号模板</div>
          </div>
        )
      })
      return templates
    }
  }

  return (
    <div
      className={styles.view}
      style={{
        backgroundImage: bgImgUrl ? `url(${config.resPrefix}/${bgImgUrl})` : currentPage.content && currentPage.content.background ? `url(${config.resPrefix}/${ currentPage.content.background})` : '',
      }}
      onDrop={drop}
      onDragOver={allowDrop}>
      {
        mapPage(currentPage)
      }
    </div>
  )
}
ViewPage.propTypes = {
  onDrop: PropTypes.func,
  onDragOver: PropTypes.func,
  dispatch: PropTypes.func,
}
export default connect(({ updatePage, dispatch, loading }) => ({
  updatePage,
  dispatch,
  loading,
}))(ViewPage)
