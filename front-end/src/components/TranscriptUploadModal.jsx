import React from 'react';
import Modal from 'react-modal';
import TranscriptAPI from '../services/TranscriptAPI';
import BaseButton from './BaseButton';

class TranscriptUploadModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      isFileValid: null,
    };
  }

  handleFile(e) {
    let fileUploaded = new FileReader();
    fileUploaded.readAsText(e.target.files[0]);
    let result;
    fileUploaded.addEventListener("loadend", e => {
      result = e.target.result;
      if (!this.validateData(result)) {
        this.setState({isFileValid: false});
      } else{
        this.setState({
          file: {transcript: result},
          isFileValid: true,
        });
      }
    });
  }

  validateData(data) {
    try {
      const parsedData = JSON.parse(data);
      return parsedData.data;
    } catch (error) {
      return false;
    }
  }

  async handleUpload(e) {
    TranscriptAPI.post(this.state.file);
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

        <h2 className="justify-center flex m-3" data-testid="upload-transcript-modal">
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
                isDisabled={!this.state.isFileValid}
              />           
        </div>
      </Modal>
    )
  }
}

export default TranscriptUploadModal;