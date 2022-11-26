import React, { Component } from 'react';
import { connect } from "react-redux";
import store from "../../store.js";
import { openMainPage } from "../../store/switchPageSlice.js";
import Title from "../icons/title.jsx";
import BaseButton from "../general/BaseButton.jsx";
import IntentLister from "./IntentLister.jsx";
import IntentMenu from "./IntentMenu.jsx";

export class AnalysisPage extends Component {

    state = {
      showIntentMenu: false,
    }

    openIntentMenu = () => {
      this.setState({showIntentMenu: true});
      // Needs a timeout of any duration to wait for the input field to render in Intent Menu
      setTimeout(() => { document.getElementById("intent-menu-search").focus() }, 0);
    }
  
    closeIntentMenu = () => {
      this.setState({showIntentMenu: false});
    }
  
    openMainPage = () => {
      store.dispatch(openMainPage());
    }

    render() {
      let projectId = this.props.projectId;
      let analyzedTranscripts = this.props.analyzedTranscripts;
      
      return (
        <div className="AnalysisPage flex flex-col bg-purple-100 w-screen" data-testid="analysis-page">
          <aside /* display sidebar if toggled on */
            aria-hidden={!this.state.showIntentMenu}
            data-testid="analysis-page-sidebar"
          >
            <IntentMenu
              intents={analyzedTranscripts[projectId]}
              isOpen={this.state.showIntentMenu}
              onClickOutside={this.closeIntentMenu}
            />
          </aside>
          <div /* darken screen and hide content from accessibility API if sidebar is toggled on */
            className={"bg-purple-100 h-screen w-screen transition ease-in-out" + (this.state.showIntentMenu ? " brightness-75" : "")}
            aria-hidden={this.state.showIntentMenu}
            data-testid="analysis-page-main"
          >
            <div className="flex gap-y-10 w-full flex-col h-full">
              <div className= "w-full bg-gray-100 pb-2">
                <div
                  className="absolute m-2 mx-auto px-3" data-testid="arrow-right"
                >
                  <BaseButton
                    click={this.openIntentMenu}
                    label="Open intent menu"
                    icon={{
                      name: "hamburger",
                      size: "40",
                          }}
                      />
                </div>
                <div /* first line of className is tooltip styling */
                  className="relative before:z-10 before:absolute before:left-1/2 before:-bottom-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:translate-y-full before:rounded-lg before:bg-gray-200 before:px-2 before:py-1.5 before:text-off-white before:invisible before:content-[attr(tooltip)] after:z-10 after:absolute after:left-1/2 after:-bottom-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-b-gray-200 after:border-l-transparent after:border-t-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible
                  absolute cursor-pointer m-3 sm:w-[11em] mx-auto"
                  role="button"
                  onClick={this.openMainPage}
                  aria-label="Home Button"
                  tooltip="Click here to return to homepage"
                  data-testid="home-button"
                >
                  <Title className="md:h-full h-20" />
                </div>
              </div>
              <div className="w-4/5 h-4/5 mx-auto">
                <IntentLister
                  intents={analyzedTranscripts[projectId]}
                  isIntentMenuOpen={this.state.showIntentMenu}
                />
              </div>
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
