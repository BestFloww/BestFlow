import React, { Component } from 'react';
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


    toggleTranscriptUploadModal= () => {
        TranscriptModalButton
        this.setState({showTranscriptUploadModal: !this.state.showTranscriptUploadModal});
        console.log("Set showTranscriptUploadModal to " + this.state.showTranscriptUploadModal);
    }

    render() {
        return (
            <div className="MainPage bg-purple-300 flex">
              <div className="flex gap-y-10 w-full flex-col">
                <div className="justify-center flex">
                  <BaseButton
                    click={this.toggleTranscriptUploadModal}
                    text="Upload Transcript" />
                </div>
                <div className="justify-center flex">
                  <TranscriptUploadModal show={this.state.showTranscriptUploadModal} />
                </div>
              </div>
            </div>
          );
    }
}

export default MainPage;
