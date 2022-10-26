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

  async handleFile(e) {
    let fileUploaded = new FileReader();
    fileUploaded.readAsText(e.target.files[0]);
    fileUploaded.onloadend = (e) => this.handleData(e.target.result);
  }

  handleData(result) {
    if (!this.validateData(result)) {
      console.log(result)
      this.setState({isFileValid: false});
    } else{
      this.setState({
        file: {transcript: result},
        isFileValid: true,
      });
    }
  }

  validateData(data) {
    try {
      const parsedData = JSON.parse(data);
      return parsedData.data;
    } catch (error) {
      return false;
    }
  }

  async handleUpload(file) {
    TranscriptAPI.post();
  }

  componentDidMount() {
    Modal.setAppElement("body");
  }

  render() {
    return (
      <Modal
        isOpen={this.props.show}
        className="container w-60 md:w-80 mx-auto bg-purple-200 rounded-lg shadow-lg py-3 mt-[40vh] flex flex-col"
        onRequestClose={this.props.toggleModal}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
      >
        {this.state.isFileValid === false && 
          <h3 className="bg-red-100 h-full text-center -mt-3 rounded-t-lg">
            Please upload a valid JSON
          </h3>
        }

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
                click={() => this.handleUpload(this.state.file)}
                text="Upload"
                isDisabled={!this.state.isFileValid}
              />           
        </div>
      </Modal>
    )
  }
}

export default TranscriptUploadModal;