import React from 'react'
import PropTypes from 'prop-types'
import {Page} from 'components'
import {connect} from 'dva'
import styles from './index.less'
import {config} from 'utils'

const PreviewPage = ({previewPage, dispatch, loading}) => {
  const {currentPage, temps} = previewPage;
  const handleMouseOver = (e, contentListItem) => {
    if (e.target.tagName.toUpperCase() === 'IMG' && e.target.getAttribute('class') === 'changeImg___1Y6px' ||
      e.target.tagName.toUpperCase() === 'IMG' && e.target.getAttribute('class') === 'specialIcon___2A-MB') {
      if (contentListItem.activeCover != undefined) {
        e.target.parentNode.childNodes[0].setAttribute('src', `${config.resPrefix}/${ contentListItem.activeCover}`)
      }
    } else {
      return false
    }
  };
  const handleMouseLeave = (e, contentListItem) => {
    if ((e.target.tagName.toUpperCase() === 'IMG' && e.target.getAttribute('class') === 'changeImg___1Y6px' ) ||
      (e.target.tagName.toUpperCase() === 'IMG') ||
      (e.target.tagName.toUpperCase() === 'P')
    ) {
      e.target.parentNode.childNodes[0].setAttribute('src', `${config.resPrefix}/${contentListItem.cover}`)
    } else {
      return false
    }
  };
  const mapCells = (currentPage) => {
    if (currentPage !== '') {
      const currentItemContent = currentPage.content;
      const templates = currentItemContent.sectionList.map((sectionListItem, index) => {
        // 获取当前数据的模板 currentTem
        const currentTem = temps.filter((item) => {
          return item.id === sectionListItem.tid
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
        /*创建所有模板 */
        return (
          <div className="template"
               key={index}
               style={{
                 position: "relative",
                 width: 1680,
                 height: `${maxHeight}px`,
                 marginTop: sectionListItem.title != '' && sectionListItem.title != undefined ? `${Number(sectionListItem.titleFont.fontSize) + 36 + Number(sectionListItem.offset)}px` : `${Number(sectionListItem.offset)}px`,
               }}>

            {/*title 盒子*/}
            {
              sectionListItem.title && <div className="title" style={{
                position: 'absolute',
                left: 0,
                top: sectionListItem.title ? `${-(Number(sectionListItem.titleFont.fontSize) + 36)}px` : 0,
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
                const Cell = currentTem.content.cellList[index];
                return (
                  <div className={styles.content} key={index}
                       style={{
                         height: Cell.height ? Cell.height : 0,
                         width: Cell.width ? Cell.width : 0,
                         left: Cell.x ? Cell.x : 0,
                         top: Cell.y ? Cell.y : 0,
                         position: 'absolute',
                       }}
                       onMouseOver={e => {
                         handleMouseOver(e, contentListItem)
                       }}
                       onMouseLeave={e => {
                         handleMouseLeave(e, contentListItem)
                       }}>
                    {
                      contentListItem.route && <a href='javascript:;'
                                                  style={{
                                                    display: 'block',
                                                    width: '100%',
                                                    height: '100%',
                                                    position: 'relative',
                                                  }}>
                        <img src={contentListItem.cover ? `${config.resPrefix}/${contentListItem.cover}` : ''}
                             className={styles.changeImg}/>
                        {contentListItem.specialIcon.cover && <img
                          src={`${config.resPrefix}/${contentListItem.specialIcon.cover}`}
                          style={{
                            position: "absolute",
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
                        }} className={styles.p}>
                          {
                            contentListItem.name
                          }
                        </p>
                      </a>
                    }
                  </div>
                )
              })
            }
          </div>)
      });
      return templates
    }
  };

  return (
    <Page inner loading={loading.effects['previewPage/query']}>
      <div className={styles.mapCells}
           style={{
             backgroundImage: currentPage.content && currentPage.content.background ? `url(${config.resPrefix}/${currentPage.content.background})` : 'grey',
             backgroundRepeat: 'no-repeat',
             backgroundSize: 'cover',
             backgroundOrigin: 'content-box',
           }}>
        {
          mapCells(currentPage)
        }
      </div>
    </Page>)
};
PreviewPage.propTypes = {
  pages: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};
export default connect(({previewPage, dispatch, loading}) => ({previewPage, dispatch, loading}))(PreviewPage)
