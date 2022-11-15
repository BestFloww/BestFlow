import React from 'react';
import Modal from 'react-modal';
import store from "../../store.js";
import { setTranscriptUploadStatus, setUploadedProjectIds } from '../../store/transcriptUploadSlice.js';
import { setProjectIdToBeDisplayed, setOverrideStatus } from '../../store/analyzeTranscriptSlice.js';
import TranscriptAPI from '../../services/TranscriptAPI';
import BaseButton from '../general/BaseButton';
import OverrideModal from "./OverrideModal";

class TranscriptUploadModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      isFileValid: null,
      showOverrideModal: false,
      override: false,
    };
  }

  toggleOverrideModal = () => {
    store.dispatch(setOverrideStatus(false));
    this.setState({showOverrideModal: !this.state.showOverrideModal});
  }

  handleUploadOverride = () => {
    this.setState({override: true}, () => {
      this.handleUpload(this.state.file)
    });
  }

  async handleFile(e) {
    let fileUploaded = new FileReader();
    fileUploaded.readAsText(e.target.files[0]);
    fileUploaded.onloadend = (e) => this.handleData(e.target.result);
  }

  handleData(result) {
    if (!this.validateData(result)) {
      this.setState({isFileValid: false});
    } else{
      this.setState({
        file: {transcript: result},
        isFileValid: true,
      });
    }
  }

  checkProperties(intent) {
    return (!intent.project_id || !intent.trace_type || !intent.trace_payload);
  }

  validateData(data) {
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.data){
        for (const intent of parsedData.data) {
          if (this.checkProperties(intent)){
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async handleUpload(file) {
    try {
      if(this.state.override){
        file.override = true;
        this.setState({override: false});
      }

      const response = await TranscriptAPI.post(file);
      this.props.toggleModal();
      store.dispatch(setTranscriptUploadStatus(true));
      store.dispatch(setUploadedProjectIds(response.data.projectIds));
      store.dispatch(setProjectIdToBeDisplayed(response.data.projectIds[0]));

    } catch (e) {
      if(e.response.data.error === "Project ID is already present. Do you want to override?"){
        this.toggleOverrideModal();
      }
      else {
        window.alert("Error in uploading transcript. " + e.response.data.error);
      }
      store.dispatch(setTranscriptUploadStatus(false))
    }
  }

  componentDidMount() {
    Modal.setAppElement("body");
  }

  render() {
    return (
      <Modal
        isOpen={this.props.show}
        className="container w-60 md:w-80 mx-auto bg-purple-100 font-cabin rounded-lg shadow-lg py-3 mt-[40vh] flex flex-col"
        onRequestClose={this.props.toggleModal}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
      >

        {this.state.isFileValid === false && 
          <h3 className="full text-center -mt-3 rounded-t-lg bg-red py-3 ">
            Please upload a valid JSON
          </h3>
        }
        
        <h2 className="justify-center flex m-3 -mb-2" data-testid="upload-transcript-modal">
          Drag and drop file or upload below. 
        </h2>
          <div className="justify-center flex m-7 flex-col">
              <input
                className="mb-7 ml-7"
                type="file"
                name="transcript"
                data-testid="fileInput"
                onChange={(e)=>this.handleFile(e)}>
              </input>
              <div className="justify-center flex">
                <BaseButton
                  click={(e)=>this.handleUpload(this.state.file)}
                  text="Upload"
                  size="sm"
                  isDisabled={!this.state.isFileValid}
                />       
              </div>
            <div className="justify-center flex">
              <OverrideModal
                show={this.state.showOverrideModal}
                toggleModal={this.toggleOverrideModal}
                uploadFileWithOverride={this.handleUploadOverride}
                />
            </div>
        </div>
      </Modal>
    )
  }
}

export default TranscriptUploadModal;