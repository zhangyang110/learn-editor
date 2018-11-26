import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Input, Icon, Row, Table, Modal, Upload, Button} from 'antd'
import {config} from 'utils'
import {Page} from 'components'
import styles from './index.less'
import {Search, UploadModal} from '../../components/index'
import UpdatePicture from './Updatepicture'
import {DropOption} from 'components'

function Image({image, dispatch, loading}) {
  const columns = [{
    title: '数据ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: '图片',
    dataIndex: 'url',
    width:100,
    render: (text, row, index) => {
      return <img src={`${config.resPrefix}/${text}`} className={styles.img} alt="xx"/>;
    },
  }, {
    title: '标签',
    dataIndex: 'tag',
  }, {
    title: '操作',
    key: 'action',

    render: (text, record) => {
      return <DropOption onMenuClick={e => handleMenuClick(record, e)}
                         menuOptions={[{key: '1', name: '更新标签'}, /*{key: '2', name: '更新图片'}*/]}
      />
    },
  },
  ];

  const handleMenuClick = (record, e) => {
    if (e.key == 1) {
      dispatch({
        type: 'image/showTag',
      })
    } else if (e.key == 2) {
      dispatch({
        type: 'image/showPicture',
      })
    }
    dispatch({
      type: 'image/showModal',
      payload: record
    })
  };
  const Search = Input.Search;

  //对话框默认属性值
  const modalProps = {
    item: image.currentItem,
    visible: image.modalVisible,
    title: image.currentItem.name,
    okText: '确定修改',
    cancelText: '取消修改',
    closable: false,
    onOk(e) {
      if (image.isTag) {
        dispatch({
          type: 'image/putTag',
          payload: {
            id: image.currentItem.id,
            tag: image.currentItem.tag
          }
        })
      } else {
        if (image.pictureFile !== null) {
          dispatch({
            type: 'image/putPic',
            payload: {
              id: image.currentItem.id,
              file: image.pictureFile
            }
          });
          dispatch({type: 'image/pictureFile'});

          dispatch({
            type: 'image/hideModal',
          })
        }

      }
    },
    onCancel() {
      dispatch({
        type: 'image/hideModal',
      })
    },
  };

  const onSearch = (values) => {
    if (values) {
      dispatch({
        type: 'image/query', payload: {
          tag: values, opts: {
            limit: 5000,
            offset: 0,
          }
        }
      })
    }
    else {
      return
    }
  };
  const onPressEnter = (e) => {
    onSearch(e.target.value);
  };
  return (
    <Page inner>
      <Row type="flex" justify="space-between" className={styles.row}>
        <UploadModal dispatch={dispatch} namespace='image'/>
        <Search
          placeholder="搜索图片"
          style={{width: 200}}
          onSearch={onSearch}
          onPressEnter={onPressEnter}
        />
      </Row>

      <Table
        columns={columns}
        dataSource={image.list}
        bordered
        rowKey={record => record.id}
        styles={styles}
        loading={loading.effects['image/query']}
        className={styles.fontSize}
      />

      <Modal {...modalProps} >
        {
          image.isTag ?
            <div>
              <span className={styles.updateTag}>更新标签名称:</span>
              <Input value={image.currentItem.tag}
                     className={styles.input}
                     size={"small"}
                     onChange={(e) => {
                       dispatch({type: 'image/setInput', payload: e.target.value})
                     }}/>
            </div>
            :
            <div>
              <img src={`${config.resPrefix}/${image.currentItem.url}`} alt="" className={styles.newImg}/>
              <span className={styles.span}>点击更换图片:</span>
              <UpdatePicture dispatch={dispatch}>
                <Button size={'default'}> <Icon type="upload"/></Button>
              </UpdatePicture>
            </div>
        }
      </Modal>
    </Page>
  )
}

Image.propTypes = {
  image: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(({image, dispatch, loading}) => ({image, dispatch, loading}))(Image)
