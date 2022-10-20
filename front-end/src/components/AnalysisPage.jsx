import React, { Component } from 'react';
import store from "../store.js";
import { openMainPage } from "../store/switchPageSlice.js";
import BaseButton from "./BaseButton.jsx";

class AnalysisPage extends Component {

    openMainPage = () => {
      store.dispatch(openMainPage());
    }

    render() {
        return (
            <div className="AnalysisPage bg-purple-300 flex" data-testid="analysis-page">
              <div className="flex gap-y-10 w-full flex-col">
                <div className="justify-center flex">
                  <BaseButton
                    click={this.openMainPage}
                    text="Return to Main Page" />
                </div>
              </div>
            </div>
          );
    }
}

export default AnalysisPage;
