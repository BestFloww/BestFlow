import React, { Component } from 'react';
import { connect } from "react-redux";
import store from "../../store.js";
import { openMainPage } from "../../store/switchPageSlice.js";
import Title from "../icons/title.jsx";
import IntentLister from "./IntentLister.jsx";
import IntentMenu from "./IntentMenu.jsx";
import Hamburger from "../icons/hamburger.jsx";

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
            className={"bg-purple-100 absolute inset-0 transition ease-in-out" + (this.state.showIntentMenu ? " brightness-75" : "")}
            aria-hidden={this.state.showIntentMenu}
            data-testid="analysis-page-main"
          >
            <div className="flex gap-y-10 w-full h-full flex-col">
              <div className= "flex w-full items-center justify-between bg-gray-100">
                {
                    <nav>
                      <button
                        className="ml-3"
                        onClick={this.openIntentMenu}
                        aria-label="intent menu button"
                        data-testid="intent-menu-button"
                        aria-haspopup="menu"
                        tabIndex={this.state.showIntentMenu ? "-1" : "0"}
                      >
                        <label className="cursor-pointer">
                          <Hamburger />
                        </label>
                      </button>
                    </nav>
                }
                {
                    this.state.showIntentMenu
                }
                <div /* first line of className is tooltip styling */
                  className="relative before:z-10 before:absolute before:left-1/2 before:-bottom-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:translate-y-full before:rounded-lg before:bg-gray-300 before:px-2 before:py-1.5 before:text-off-white before:invisible before:content-[attr(tooltip)] after:z-10 after:absolute after:left-1/2 after:-bottom-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-b-gray-300 after:border-l-transparent after:border-t-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible
                  justify-self-center"
                  tooltip="Click here to return to homepage"
                  >
                  <button className="m-3 w-[11em] 2xl:w-[15em] mx-auto"
                  aria-label="Home Button"
                  data-testid="home-button"
                  onClick={this.openMainPage}
                  tabIndex={this.state.showIntentMenu ? "-1" : "0"}
                  >
                      <label className="cursor-pointer">
                        <Title />
                      </label>
                  </button>
                </div>
                <div className="ml-[3em]"/* Empty element to center the title using justify-between *//>
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
