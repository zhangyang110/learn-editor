import React from 'react'
import PropTypes from 'prop-types'
import { Input, Modal, Row, Col, Tooltip, Upload, Button, Icon } from 'antd'
import styles from './SearchImage.less'
import { config } from 'utils'



/**
 * 
 * @param {* dispatch 用于发送各种事件 } param0
 * @param  {* searchData 搜索结果 } param1
 * @param  {* types（搜索，确定，上传）等操作要发送的事件类型 } param2
 */
const SearchTest = ({ dispatch, searchData, types }) => {

    /**
     * 弹框初始化数据
     */
    const searchModalProps = {
        footer: null,
        visible: true,
        maskClosable: false,
        title: '搜索图片',
        wrapClassName: 'vertical-center-modal',
        width: 1000,
        onCancel() {
            dispatch({
                type: types.cancel,
            })
        }
    }

    /**
     * 搜索图片
     * @param {*关键字} value 
     */
    function searchClick(value) {
        console.log(value);
        
        dispatch({
            type: types.searchClick,
            payload: {
                tag: value,
                opts: {
                    limit: 50,
                    offset: 0,
                }
            },
        })
    }

    /**
     * 选择某张图片的点击事件
     * @param {*图片链接} url 
     */
    function imgClick(url) {
        console.log(url);
        
        dispatch({
            type: types.imgClick,
            url: url,
        })
    }

    /**
     * 将图片的搜索结果展示出来
     */
    function initImageCol() {
        const divs = [];
        for (let index = 0; index < searchData.length; index++) {
            const item = searchData[index];
            divs.push(
                <Col span={4} key={index}>
                    <Tooltip placement="topLeft" title={item.tag} key={index} arrowPointAtCenter='true'>
                        <img src={`${config.resPrefix}/${item.url}`} className={styles.imageResult}
                            onClick={e => imgClick(item.url)} />
                    </Tooltip>
                </Col>
            )
        }
        return divs;
    }

    /**
     * 选择本地文件后只获取路径不进行上传
     * @param {*文件路径} file 
     */
    const uploadBefore = (file) => {
       searchData = {
           ...searchData,
           file: file,
       }
        return false;
    }

    /**
     * 图片tag改变监听
     * @param {*tag改变的值} value 
     */
    function onTagNameChange(value) {
        if (searchData.tagName == undefined) {
            searchData = {
                ...searchData,
                tagName: value,
            };
        } else {
            searchData.tagName = value;
        }
    }

    /** 
     * 上传图片
     */
    const onUploadClick = () => {
        console.log('upload click');
        
        dispatch({
            type: types.upload,
            payload: {
                tag: searchData.tagName,
                file: searchData.file,
            },
        })
    }



    return (
        <Modal {...searchModalProps} >
            <div className={styles.searchContainer} >
                搜索图片：<Input.Search placeholder="图片名称" className={styles.seriesImageSearch} onSearch={value => searchClick(value)} />
                <Button type="primary" onClick={onUploadClick} className={styles.submit} >上传</Button>
                <Input placeholder='请输入图片标签' className={styles.seriesImageLoad} onChange={e => onTagNameChange(e.target.value)} />
                <Upload name="file" action="/" listType="text" beforeUpload={file => uploadBefore(file)}
                    className={styles.marleft}   >
                    <Button> <Icon type="upload" /> 选择本地图片 </Button>
                </Upload>
            </div>
            <br /> <br />
            {/* 图片搜索结果 */}
            {
                searchData &&
                <Row gutter={16}>
                    {initImageCol()}
                </Row>
            }

        </Modal>
    )

}

SearchTest.propTypes = {

    dispatch: PropTypes.func,
    searchData: PropTypes.array,
}

export default SearchTest