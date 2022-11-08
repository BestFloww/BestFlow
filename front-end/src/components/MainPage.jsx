import React, { Component } from 'react';
import { connect } from "react-redux";
import store from "../store.js";
import { openAnalysisPage } from "../store/switchPageSlice.js";
import BaseButton from "./BaseButton.jsx";
import TranscriptUploadModal from "./TranscriptUploadModal.jsx";
import Title from "./icons/title.jsx";

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
    const data = {"data": [
        {
          "": "23606",
          "project_id": "1",
          "turn_id": "dd8e6fee-2329-4470-9cc0-0c50f3d40313",
          "ts": "2022-04-20 18:01:59.863 UTC",
          "session_id": "c1ade6a3e2d0171d8813a2279f69a97171258a6c341547919fc0a3f95909b744",
          "platform": "prototype",
          "interaction_metadata": "{\"end\":false,\"locale\":\"en-US\"}",
          "trace_format": "trace",
          "trace_type": "speak",
          "trace_payload": "{\"type\":\"speak\",\"payload\":{\"type\":\"message\",\"message\":\"<voice name=\\\"Alexa\\\">Rerouting. ETA for first delivery is 6:20 PM.</voice>\"}}"
        },
        {
          "": "23622",
          "project_id": "1",
          "turn_id": "74d52b1e-1af0-480e-8f2a-2ec2c6df7c8b",
          "ts": "2022-04-20 18:01:53.779 UTC",
          "session_id": "c1ade6a3e2d0171d8813a2279f69a97171258a6c341547919fc0a3f95909b744",
          "platform": "prototype",
          "interaction_metadata": "{\"end\":false,\"locale\":\"en-US\"}",
          "trace_format": "request",
          "trace_type": "intent",
          "trace_payload": "{\"type\":\"intent\",\"ELICIT\":false,\"payload\":{\"query\":\"complete the order\",\"intent\":{\"name\":\"finish_order\"},\"confidence\":1}}"
        }]};
    const file = new Blob([JSON.stringify(data)], {
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