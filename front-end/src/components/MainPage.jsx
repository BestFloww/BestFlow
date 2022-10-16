import React, { Component } from 'react';
import BaseButton from "./BaseButton.jsx";
import PostRequestButton from "./PostRequestButton.jsx";
import RequestButton from "./RequestButton.jsx";
import HelloWorldButton from "./HelloWorldButton.jsx";
import VoiceFlowButton from "./VoiceFlowButton.jsx";
import TranscriptUploadModal from "./TranscriptUploadModal.jsx";
import IntentDiagram from './IntentDiagram.jsx';

const fakeChildren = new Map();
fakeChildren.set("q1", 35);
fakeChildren.set("q2", 40);
fakeChildren.set("q3", 25);

class MainPage extends Component {
    state = {
        showTranscriptUploadModal: false
    }

    toggleTranscriptUploadModal() {
        this.setState({showTranscriptUploadModal: !this.state.showTranscriptUploadModal});
        console.log("Set showTranscriptUploadModal to " + this.state.showTranscriptUploadModal);
    }

    render() {
        return (
            <div className="MainPage bg-purple-300 flex">
              <div className="flex gap-y-10 w-full flex-col">
                <div className="justify-center flex">
                  <BaseButton click={() => console.log("Hello world")} text={"Button 1"} />
                </div>
                <div className="justify-center flex">
                  <BaseButton
                    click={this.toggleTranscriptUploadModal}
                    text="Upload Transcript" />
                </div>
                <div className="justify-center flex">
                  <TranscriptUploadModal show={this.state.showTranscriptUploadModal} />
                </div>
                <div className="justify-center flex">
                  <PostRequestButton/>
                </div>
                <div className="justify-center flex">
                  <RequestButton/>
                </div>
                <div className="justify-center flex">
                  <HelloWorldButton/>
                </div>
                <div className="justify-center flex">
                  <VoiceFlowButton/>
                </div>
                <div className="justify-center flex">
                  <IntentDiagram question="test question" children={fakeChildren}/>
                </div>
              </div>
            </div>
          );
    }
}

export default MainPage;
