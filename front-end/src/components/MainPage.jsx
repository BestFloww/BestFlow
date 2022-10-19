import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openAnalysisPage } from "../store/switchPageSlice.js";
import BaseButton from "./BaseButton.jsx";
import TranscriptUploadModal from "./TranscriptUploadModal.jsx";

class MainPage extends Component {
  state = {
      showTranscriptUploadModal: false
  }

  toggleTranscriptUploadModal = () => {
      this.setState({showTranscriptUploadModal: !this.state.showTranscriptUploadModal});
      console.log("Set showTranscriptUploadModal to " + this.state.showTranscriptUploadModal);
  }

  render() {
    return(
      <div className="MainPage bg-purple-300 flex" data-testid="main-page">
        <div className="flex gap-y-10 w-full flex-col">
          <div className="justify-center flex">
            <BaseButton
              click={this.toggleTranscriptUploadModal}
              text="Upload Transcript" />
          </div>
          <div className="justify-center flex">
            <TranscriptUploadModal show={this.state.showTranscriptUploadModal} />
          </div>
          <div className="justify-center flex">
            <BaseButton
              click={this.props.openAnalysisPage}
              text="View Analysis" />
          </div>
        </div>
      </div>
    )
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    openAnalysisPage: () => dispatch(openAnalysisPage())
  }
};

export default connect(null, mapDispatchToProps)(MainPage);