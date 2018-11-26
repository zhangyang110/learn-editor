import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import city from '../../utils/city'

const notFoundModal = ({
                         ...NotFoundModalProps
                       }) => {

  //
  // const modalOpts = {
  //   ...NotFoundModalProps,
  //
  // }


  return (
    <Modal {...NotFoundModalProps}>
      <ul>
        {
          NotFoundModalProps.notFound.map(((item,index) => (
            <li key={index}>
              <p>{item}</p>
            </li>
          )))
        }
      </ul>
    </Modal>
  )
}

notFoundModal.propTypes = {
  type: PropTypes.string,
  onOk: PropTypes.func,
}

export default notFoundModal
