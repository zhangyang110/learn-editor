import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Input, Icon,  DatePicker, Button, Layout, notification, Modal } from 'antd'
import moment from 'moment';
import { config } from 'utils'
import { Page,DropOption } from 'components'
import TemplatesModal from './TemplatesModal'
import styles from './index.less'



const Templates = ({ templates, dispatch, loading }) => {
  const columns = [{
    title: 'id',
    dataIndex: 'id',
  }, {
    title: '模板名称',
    dataIndex: 'name',
  }, {
    title: '创建时间',
    dataIndex: 'created',
  }, {
    title: '修改时间',
    dataIndex: 'updated',
  }, {
    title: '是否发布',
    dataIndex: 'status',
    render: (text, record, index) => {
      return <span   className={ text == 1 && styles.templatesReleaseText } > {text == 0 ? "未发布" : "已发布"} </span>
    },
  }, {
    title: '操作',
    key: 'action',
    render: (text, record, index) => {
      const menus = [];
      if (record.status == 0) {
        menus.push({key: '1',name: '修改'});
        menus.push({key: '2',name: '发布'});
      }else{
        menus.push({key: '3',name: '查看'});
      }

      return <DropOption onMenuClick={e => actionClick(record,e)}
                         menuOptions={[ ...menus ]} >

      </DropOption>

    },
  },
  ]

  const Search = Input.Search;

  const tabsKey = templates.tabsKey;

  const templateList = "templateList";

  const createTemplate = "createTemplate";

  const confirm = Modal.confirm;


  const actionClick = (record,e) => {
    if (e.key == 2) {
      showConfirm(record)
      return;
    }
    jumpTemplateCreate(record.id);
  }

  /**
     *  点击搜索后的回调方法
     */
  const searchClick = (value) => {
    console.log(value);
    dispatch({
      type: 'templates/query',
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
   * 显示确认发布框
   */
  function showConfirm(record) {
    confirm({
      title: '提示',
      content: '确定要发布该模板吗? 一旦发布就不可再进行更改。',
      onOk() {
        dispatch({
          type: 'templates/publish',
          payload: {
            id: record.id,
          },
        })
      },
    });
  }



  /**
   * 跳转到模板编辑页面
   * @param {*} id
   */
  function jumpTemplateCreate(id) {
    dispatch({
      type: "templates/jump",
      payload: {
        id: id,
        currentPage: templates.currentPage,
      },
    })
  }

  /**
   * 页码变化时回调
   * @param {*当前列表页码} pagination
   */
  function pageChange(pagination) {
    templates.currentPage = pagination.current;
    dispatch({
      type: "templates/emptyMessage",
    })
  }


  return (

    <Page inner styles={{ padding: 0 }}  >

      {/* 顶部的按钮和搜索 */}
      <div className={styles.templatesContiner}>
        <Button type="primary" onClick={e => jumpTemplateCreate(-1)} className={styles.globalTextSize}  > 创建模板 </Button>
        <Search placeholder="输入模板名称" className={styles.templatesSearch} onSearch={value => searchClick(value)} />
      </div>
      <br />
      
      <Table columns={columns} dataSource={templates.templatesData} pagination={{current: templates.currentPage }}
      onChange={ (pagination) => pageChange(pagination)} rowKey={record => record.id} loading={loading.effects['templates/query']} />

    </Page>
  )
}

Templates.propTypes = {
  templates: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ templates, dispatch, loading }) => ({ templates, dispatch, loading }))(Templates)
