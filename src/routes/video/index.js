import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Icon, Tabs, message, Upload } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import Iconfont from '../../components/Iconfont'
import Filter from './Filter'
import List from './List'
import Modal from './Modal'
import NotFoundModal from './NotFoundModal'
import XLSX from 'xlsx'

const TabPane = Tabs.TabPane
const Dragger = Upload.Dragger


const Video = ({ dispatch, video, loading }) => {
  const { list, userRole, pagination, currentItem, modalVisible, modalType ,notFound,notFoundVisible} = video
  // const wb//读取完成的数据
  // const rABS = false //是否将文件读取为二进制字符串
  // const values = []//最终要的数组数据
  // const week = 0//初始默认定义选取第一周的数据
  // const day = 'B'//初始默认定义选取第一天的数据，第一天就是A列。看表；
  // const weekDay = []

  const modalProps = {
    dispatch,
    modalType: modalType,
    item: currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/update'],
    title: `${ modalType === 'updateShow_name' ? '更新显示名称' : '更新类型'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      const body = Object.assign({}, currentItem, { [`${modalType === 'updateShow_name' ? 'show_name' : 'ad_tag'}`]: data.val })
      dispatch({
        type: 'video/update',
        payload: { id: currentItem.id, body },
      })
    },
    onCancel() {
      dispatch({
        type: 'video/hideModal',
      })
    },
  }
  const listProps = {
    dispatch: dispatch,
    dataSource: list,
    loading: loading.effects['user/query'],
    pagination,
    // location,
  }
  const filterProps = {
    filter: {
      ...location.query,
    },
    onSearch(fieldsValue) {
      // console.log(fieldsValue)
      dispatch({
        type: 'video/query',
        payload: {
          opts: {
            limit: 50000000,
            offset: 0,
            query: fieldsValue ? `name:${fieldsValue}` : fieldsValue,
          },
        },
      })
    },

  }
  const beforeUpload = (file, fileList) => {
    return false
  }
  const uploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: beforeUpload,
    onChange(info) {
      importf(info)
    },
  }

  const importf = (obj) => {//导入文件
    const values = []//最终要的数组数据
    const week = 0//初始默认定义选取第一周的数据
    const day = 'B'//初始默认定义选取第一天的数据，第一天就是A列。看表；
    const weekDay = []
    const fileNames = []
    const showNames = []
    let wb
    let cells
    let num = 2
    let curFielNameCel = `B${num}`
    let curShowNameCel = `C${num}`


    var f = obj.file//f为读取到的文件
    var reader = new FileReader()
    reader.onload = function (e) {
      var data = e.target.result
      if (false) {
        wb = XLSX.read(btoa(fixdata(data)), {//手动转化
          type: 'base64',
        })
      } else {
        wb = XLSX.read(data, {
          type: 'binary',
        })
        cells = wb.Sheets[wb.SheetNames[week]]
      }

      while (typeof(cells[curFielNameCel]) !== 'undefined') {
        fileNames.push(cells[curFielNameCel].v)
        num += 1
        curFielNameCel = `B${num}`
      }
      num = 2
      while (typeof(cells[curShowNameCel]) !== 'undefined') {
        showNames.push(cells[curShowNameCel].v)
        num += 1
        curShowNameCel = `C${num}`
      }
      dispatch({type:'video/putName',payload:{names:fileNames,showNames}})

    }

    if (false) {
      reader.readAsArrayBuffer(f)
    } else {
      reader.readAsBinaryString(f)
    }
  }

  const fixdata = (data) => { //文件流转BinaryString
    var o = '',
      l = 0,
      w = 10240
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
    return o
  }

const NotFoundModalProps={
  notFound:notFound,
  visible:notFoundVisible,
  keyboard:true,
  title:'无法替换的文件列表',
  onOk: () => {
    dispatch({ type: 'video/hideNotFoundModal' })
  },
  onCancel:()=>{
    dispatch({type: 'video/hideNotFoundModal'})
  }
}
  return (
    <Page inner>
      <Tabs defaultActiveKey="1">
        <TabPane tab="视频列表" key="1">
          <Filter {...filterProps} />
          <List {...listProps} />
        </TabPane>
        <TabPane tab="批量修改显示名称" key="2">
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox"/>
            </p>
            <p className="ant-upload-text">点击本区域进行文件上传</p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company
              data or other band files</p>
          </Dragger>
        </TabPane>
      </Tabs>
      {modalVisible && <Modal {...modalProps} />}
      {notFoundVisible&&<NotFoundModal  {...NotFoundModalProps} />}
      </Page>
  )
}

Video.propTypes = {
  video: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ video, loading }) => ({ video, loading }))(Video)
