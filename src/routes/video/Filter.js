import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {FilterItem} from 'components'
import {Form, Button, Row, Col, DatePicker, Input, Cascader, Switch} from 'antd'

const Search = Input.Search
const {RangePicker} = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
                  onAdd,
                  onSearch,
                  filter,
                  form: {
                    getFieldDecorator,
                    // getFieldsValue,
                    // setFieldsValue,
                  },
                }) => {

  const {name} = filter

  return (
    <Row type="flex" justify="space-between">
      <Col {...TwoColProps} xl={{span: 4}} md={{span: 8}} sm={{span: 0}}>
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <div>
            <Button disabled size="large" type="primary" onClick={onAdd}>创建视频</Button>
          </div>
        </div>
      </Col>


      <Col {...ColProps} xl={{span: 4}} md={{span: 8}}>
        {getFieldDecorator('name', {initialValue: name})
        (<Search placeholder="通过视频名搜索" size="large" onSearch={onSearch}/>)}
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
