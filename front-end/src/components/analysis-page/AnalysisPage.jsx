import React, { Component } from "react";
import store from "../../store.js";
import { openMainPage } from "../../store/switchPageSlice.js";
import Logo from "../icons/logo.jsx";
import IntentLister from "./IntentLister.jsx";

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
];

class AnalysisPage extends Component {

    openMainPage = () => {
      store.dispatch(openMainPage());
    }

    render() {
        return (
            <div className="AnalysisPage bg-purple-100 flex h-screen" data-testid="analysis-page">
              <div className="flex gap-y-10 w-full flex-col h-full">
                <div /*second line of className is tooltip styling*/
                  className="justify-left relative text-center text-sm
                    before:z-10 before:absolute before:-right-5 before:top-1/2 before:w-max before:max-w-xs before:translate-x-full before:-translate-y-1/2 before:rounded-md before:bg-gray before:px-3 before:py-2 before:text-off-white before:invisible before:content-[attr(tooltip)] after:z-10 after:absolute after:-right-[0.8rem] after:top-1/2 after:h-0 after:w-0 after:translate-x-2 after:-translate-y-1/2 after:border-8 after:border-r-gray after:border-l-transparent after:border-b-transparent after:border-t-transparent after:invisible hover:before:visible hover:after:visible
                    cursor-pointer m-5 w-[5em]"
                  role="button"
                  onClick={this.openMainPage}
                  aria-label="Home Button"
                  tooltip="Click here to return to homepage"
                  data-testid="logo-button"
                >
                  <Logo />
                </div>
                <div className="w-4/5 h-4/5 mx-auto">
                  <IntentLister intents={fakeIntents} />
                </div>
              </div>
            </div>
          );
    }
}

export default AnalysisPage;
