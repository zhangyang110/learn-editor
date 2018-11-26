import react from 'react'
import {Modal, Input, Row, Col, Tooltip,message} from 'antd'
import {connect} from 'dva'
import {config} from 'utils'
import UploadModal from "../../../components/UploadModal/UploadModal";

const Search = Input.Search;
const SearchModal = ({createPage, dispatch, loading}) => {
  const {imgData,searchType} = createPage;
  const imgClick = (imgUrl) => {
    /*根据searchType 不同判断*/
    if(searchType==='searchBgImg'){
      dispatch({type:'createPage/setUrl',payload:{bgImgUrl:imgUrl,searchType:'searchBgImg'}})

    }else if(searchType==='searchCoverImg'){
      dispatch({type:'createPage/setUrl',payload:{coverImgUrl:imgUrl,searchType:'searchCoverImg'}})
    }else if(searchType==='searchActiveCoverImg'){
      dispatch({type:'createPage/setUrl',payload:{activeCoverImgUrl:imgUrl,searchType:'searchActiveCoverImg'}})
    }  else if(searchType==='searchSpecialCoverImg'){
      dispatch({type:'createPage/setUrl',payload:{specialCoverImgUrl:imgUrl,searchType:'searchSpecialCoverImg'}})
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
  };
  const searchModalProps = {
    width: 1000,
    visible: createPage.searchModalVisible,
    onCancel: () => {
      // dispatch({type: "createPage/hideSearchModal", payload: ''})
      dispatch({type:'createPage/public',payload:{ searchModalVisible: false, imgData: []}})
    },
    onOk: () => {
      // dispatch({type: "createPage/hideSearchModal", payload: ''})
      dispatch({type:'createPage/public',payload:{ searchModalVisible: false, imgData: []}})

    },
    loading:loading.effects['createPage/searchImg'],
  }
  const searchInputProps = {

    onSearch(value) {
      if(!value){
        message.warning('请输入名称');
        return false
      }
      dispatch({type: 'createPage/searchImg', payload: {tag: value, opts: {limit: 5000, offset: 0}}})
    }
  }

  return (
    <Modal  {...searchModalProps}>
      <Row>
        <Col span={8}> <Search placeholder="输入图片名称" style={{width: 300}} {...searchInputProps}/></Col>
        <Col span={14}> <UploadModal dispatch={dispatch} namespace='createPage'/></Col>
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
export default connect(({createPage, dispatch, loading}) => ({
  createPage,
  dispatch,
  loading
}))(SearchModal)
