import React from 'react';
import Modal from 'react-modal';
import TranscriptAPI from '../services/TranscriptAPI';
import BaseButton from './BaseButton';

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
    TranscriptAPI.post(formData)
  }

  componentDidMount() {
    Modal.setAppElement("body");
  }

  render() {
    return (
      <Modal
        isOpen={this.props.show}
        className="container w-60 md:w-80 mx-auto bg-purple-200 rounded-lg shadow-lg py-3 mt-[40vh]"
        onRequestClose={this.props.toggleModal}
        shouldCloseOnEsc={true}
      >
        <h2 className="justify-center flex m-3" data-testid="upload-transcript-modal">
          Drag and drop file or upload below.
        </h2>
          <div className={"justify-center flex m-7 flex-col"}>
              <input
                type="file"
                name="transcript"
                onChange={(e)=>this.handleFile(e)}>
              </input>
              <BaseButton
                click={(e)=>this.handleUpload(e)}
                text="Upload"
              />           
        </div>
      </Modal>
    )
  }
}

export default TranscriptUploadModal;