import React, { Component } from 'react';
import axios from 'axios';

class TranscriptUploadModal extends Component {

  state = {
    file: null
  }

  handleFile(e) {
    console.log(e.target.files, "File Uploaded");
    console.log(e.target.files[0], "First Object of File Upload");
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

  render() {
    if (!this.props.show) {
      return null;
    }
    return <div className="modalBackground" data-testid="upload-transcript-modal">
      <div className="modalContainer">
        <div className="titleCloseButton">
          <button> x </button>
        </div>
        <div className="title">
          <h1>
            Please upload your transcript below.
          </h1>
        </div>
        <div className="body">
          <div className="fileSelection">
            <input type="file" name="file" onChange={(e)=>this.handleFile(e)}></input>
          </div>

          <br />
          <button type="button" onClick={(e)=>this.handleUpload(e)}> Upload </button>
        </div>
      </div>
    </div>;
  }
}

export default TranscriptUploadModal;