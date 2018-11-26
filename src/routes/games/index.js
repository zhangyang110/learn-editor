import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Input, Icon, Form, Radio, InputNumber, DatePicker, Button, Modal, Row, Col, } from 'antd'
import moment from 'moment';
import { routerRedux } from 'dva/router'
import { config } from 'utils'
import { Page, DropOption, SearchImage } from 'components'
import GamesModal from './GamesModal'

import styles from './index.less'



const Games = ({ games, dispatch, loading }) => {
  const columns = [{
    title: 'id',
    dataIndex: 'id',
    render: (text, record, index) => {
      return <span className={styles.globalTextSize} > {text} </span>
    },
  }, {
    title: '名称',
    dataIndex: 'name',

  }, {
    title: '图标',
    dataIndex: 'icon',
    render: (text, row, index) => {
      return <img src={`${config.resPrefix}/${text}`} className={text && styles.gamesListIcon} />;
    },
  }, {
    title: '背景',
    dataIndex: 'background',
    render: (text, row, index) => {
      return <img src={`${config.resPrefix}/${text}`} className={text && styles.gamesListImg} />;
    },
  }, {
    title: '评分',
    dataIndex: 'score',

  }, {
    title: '版本',
    dataIndex: 'version',

  }, {
    title: '修改时间',
    dataIndex: 'updated',
    render: text => (<span>{text.slice(0, 10)}</span>),
  }, {
    title: '修改',
    key: 'action',
    render: (text, record, index) => {

      // return <span> <Icon type="edit" className={styles.gameEdit} onClick={e => edit(record, index)} />  </span>
      return <DropOption onMenuClick={e => edit(record, index)}
        menuOptions={[{ key: '2', name: '修改' }]}
      />

    },
  },
  ]

  /**
   *  搜索框
   *  <a href="#" value={index} onClick={value => edit(value)} >Modify</a>
   */
  const Search = Input.Search;

  const FormItem = Form.Item;

  const dateFormat = 'YYYY/MM/DD';


  /**
   *  点击编辑后的回调方法
   */
  const edit = (value, index) => {
    dispatch({
      type: 'games/showModal',
      payload: {
        currentItem: value,
      },
    })

  }


  /**
     *  点击搜索后的回调方法
     */
  const searchClick = (value) => {
    console.log(value);
    games.searchKeyWord = value;
    dispatch({
      type: 'games/query',
      payload: {
        opts: {
          limit: 50,
          offset: 0,
          query: "name:" + value,
        }
      },
    })
  }


  /**
    * 显示搜索图片的弹框
    * @param {*} type
    */
  const showSearchModal = (type) => {
    games.searchType = type;
    dispatch({
      type: 'games/showSearchModal',
    })
  }


  /**
    *  弹框的初始数据
    */
  const modalProps = {
    item: games.currentItem,
    addImage: showSearchModal,
    deleteClick: deleteClick,
    visible: games.modalVisible,
    maskClosable: false,
    title: games.currentItem.name,
    wrapClassName: 'vertical-center-modal',
    width: 1000,
    onOk(data) {
      console.log(data);
      dispatch({
        type: `games/update`,
        payload: {
          id: games.currentItem.id,
          body: data,
        },
      })
    },
    onCancel() {
      dispatch({
        type: 'games/query',
        payload: {
          opts: {
            limit: 50000,
            offset: 0,
            query: "name:" + games.searchKeyWord,
          }
        },
      })
    },
  }



  function deleteClick(view, url) {
    // view.style.display = 'none';
    const original = games.currentItem.screenshot;
    let result = original.replace(url + '|', '');
    console.log('-------------------deleteClick-------------------------');
    console.log(result);
    console.log(original);
    console.log(games.currentItem.screenshot);
    if (result == games.currentItem.screenshot) {
      result = original.replace('|' + url, '');
      console.log(result);
      console.log(original);
      console.log(games.currentItem.screenshot);
      if (result == games.currentItem.screenshot) {
        result = '';
      }
    }
    games.currentItem.screenshot = result;
    console.log('-------------------deleteClick-------------------------');
    dispatch({
      type: 'games/showModal',
      currentItem: games.currentItem,
    })
  }



  return (
    <Page inner>
      <div className={styles.gameContiner}>
        <Search placeholder="输入游戏名称" className={styles.gameSearch} onSearch={value => searchClick(value)} />
      </div>
      <br />

      {/*  游戏列表  */}
      <Table columns={columns}
        dataSource={games.gamesData}
        rowKey={record => record.id}
        loading={loading.effects['games/query']}
      />

      {games.modalVisible && <GamesModal  { ...modalProps} />}

      {/* 搜索图片 */}
      {
        games.searchModalVisible &&
        <SearchImage
          dispatch={dispatch} types={games.types}
          searchData={games.imageList}    >
        </SearchImage>
      }

    </Page>
  )
}

Games.propTypes = {
  games: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ games, dispatch, loading }) => ({ games, dispatch, loading }))(Games)
