import react from 'react'
import {Modal, Input, Row, Col, Tooltip,message} from 'antd'
import {connect} from 'dva'
import {config} from 'utils'
import UploadModal from "../../components/UploadModal/UploadModal";

const Search = Input.Search;
const SearchModal = ({subjectSeries, dispatch, loading}) => {

  const {imgData,searchType} = subjectSeries;

  const imgClick = (imgUrl) => {
    /*根据searchType 不同判断*/
     if(searchType==='searchBackgroundImg'){
      dispatch({type:'subjectSeries/setUrl',payload:{backgroundUrl:imgUrl,searchType:'searchBackgroundImg'}})
    }else if(searchType==='searchCoverImg'){
      dispatch({type:'subjectSeries/setUrl',payload:{coverUrl:imgUrl,searchType:'searchCoverImg'}})
    }
  };

  const mapImgList = (imgData) => {
    const imgs = [];
    for (let index = 0; index < imgData.length; index++) {
      const item = imgData[index];
      imgs.push(
        <Col span={4} key={index}>
          <Tooltip placement="topLeft" title={item.tag} key={index} arrowPointAtCenter='true'>
            <img src={`${config.resPrefix}/${item.url}`} style={{
              border: '1px solid #1296db',
              width: 150,
              height: 150,
              cursor: 'pointer'
            }} onClick={() => imgClick(item.url)}/>
          </Tooltip>
        </Col>
      )
    }
    return imgs
  }

  const searchModalProps = {
    width: 1000,
    visible: subjectSeries.searchModalVisible,
    onCancel: () => {
      dispatch({type: "subjectSeries/public", payload: {searchModalVisible: false, imgData: []}})
    },
    onOk: () => {
      dispatch({type: "subjectSeries/public", payload: {searchModalVisible: false, imgData: []}})
    }
  }
  const searchInputProps = {
    onSearch(value) {
      if(!value){
        message.warning('请输入名称');
        return false
      }
      dispatch({type: 'subjectSeries/searchImg', payload: {tag: value, opts: {limit: 5000, offset: 0}}})
    }
  }

  return (
    <Modal  {...searchModalProps}>
      <Row>
        <Col span={8}> <Search placeholder="输入图片名称" style={{width: 300}} {...searchInputProps}/></Col>
        <Col span={14}> <UploadModal dispatch={dispatch} namespace='subjectSeries'/></Col>
      </Row>
      <br/><br/>
      {
        <Row gutter={16}>
          {imgData.length > 0 ? mapImgList(imgData) : ''}
        </Row>
      }
    </Modal>
  )


}
export default connect(({subjectSeries, dispatch, loading}) => ({
  subjectSeries,
  dispatch,
  loading
}))(SearchModal)
