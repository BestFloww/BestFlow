import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';

class TranscriptUploadModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }
  
  handleFile(e) {
    console.log(e.target.files, "File Uploaded");
    this.setState({file: e.target.files})
  }

  handleUpload(e) {
    let file=this.state.file
    let formData= new FormData()

    formData.append('transcript', file)

    axios({
      url: '/some/api',
      method: "PUT",
      headers:{
        authorization: 'token'
      },
      data: formData
    })
  }

  componentDidMount() {
    Modal.setAppElement("body");
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        className="reactModal justify-center bg-purple-200 rounded-lg shadow-lg w-80 h-50"
        onRequestClose={this.props.onRequestClose}
      >
        <h2 className="m-3">{"Upload File Below"}</h2>
          <div className={"modalContainerVertical"}>
            <div className={"modalContainer m-3"}>
              <input
                type="file"
                name="new_file"
                onChange={(e)=>this.handleFile(e)}>
              </input>
            </div>
            <div className={"modalContainer"}>
              <button
                type="button"
                className="bg-purple-300 rounded-lg shadow-lg hover:bg-purple-200 active:bg-purple-400 m-3 py-1 px-2"
                onClick={(e)=>this.handleUpload(e)}>
                  Upload
              </button>               
            </div>
        </div>
      </Modal>
    )
  }
}

export default TranscriptUploadModal;