import React, { Component } from 'react';
import store from "../store.js";
import { openMainPage } from "../store/switchPageSlice.js";
import BaseButton from "./BaseButton.jsx";
import IntentLister from './IntentLister.jsx';

const fakeIntents = [
  {
    question: "hi",
    children: {
      "q1": 100,
    }
  },
  {
    question: "heyy",
    children: {
      "q1": 10,
      "q2": 20
    }
  }, 
  {
    question: "sup",
    children: {
      "q1": 10,
      "q2": 20,
      "q3": 70,
    }
  }
]

class AnalysisPage extends Component {

    openMainPage = () => {
      store.dispatch(openMainPage());
    }

    render() {
        return (
            <div className="AnalysisPage bg-purple-300 flex h-screen" data-testid="analysis-page">
              <div className="flex gap-y-10 w-full flex-col h-full">
                <div className="justify-center flex">
                  <BaseButton
                    click={this.openMainPage}
                    text="Return to Main Page" />
                </div>
                <div className="w-4/5 h-4/5 mx-auto">
                  <IntentLister intents={fakeIntents} index={0} />
                </div>
              </div>
            </div>
          );
    }
}

export default AnalysisPage;
