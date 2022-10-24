import React from 'react';
import Modal from 'react-modal';
import TranscriptAPI from '../services/TranscriptAPI';
import BaseButton from './BaseButton';
import DragDropFile from './DragDropFile';

class TranscriptUploadModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  handleFile(e) {
    this.setState({file: e.target.files})
  }

  async handleUpload(e) {
    let fileUploaded = new FileReader();
    fileUploaded.readAsText(this.state.file[0]);
    let result;
    fileUploaded.addEventListener("loadend", e => {
      result = e.target.result;
      const formData = {transcript: result};
      TranscriptAPI.post(formData);
    });
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
        ariaHideApp={false}
      >
        <h2 className="justify-center flex m-3">
          Drag and drop file or upload below.
        </h2>
          <div className={"justify-center flex m-7 flex-col"}>
              <input
                type="file"
                name="transcript"
                data-testid="fileInput"
                onChange={(e)=>this.handleFile(e)}>
              </input>
              <BaseButton
                data-testid="uploadButton"
                click={(e)=>this.handleUpload(e)}
                text="Upload"
              />           
        </div>
      </Modal>
    )
  }
}

export default TranscriptUploadModal;