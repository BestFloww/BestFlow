import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
//import TranscriptAPI from "./services/TranscriptAPI";

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
    const file=this.state.file;
    const formData= new FormData();

    formData.append('transcript', file)
    //TranscriptAPI.post({data:formData})
  }

  componentDidMount() {
    Modal.setAppElement("body");
  }

  render() {
    return (
      <Modal
        isOpen={this.props.show}
        className="container mx-auto bg-purple-200 rounded-lg shadow-lg py-3 m-12"
        onRequestClose={this.props.toggleModal}
        shouldCloseOnEsc={true}
      >
        <h2 className="justify-center flex m-3">
          Drag and drop file or upload below.
        </h2>
          <div className={"justify-center flex m-7"}>
              <input
                type="file"
                name="new_file"
                onChange={(e)=>this.handleFile(e)}>
              </input>
              <button
                type="button"
                className="bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 active:bg-gray-300 py-1 px-2"
                onClick={(e)=>this.handleUpload(e)}>
                  Upload
              </button>               
        </div>
      </Modal>
    )
  }
}

export default TranscriptUploadModal;