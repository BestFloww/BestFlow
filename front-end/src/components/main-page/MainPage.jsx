import React, { Component } from 'react';
import { connect } from "react-redux";
import store from "../../store.js";
import { openAnalysisPage } from "../../store/switchPageSlice.js";
import BaseButton from "../general/BaseButton.jsx";
import TranscriptUploadModal from "./TranscriptUploadModal.jsx";
import Title from "../icons/title.jsx";
import {exampleTranscript} from "../helpers/ExampleTranscript.js";
import TranscriptDescription from "./TranscriptDescription"

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
      <div className="bg-purple-100 absolute inset-0 flex flex-row" data-testid="main-page">
        <div className="justify-center flex">
          <TranscriptUploadModal
            show={this.state.showTranscriptUploadModal}
            toggleModal={this.toggleTranscriptUploadModal}
          />
        </div>
        <div className="flex w-2/3 flex-col mt-[25vh] gap-y-12">
          <div className="justify-center flex">
            <Title />
          </div>
          <p className="justify-center text-xl flex font-cabin -mt-7 text-center"> Problem diagnostic tool for chatbot transcripts </p>
          <div className="flex flex-row pt-10 justify-center gap-x-20">
            <div className="justify-center flex">
              <BaseButton
                click={this.toggleTranscriptUploadModal}
                text="Upload Transcript"
                size="lg"
              />
            </div>
            <div className="justify-center flex">
              <BaseButton
                click={this.openAnalysisPage}
                text="View Analysis"
                size="lg"
                isDisabled={!isTranscriptUploaded}
                icon={{
                  name: "magnifying-glass",
                  size: 30
                }}
              />
            </div>
          </div>
          
        </div>
          <div className="w-1/4 h-7/8 justify-center flex flex-col gap-y-3">
            <div className="bg-off-white h-[75vh] box-border drop-shadow-md rounded-xl p-5 text-lg font-cabin mb-5">
                <TranscriptDescription></TranscriptDescription>
            </div>
            <div className="mx-auto">
              <BaseButton
                  click={this.downloadTranscriptTemplate}
                  text="Download Transcript Template"
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