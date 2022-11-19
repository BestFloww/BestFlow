import React, { Component } from 'react';
import { connect } from "react-redux";
import store from "../../store.js";
import { openAnalysisPage } from "../../store/switchPageSlice.js";
import { addAnalyzedTranscript, setOverrideStatus, setProjectIdToBeDisplayed } from '../../store/analyzeTranscriptSlice.js';
import BaseButton from "../general/BaseButton.jsx";
import TranscriptUploadModal from "./TranscriptUploadModal.jsx";
import Title from "../icons/title.jsx";
import {exampleTranscript} from "../helpers/ExampleTranscript.js";
import TranscriptDescription from "./TranscriptDescription.jsx";
import TranscriptAPI from "../../services/TranscriptAPI.js";


class MainPage extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      showTranscriptUploadModal: false,
    };
  }

  toggleTranscriptUploadModal = () => {
    this.setState({showTranscriptUploadModal: !this.state.showTranscriptUploadModal});
  }

  handleChange = (event) => {
    // Update the Project ID of the analyzed transcript to display in redux based on input field
    store.dispatch(setProjectIdToBeDisplayed(event.target.value));
  }

  openAnalysisPage = async() => {
    try {
      await this.getAnalyzedData();
      store.dispatch(openAnalysisPage());
    } catch (e) {
      window.alert("Error in analyzing transcript. " + e.response.data.error);
    }
  }

  getAnalyzedData = async() => {
      const override = store.getState().analyzeTranscript.override;
      const projectId = store.getState().analyzeTranscript.projectIdToBeDisplayed;
      const transcripts = store.getState().analyzeTranscript.analyzedTranscripts;
      if(override || (!(projectId in transcripts))){
        const analyzedData = await TranscriptAPI.getAnalysis({project_id: projectId});
        store.dispatch(addAnalyzedTranscript({projectId: projectId, transcript: analyzedData.data}));
        store.dispatch(setOverrideStatus(false));
      }
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
      <div className="bg-purple-100 absolute gap-y-5 sm:inset-0 flex flex-col sm:flex-row" data-testid="main-page">
        <div className="justify-center flex">
          <TranscriptUploadModal
            show={this.state.showTranscriptUploadModal}
            toggleModal={this.toggleTranscriptUploadModal}
          />
        </div>
        <div className="flex w-2/3 flex-col sm:mt-[25vh] gap-y-12">
          <div className="justify-center flex">
            <Title />
          </div>
          <p className="justify-center text-2xl flex font-cabin -mt-7 text-center"> Problem diagnostic tool for chatbot transcripts </p>
          <div className="flex flex-row pt-10 justify-center gap-x-20">
            <div className="justify-center flex">
              <BaseButton
                click={this.toggleTranscriptUploadModal}
                text="Upload Transcript"
                size="lg"
                icon={{
                  name: "upload-note",
                  size: "40"
                }}
              />
            </div>
            <div className="justify-center flex flex-col sm:flex-row">
              <div className="absolute py-32">
                <input
                  onChange={this.handleChange}
                  value={this.state.projectId}
                />
              </div>      
              <BaseButton
                click={this.openAnalysisPage}
                text="View Analysis"
                size="lg"
                isDisabled={!isTranscriptUploaded}
                icon={{
                  name: "analyze-note",
                  size: "40"
                }}
              />
            </div>
          </div>
          
        </div>
          <div className="w-1/4 h-7/8 justify-center flex flex-col gap-y-3">
            <div className="bg-off-white box-border drop-shadow-md rounded-xl p-5 text-lg font-cabin mb-5 overflow-y-auto">
                <TranscriptDescription/>
            </div>
            <div className="mx-auto">
              <BaseButton
                  click={this.downloadTranscriptTemplate}
                  text="Download Transcript Template"
                  icon={{
                    name: "download-note",
                    size: "25"
                  }}
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