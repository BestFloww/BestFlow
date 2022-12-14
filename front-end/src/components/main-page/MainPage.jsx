import React, { Component } from 'react';
import { connect } from "react-redux";
import store from "../../store.js";
import { openAnalysisPage } from "../../store/switchPageSlice.js";
import { addAnalyzedTranscript, setOverrideStatus, setProjectIdToBeDisplayed } from '../../store/analyzeTranscriptSlice.js';
import BaseButton from "../general/BaseButton.jsx";
import TranscriptUploadModal from "./TranscriptUploadModal.jsx";
import TranscriptDescription from "./TranscriptDescription.jsx";
import Title from "../icons/title.jsx";
import {exampleTranscript} from "../helpers/ExampleTranscript.js";
import TranscriptAPI from "../../services/TranscriptAPI.js";

class MainPage extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      showTranscriptUploadModal: false,
      useMerger: false,
    };
  }

  toggleTranscriptUploadModal = () => {
    this.setState({showTranscriptUploadModal: !this.state.showTranscriptUploadModal});
  }

  toggleMerge = () => {
    this.setState({useMerger: !this.state.useMerger});
  }

  handleChange = (event) => {
    // Update the Project ID of the analyzed transcript to display in redux based on input field
    if(event.target.value){
      store.dispatch(setProjectIdToBeDisplayed(event.target.value + "Merge" + this.state.useMerger));
    }
    else{
      store.dispatch(setProjectIdToBeDisplayed(event.target.value));
    }
  }

  isInputBlank() {
    // Return whether the input field is blank. If so, it disables the View Analysis button
    return this.props.projectIdToBeDisplayed === "";
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
      const cleanProjectId = projectId.split("Merge")[0];
      const analyzedTranscripts = store.getState().analyzeTranscript.analyzedTranscripts;
      const mergeId = cleanProjectId + "Merge" + this.state.useMerger;
      if(override || (!(mergeId in analyzedTranscripts))){
        // Call API if either the user wants to override or the project ID is not stored in this session's transcripts
        const analyzedData = await TranscriptAPI.getAnalysis({projectId: cleanProjectId, useMerger: this.state.useMerger});
        if (analyzedData.data.length === 0) {
          // Throw an error if getAnalysis returns an empty array, as this means no transcript with that project ID was found
          const missingIdError = new Error();
          missingIdError.response = {data: {error: "Your project ID is not in our database. Please try again."}}
          throw missingIdError;
        } else {
          store.dispatch(setProjectIdToBeDisplayed(mergeId))
          store.dispatch(addAnalyzedTranscript({projectId: mergeId , transcript: analyzedData.data}));
          store.dispatch(setOverrideStatus(false));
        }
      }
      else if (mergeId in analyzedTranscripts & mergeId !== projectId){
          store.dispatch(setProjectIdToBeDisplayed(mergeId));
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
    return(
      <div className="bg-purple-100 absolute gap-y-5 sm:inset-0 flex flex-col sm:flex-row w-screen" data-testid="main-page">
        <div className="justify-center flex">
          <TranscriptUploadModal
            show={this.state.showTranscriptUploadModal}
            toggleModal={this.toggleTranscriptUploadModal}
          />
        </div>
        <div className="flex w-screen sm:w-2/3 flex-col sm:mt-[25vh] gap-y-12">
          <div className="justify-center flex max-h-20 sm:max-h-[10rem]">
            <Title />
          </div>
          <p className="justify-center text-2xl flex font-cabin -mt-7 text-center"> Problem diagnostic tool for chatbot transcripts </p>
          <div className="flex flex-col sm:flex-row sm:pt-10 justify-center gap-y-5 gap-x-20">
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
            <div className="justify-center mx-auto sm:mx-0 flex gap-y-5 flex-col-reverse sm:flex-row">
              <div className="flex sm:absolute sm:py-28 flex-col" >
              <div className="group">
                  <input
                    className="bg-off-white text-xl rounded-md px-4 py-2 drop-shadow-md outline-none transition ease-in-out
                    border border-solid border-purple-100
                    hover:border-purple-200
                    focus:border-purple-300 focus:ring"
                    aria-required="true"
                    aria-label="Enter Project ID"
                    placeholder="Enter Project ID"
                    onChange={this.handleChange}
                    value={this.props.projectIdToBeDisplayed.split("Merge")[0]}
                  />
                  <div className="group-hover:flex">
                    <span
                      className="absolute hidden group-hover:flex right-16 bottom-16 -translate-y-full w-32 px-2 py-1 bg-gray-300 rounded-lg text-center text-off-white text-sm after:content-[''] after:rotate-180 after:absolute after:left-1/2 after:-top-[22%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-300"
                    >
                      Enter the Project ID that you want to analyze
                    </span>
                  </div>
                </div>
                <div className="flex mx-auto sm:py-12">
                  <label className="text-l flex font-cabin mt-2 sm:-mt-7 text-center">
                    <input
                    className= "appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-off-white checked:bg-purple-300 checked:border-blue-600 focus:ring transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox" 
                    data-testid="checkbox"
                    onChange={this.toggleMerge}/>
                    (Beta) Merge similar questions
                  </label>
                </div>
              </div>
              <div className="mx-auto">
                <BaseButton
                  click={this.openAnalysisPage}
                  text="View Analysis"
                  size="lg"
                  isDisabled={this.isInputBlank()}
                  icon={{
                    name: "analyze-note",
                    size: "40"
                  }}
                />
              </div>      
            </div>
          </div>
          
        </div>
          <div className=" w-full sm:w-1/4 h-7/8 justify-center flex flex-col gap-y-3">
            <div className="bg-off-white box-border drop-shadow-md rounded-xl p-5 text-lg font-cabin mb-5 overflow-y-auto">
                <TranscriptDescription/>
            </div>
            <div className="mx-auto pb-5">
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
  projectIdToBeDisplayed: state.analyzeTranscript.projectIdToBeDisplayed
});

export default connect(mapStateToProps)(MainPage);