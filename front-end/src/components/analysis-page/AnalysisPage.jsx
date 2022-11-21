import React, { Component } from 'react';
import { connect } from "react-redux";
import store from "../../store.js";
import { openMainPage } from "../../store/switchPageSlice.js";
import Logo from "../icons/logo.jsx";
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
        <div className="AnalysisPage" data-testid="analysis-page">
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
            className={"bg-purple-100 h-screen transition ease-in-out" + (this.state.showIntentMenu ? " brightness-75" : "")}
            aria-hidden={this.state.showIntentMenu}
            data-testid="analysis-page-main"
          >
            <div className="flex gap-y-10 w-full flex-col h-full">
              <div /* second line of className is tooltip styling */
                className="justify-left relative text-center text-sm
                  before:z-10 before:absolute before:-right-5 before:top-1/2 before:w-max before:max-w-xs before:translate-x-full before:-translate-y-1/2 before:rounded-md before:bg-gray-200 before:px-3 before:py-2 before:text-off-white before:invisible before:content-[attr(tooltip)] after:z-10 after:absolute after:-right-[0.8rem] after:top-1/2 after:h-0 after:w-0 after:translate-x-2 after:-translate-y-1/2 after:border-8 after:border-r-gray-200 after:border-l-transparent after:border-b-transparent after:border-t-transparent after:invisible hover:before:visible hover:after:visible
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
                <IntentLister intents={analyzedTranscripts[projectId]} />
              </div>
            </div>

            <div /*TEMPORARY SIDEBAR CONTROL BUTTON!*/
              className="fixed right-40 bottom-8" data-testid="arrow-right"
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
