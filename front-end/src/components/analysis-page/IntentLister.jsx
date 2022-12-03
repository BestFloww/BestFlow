import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import BaseButton from "../general/BaseButton.jsx";
import IntentDiagram from './IntentDiagram.jsx';
import store from '../../store.js';
import { setDisplayingQuestion } from '../../store/analyzeTranscriptSlice.js';

class IntentLister extends Component {

    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.state = {
            keysHeld: {},
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown, false);
        document.addEventListener("keyup", this.handleKeyUp, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown, false);
        document.removeEventListener("keyup", this.handleKeyUp, false);
    }

    handleKeyDown(event) {
        // Track that this key has been held down so that it may modify the behavior of other key presses in multi-key shortcuts
        this.setState({
            ...this.state,
            keysHeld: {
                ...this.state.keysHeld,
                [event.key]: true,
            }
        });

        // Map keys to methods for keyboard shortcuts
        if (!this.props.isIntentMenuOpen) {
            event.key === "ArrowLeft" ? this.decreaseIndex() : (event.key === "ArrowRight" && this.increaseIndex());
        }
    }

    handleKeyUp(event) {
        // Track that this key has been released so that it cannot modify the behavior of other key presses
        this.setState({
            ...this.state,
            keysHeld: {
                ...this.state.keysHeld,
                [event.key]: false,
            }
        });
    }
    
    increaseIndex = () => {
        // Ctrl + Right goes to last intent set, defalt Right goes to next intent set
        if (this.state.keysHeld["Control"]) {
            // Set index to that of the first intent in the last intent set
            store.dispatch(setDisplayingQuestion(this.props.intents.length - 1 - (this.props.intents.length - 1) % 3));
        } else {
            // Increment index by 3 if the index of the last question is beyond the 3 indices currently displayed
            const projectId = store.getState().analyzeTranscript.projectIdToBeDisplayed;
            const indexes = store.getState().analyzeTranscript.DisplayingQuestion;
            store.dispatch(setDisplayingQuestion(Math.min(indexes[projectId] + 3, this.props.intents.length - 1 - (this.props.intents.length - 1) % 3)));
        }
    }
  
    decreaseIndex = () => {
        // Ctrl + Left goes to first intent set, default Left goes to previous intent set
        if (this.state.keysHeld["Control"]) {
            // Set index to 0
            store.dispatch(setDisplayingQuestion(0));
        } else {
            // Decrement index by 3, stopping at 0 to avoid negative indices
            const projectId = store.getState().analyzeTranscript.projectIdToBeDisplayed;
            const indexes = store.getState().analyzeTranscript.DisplayingQuestion;
            store.dispatch(setDisplayingQuestion(Math.max(indexes[projectId] - 3, 0)));
        }
    }

    checkIfMaxIndex = () => {
        // Check if the lister is displaying the last possible set of questions
        const projectId = store.getState().analyzeTranscript.projectIdToBeDisplayed;
        const indexes = store.getState().analyzeTranscript.DisplayingQuestion;
        return this.props.intents.length - indexes[projectId] <= 3;
    }

    checkIfMinIndex = () => {
        // Check if the lister is displaying the first possible set of questions
        const projectId = store.getState().analyzeTranscript.projectIdToBeDisplayed;
        const indexes = store.getState().analyzeTranscript.DisplayingQuestion;
        return indexes[projectId] === 0;
    }

    generateIntents = (currentIntents) => {
        let relevantIntents = [];
        if (currentIntents.length > 1) {
            relevantIntents = [currentIntents[0]];
            if (currentIntents[1]) {
                relevantIntents.push(currentIntents[1]);
            }
        } else {
            relevantIntents = currentIntents;
        }

        return Object.keys(relevantIntents).map((key) => {
            const intent = relevantIntents[key];
            return (
                <IntentDiagram
                    key={key}
                    data-testid={intent.question}
                    question={intent.question}
                    children={intent.children}
                    isStarred={intent.star}
                    isFlagged={intent.flag}
                 />
            );
        });
    }

    render() {
        const MAX_CURRENT_INTENTS = 3;
        let currentIntents = [];
        let curr = this.props.index;

        // Choose a sublist of intents to display, up to a maximum of MAX_CURRENT_INTENTS
        while (this.props.intents[curr] && curr < this.props.index + MAX_CURRENT_INTENTS) {
            currentIntents.push(this.props.intents[curr]);
            curr++;
        }

        return (
            <div className="w-full bg-purple-100 pb-40 sm:pb-0">
                <div className="full h-full flex flex-col mx-auto justify-evenly">
                    <div className="flex flex-col lg:flex-row lg:mx-0 mx-auto sm:justify-around">
                        {this.generateIntents(currentIntents)}
                    </div>
                    {currentIntents.length === MAX_CURRENT_INTENTS &&
                    <div className="flex md:flex-row flex-col mx-auto">
                        <IntentDiagram
                            data-testid={currentIntents[2].question}
                            question={currentIntents[2].question}
                            children={currentIntents[2].children}
                            isStarred={currentIntents[2].star}
                            isFlagged={currentIntents[2].flag}
                        />
                    </div>
                    }
                </div>
                <div className="fixed left-1 sm:left-6 bottom-1 sm:bottom-8">
                    <BaseButton
                        click={this.decreaseIndex}
                        isDisabled={this.checkIfMinIndex()}
                        icon={{
                            name: this.state.keysHeld["Control"] ? "skip-left" : "arrow-left",
                            size: "40"
                        }}
                        tooltip="Click this button or press the ← key while holding CTRL to skip to the beginning"
                        label="Previous Results"
                        aria-keyshortcuts="ArrowLeft Control+ArrowLeft"
                    />
                </div>
                <div className="fixed right-1 sm:right-6 bottom-1 sm:bottom-8" data-testid="arrow-right">
                    <BaseButton
                        click={this.increaseIndex}
                        isDisabled={this.checkIfMaxIndex()}
                        icon={{
                            name: this.state.keysHeld["Control"] ? "skip-right" : "arrow-right",
                            size: "40"
                        }}
                        tooltip="Click this button or press the → key while holding CTRL to skip to the end"
                        label="Next Results"
                        aria-keyshortcuts="ArrowRight Control+ArrowRight"
                    />
                </div>
            </div>
        );
    }
}

IntentLister.propTypes = {
    intents: PropTypes.arrayOf(PropTypes.object).isRequired,
    index: PropTypes.number,
    isIntentMenuOpen: PropTypes.bool.isRequired,
};

IntentLister.defaultProps = {
    index: 0,
};

const mapStateToProps = (state, ownProps) =>({
    index: state.analyzeTranscript.DisplayingQuestion[state.analyzeTranscript.projectIdToBeDisplayed],
    intents: ownProps.intents
});
  
export default connect(mapStateToProps)(IntentLister);
