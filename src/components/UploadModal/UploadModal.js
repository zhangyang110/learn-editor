import {Modal, Button, Input, Form, Upload, Icon} from 'antd';

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
class UploadModal extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {visible: false};

  showModal = () => {
    this.setState({
      visible: true,
      fileList: []
    });
  }

  handleOk = (e) => {
    let inputTargetVal = this.props.form.getFieldValue('tag')
    if (inputTargetVal && this.state.fileList.length > 0) {
      this.setState({
        visible: false,
      });
      this.props.dispatch({type: `${this.props.namespace}/post`, payload: {file: this.state.fileList, tag: inputTargetVal}})
    } else {
      return false
    }
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleBeforeUpload = (file) => {
    this.setState({
        fileList: [file]
      }
    )
    return false;
  }

  handleRemove = (file) => {
    console.log(file);
    this.setState({
      fileList: []
    })
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>上传图片</Button>
        <Modal
          title="图片上传"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <Form>
            <FormItem label={'请键入标签名'} {...formItemLayout}  wrapperCol={{span:12}}>
              {this.props.form.getFieldDecorator('tag')(<Input placeholder='请输入图片标签' />)}
            </FormItem>
            <FormItem label={'请上传图片'} {...formItemLayout}>
              <Upload
                onRemove={this.handleRemove}
                name='file'
                action={'/'}
                fileList={this.state.fileList}
                beforeUpload={this.handleBeforeUpload}
                data={this.state.data}
              >
                <Button><Icon type="upload"/> Upload</Button>
              </Upload>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(UploadModal);
