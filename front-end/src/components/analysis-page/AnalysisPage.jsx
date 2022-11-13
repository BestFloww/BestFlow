import React, { Component } from 'react';
import { connect } from "react-redux";
import store from "../../store.js";
import { openMainPage } from "../../store/switchPageSlice.js";
import BaseButton from "../general/BaseButton.jsx";
import IntentLister from './IntentLister.jsx';

export class AnalysisPage extends Component {

    openMainPage = () => {
      store.dispatch(openMainPage());
    }

    render() {
      let projectId = this.props.projectId;
      let analyzedTranscripts = this.props.analyzedTranscripts;
        return (
            <div className="AnalysisPage bg-purple-100 flex h-screen" data-testid="analysis-page">
              <div className="flex gap-y-10 w-full flex-col h-full">
                <div className="justify-center flex mt-12">
                  <BaseButton
                    click={this.openMainPage}
                    text="Return to Main Page" 
                    size="sm"
                  />
                </div>
                <div className="w-4/5 h-4/5 mx-auto">
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
