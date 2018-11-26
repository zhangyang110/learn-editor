import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Table, Input, Form, Tabs, Button} from 'antd'
import {config} from 'utils'
import {Page} from 'components'
import {DropOption} from 'components'
import styles from './index.less'

const Pages = ({pages, dispatch, loading}) => {
  const columns = [{
    title: '数据ID',
    dataIndex: 'id',

  }, {
    title: '页面名称',
    dataIndex: 'name',
  }, {
    title: '创建时间',
    dataIndex: 'created',
    render: text => (<span>{text.slice(0,10)}</span>)
  }, {
    title: '修改时间',
    dataIndex: 'updated',
    render: text => (<span>{text.slice(0,10)}</span>)
  }, {
    title: '版本',
    dataIndex: 'version',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => {
      return <DropOption onMenuClick={e => handleMenuClick(record, e)}
                         menuOptions={[{key: '1', name: '查看'}, {key: '2', name: '修改'}]}
      />
    },
  },
  ];
  const Search = Input.Search;
  const handleMenuClick = (record, e) => {
    if (e.key == 1) {
      dispatch({
        type: "pages/jump",
        payload: {
          id: record.id,
          jumpType: 'previewPage'
        },
      })
    } else if (e.key == 2) {
      dispatch({type: 'pages/jump', payload: {id: record.id, jumpType: 'updatePage', }})
    }
  };
  const jumpToCreatePage = () => {
    dispatch({type: 'pages/jump', payload: {jumpType: 'createPage'}})
  };
  /**
   *  点击搜索后的回调方法
   */
  const searchClick = (value) => {
    dispatch({
      type: 'pages/query',
      payload: {
        opts: {
          limit: 50,
          offset: 0,
          query: "name:" + value,
        }
      },
    })
  };

  const paginationProps = {
    current: Number(pages.paginationNum),
  }
  const TableProps = {
    columns: columns,
    dataSource: pages.pagesData,
    rowKey: record => record.id,
    loading: loading.effects['pages/query'],
    pagination: {...paginationProps},
    onChange: (pagination) => {
      dispatch({type:'pages/jump',payload:{jumpType:'setPagination',paginationNum:pagination.current}})
    }

  }
  return (
    <Page inner>
      <div className={styles.pagesContainer}>
        <Button type="primary" onClick={jumpToCreatePage}>创建页面</Button>
        <Search placeholder="输入页面名称" className={styles.pagesSearch} onSearch={value => searchClick(value)}/>
      </div>
      <br/>
      <Table {...TableProps}/>
    </Page>
  )
}
Pages.propTypes = {
  pages: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({pages, dispatch, loading}) => ({pages, dispatch, loading}))(Pages)
