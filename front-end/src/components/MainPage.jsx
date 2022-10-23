import React, { Component } from 'react';
import store from "../store.js";
import { openAnalysisPage } from "../store/switchPageSlice.js";
import BaseButton from "./BaseButton.jsx";
import TranscriptUploadModal from "./TranscriptUploadModal.jsx";
import IntentDiagram from './IntentDiagram.jsx';

const fakeChildren = {
  q1: 25,
  q2: 35,
  q3: 45,
}

class MainPage extends Component {
  state = {
      showTranscriptUploadModal: false
  }

  toggleTranscriptUploadModal = () => {
      this.setState({showTranscriptUploadModal: !this.state.showTranscriptUploadModal});
      console.log("Set showTranscriptUploadModal to " + this.state.showTranscriptUploadModal);
  }

  openAnalysisPage = () => {
    store.dispatch(openAnalysisPage());
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
            <TranscriptUploadModal
              show={this.state.showTranscriptUploadModal}
              toggleModal={this.toggleTranscriptUploadModal}
            />
          </div>
          <div className="justify-center flex">
            <BaseButton
              click={this.openAnalysisPage}
              text="View Analysis"/>
          </div>
          <div className="justify-center flex">
            <IntentDiagram question="test question" branches={fakeChildren}/>
          </div>
        </div>
      </div>
    )
  };
}

export default MainPage;