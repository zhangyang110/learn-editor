import {Button, Upload, Icon, Form} from 'antd';

class UpdatePicture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: []
    }
  }

  state = {visible: false};
  handleBeforeUpload = (file) => {
    this.setState({
        fileList: [file]
      }
    );
    this.props.dispatch({
      type: 'image/setPicture', payload: {
        pictureFile: file
      }
    });

    return false;
  };
  handleRemove = (file) => {
    console.log(file);
    this.setState({
      fileList: []
    })
  };



  render() {
    return (
      <Upload
        onChange={this.handleOnChange}
        onRemove={this.handleRemove}
        name='file'
        action={'/'}
        fileList={this.state.fileList}
        beforeUpload={this.handleBeforeUpload}
        data={this.state.data}
        multiple={false}>
        <Button><Icon type="upload"/> Upload</Button>
      </Upload>
    )
  }

}

export default UpdatePicture;
