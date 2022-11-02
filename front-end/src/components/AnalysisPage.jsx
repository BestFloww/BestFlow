import React, { Component } from 'react';
import store from "../store.js";
import { openMainPage } from "../store/switchPageSlice.js";
import BaseButton from "./BaseButton.jsx";
import IntentLister from './IntentLister.jsx';

const fakeIntents = [
  {
    question: "What is something that Waluigi and Wario often say?",
    children: {
      "The brothers Waluigi and Wario have their catchphrase 'waaa'.": 100,
    }
  },
  {
    question: "Where should I go for a good time and great learning experience?",
    children: {
      "You should go to the University of Toronto.": 10,
      "You should go to the Technology Leadership Initiative.": 90,
    }
  }, 
  {
    question: "Hey BestFlow, what time is it?",
    children: {
      "It's time for you to get a watch, would you like to take a look at our product?": 10,
      "Showtime showtime what I'm John Laurens in the place to be.": 20,
      "Summertime! School's out, scream and shout.": 70,
    }
  },
  {
    question: "What is Tailwind used for?",
    children: {
      "Escaping from your enemies.": 15,
      "Making it easier to code CSS.": 85,
    }
  },
  {
    question: "What is your favorite cooking ingredient?",
    children: {
      "Basil.": 36,
      "Onion.": 23,
      "Asphalt.": 41,
      "Cookbooks.": 0,
    }
  },
  {
    question: "What would you like to buy today?",
    children: {
      "Cottage cheese.": 37,
      "A cottage.": 25,
      "Cheese.": 38,
    }
  },
  {
    question: "What is the name of the rat in Ratatouille?",
    children: {
      "Ratatouille.": 99,
      "Remy.": 1,
    }
  },
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
                    text="Return to Main Page" 
                    size="sm"
                  />
                </div>
                <div className="w-4/5 h-4/5 mx-auto">
                  <IntentLister
                    intents={fakeIntents}
                  />
                </div>
              </div>
            </div>
          );
    }
}

export default AnalysisPage;
