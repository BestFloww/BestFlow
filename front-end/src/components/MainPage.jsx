import React, { Component } from 'react';
import { connect } from "react-redux";
import store from "../store.js";
import { openAnalysisPage } from "../store/switchPageSlice.js";
import BaseButton from "./BaseButton.jsx";
import TranscriptUploadModal from "./TranscriptUploadModal.jsx";
import Title from "./icons/title.jsx";
import {exampleTranscript} from "./helpers/ExampleTranscript.js";

class MainPage extends Component {
  state = {
    showTranscriptUploadModal: false
  }

  toggleTranscriptUploadModal = () => {
    this.setState({showTranscriptUploadModal: !this.state.showTranscriptUploadModal});
  }

  openAnalysisPage = () => {
    store.dispatch(openAnalysisPage());
  }

  downloadTranscriptTemplate = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(exampleTranscript)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "template-transcript-JSON.json"
    document.body.appendChild(element);
    element.click();
  }

  render() {
    let isTranscriptUploaded = this.props.isTranscriptUploaded;
    return(
      <div className="MainPage bg-purple-100 absolute inset-0" data-testid="main-page">
        <div className="flex gap-y-7 w-full flex-col mt-[25vh]">
          <div className="justify-center flex">
            <Title />
          </div>
          <p className="justify-center text-xl flex font-cabin -mt-7"> Problem diagnostic tool for chatbot transcripts </p>
          <div className="justify-center flex mt-10">
            <BaseButton
              click={this.toggleTranscriptUploadModal}
              text="Upload Transcript"
              size="lg"
            />
          </div>
          <div className="justify-center flex">
            <TranscriptUploadModal
              show={this.state.showTranscriptUploadModal}
              toggleModal={this.toggleTranscriptUploadModal}
            />
          </div>
          <div className="justify-center flex">
            <BaseButton
              click={this.openAnalysisPage}
              text="View Analysis"
              size="lg"
              isDisabled={!isTranscriptUploaded}
            />
          </div>
          <div className="justify-center flex">
            <BaseButton
                click={this.downloadTranscriptTemplate}
                text="Download Transcript Template"
                size="lg"
            />
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state) => ({
  isTranscriptUploaded: state.transcriptUpload.isUploaded
});

export default connect(mapStateToProps)(MainPage);