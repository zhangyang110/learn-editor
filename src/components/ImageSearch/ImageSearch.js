import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Input, Modal, Row, Col, Tooltip} from 'antd'
import styles from './imageSearch.less'
import {config} from 'utils'

class ImageSearch extends React.Component {

  state = {};

  /**
   * 根据搜索的图片数量展示出来
   */
  initImageCol = (searchData, imgClick) => {
    const divs = [];
    for (let index = 0; index < searchData.length; index++) {
      const item = searchData[index];
      divs.push(
        <Col span={4} key={index}>
          <Tooltip placement="topLeft" title={item.tag} key={index} arrowPointAtCenter='true'>
            <img src={`${config.resPrefix}/${item.url}`} className={styles.imageResult}
                 onClick={e => imgClick(item.url)}/>
          </Tooltip>
        </Col>
      )
    }
    return divs;
  }


  render() {

    const {cancelClick, searchData, imgClick, searchClick} = this.props

    const searchModalProps = {
      footer: null,
      visible: true,
      maskClosable: false,
      title: '搜索图片',
      wrapClassName: 'vertical-center-modal',
      width: 1000,
      onCancel: cancelClick,
    }

    return (
      <Modal {...searchModalProps} >
        <Input.Search placeholder="图片名称" className={styles.seriesImageSearch} onSearch={value => searchClick(value)}/>
        <br/> <br/>

        {/* 图片搜索结果 */}
        {
          searchData &&
          <Row gutter={16}>
            {this.initImageCol(searchData, imgClick)}

          </Row>
        }

      </Modal>
    )
  }
}


export default ImageSearch;
