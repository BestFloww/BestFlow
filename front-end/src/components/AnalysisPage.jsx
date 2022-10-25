import React, { Component } from 'react';
import store from "../store.js";
import { openMainPage } from "../store/switchPageSlice.js";
import BaseButton from "./BaseButton.jsx";
import IntentLister from './IntentLister.jsx';

const fakeIntents = [
  {
    question: "Can you tell me who is ya boi?",
    children: {
      "Kaylee Chan uses ya boi as a moniker.": 100,
    }
  },
  {
    question: "What is something that Waluigi and Wario often say?",
    children: {
      "The brothers Waluigi and Wario have their catchphrase 'waaa'.": 10,
      "Sorry, I don't know what they say because I don't play Nintendo games.": 20
    }
  }, 
  {
    question: "Where should I go for a good time and great learning experience?",
    children: {
      "You should go to the University of Toronto.": 10,
      "You should go to the Technology Leadership Initiative.": 20,
      "I usually go to your mom's house.": 70,
    }
  }
]

class AnalysisPage extends Component {

    openMainPage = () => {
      store.dispatch(openMainPage());
    }

    render() {
        return (
            <div className="AnalysisPage bg-purple-100 flex h-screen" data-testid="analysis-page">
              <div className="flex gap-y-10 w-full flex-col h-full">
                <div className="justify-center flex mt-12">
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
