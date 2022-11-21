import React, { Component } from 'react';
import { connect } from "react-redux";
import store from "../../store.js";
import { openMainPage } from "../../store/switchPageSlice.js";
import Title from "../icons/title.jsx";
import IntentLister from "./IntentLister.jsx";

export class AnalysisPage extends Component {

    openMainPage = () => {
      store.dispatch(openMainPage());
    }

    render() {
      let projectId = this.props.projectId;
      let analyzedTranscripts = this.props.analyzedTranscripts;
        return (
            <div className="AnalysisPage bg-purple-100 h-screen" data-testid="analysis-page">
              <div className="fixed shadow-md inline-flex items-center justify-center w-full bg-gray-100">
                <div /*first line of className is tooltip styling*/
                    className="relative before:z-10 before:absolute before:left-1/2 before:-bottom-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:translate-y-full before:rounded-lg before:bg-gray-200 before:px-2 before:py-1.5 before:text-off-white before:invisible before:content-[attr(tooltip)] after:z-10 after:absolute after:left-1/2 after:-bottom-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-b-gray-200 after:border-l-transparent after:border-t-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible
                      absolute cursor-pointer m-3 xl:w-[11em]"
                    role="button"
                    onClick={this.openMainPage}
                    aria-label="Home Button"
                    tooltip="Click here to return to homepage"
                    data-testid="home-button"
                    tabIndex={0}
                  >
                    <Title />
                  </div>
              </div>
              <div className="flex gap-y-10 justify-center justify-between w-full flex-col h-full">
                <div className="w-4/5 h-4/5 md:mt-32 2xl:mt-64 mx-auto">
                  <IntentLister intents={analyzedTranscripts[projectId]} />
                </div>
              </div>
            </div>
          );
    }
}

const mapStateToProps = (state) => ({
  projectId: state.analyzeTranscript.projectIdToBeDisplayed,
  analyzedTranscripts: state.analyzeTranscript.analyzedTranscripts
});

export default connect(mapStateToProps)(AnalysisPage);
