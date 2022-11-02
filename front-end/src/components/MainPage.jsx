import React, { Component } from 'react';
import { connect } from "react-redux";
import store from "../store.js";
import { openAnalysisPage } from "../store/switchPageSlice.js";
import { disable } from '../store/transcriptUploadedSlice.js';
import BaseButton from "./BaseButton.jsx";
import TranscriptUploadModal from "./TranscriptUploadModal.jsx";

class MainPage extends Component {
  state = {
      showTranscriptUploadModal: false,
  }

  toggleTranscriptUploadModal = () => {
      this.setState({showTranscriptUploadModal: !this.state.showTranscriptUploadModal});
      store.dispatch(disable())
  }

  openAnalysisPage = () => {
    store.dispatch(openAnalysisPage());
  }

  render() {
    let isTranscriptUploaded = this.props.isTranscriptUploaded;
    return(
      <div className="MainPage bg-purple-100 absolute inset-0" data-testid="main-page">
        <div className="flex gap-y-7 w-full flex-col mt-[25vh]">
          <h1 className="justify-center flex font-pacifico text-9xl text-purple-300 text-shadow shadow-blue">
            BestFlow
          </h1>
          <p className="justify-center text-xl flex font-cabin -mt-3"> Problem diagnostic tool for chatbot transcripts </p>
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
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state) => ({
  isTranscriptUploaded: state.isTranscriptUploaded.isUploaded
});

export default connect(mapStateToProps)(MainPage);