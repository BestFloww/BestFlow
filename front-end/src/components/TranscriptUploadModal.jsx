import React, { Component } from 'react';
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
        isOpen={this.props.show}
        className="reactModal bg-purple-200"
        onRequestClose={this.props.toggleModal}
        shouldCloseOnEsc={true}
        style={{overlay: {
          position:'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)'
        }, content: {
          position: 'fixed',
          justifyContent: 'center',
          top: '35vh',
          left: '35vw',
          right: '35vw',
          bottom: '35vh',
          border: '1px solid #ccc',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px'
        }
      }}
      >
        <h2 className="m-3 justify-center flex">{"Drag and drop file or upload below."}</h2>
          <div className={"modalContainerVertical justify-center flex"}>
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