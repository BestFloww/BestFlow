import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BaseButton from "./BaseButton.jsx";
import IntentDiagram from './IntentDiagram.jsx';

class IntentLister extends Component {

    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.state = {
            index: this.props.initialIndex,
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
        switch(event.key) {
            case "ArrowLeft":
                this.decrementIndex();
                break;
            case "ArrowRight":
                this.incrementIndex();
                break;
            default:
                break;
        };
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
    
    incrementIndex = () => {
        // Ctrl + Right goes to last intent set, defalt Right goes to next intent set
        if (this.state.keysHeld["Control"]) {
            // Set index to that of the first intent in the last intent set
            this.setState({index: this.props.intents.length - this.props.intents.length % 3})
        } else {
            // Increment index by 3 if the index of the last question is beyond the 3 indices currently displayed
            this.setState({index: Math.min(this.state.index + 3, this.props.intents.length - this.props.intents.length % 3)});
        }
    }
  
    decrementIndex = () => {
        // Ctrl + Left goes to first intent set, default Left goes to previous intent set
        if (this.state.keysHeld["Control"]) {
            // Set index to 0
            this.setState({index: 0});
        } else {
            // Decrement index by 3, stopping at 0 to avoid negative indices
            this.setState({index: Math.max(this.state.index - 3, 0)});
        }
    }

    checkIfMaxIndex = () => {
        // Check if the lister is displaying the last possible set of questions
        return this.props.intents.length - this.state.index <= 3;
    }

    checkIfMinIndex = () => {
        // Check if the lister is displaying the first possible set of questions
        return this.state.index === 0;
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
                    branches={intent.children}
                 />
            );
        });
    }

    render() {
        const MAX_CURRENT_INTENTS = 3;
        let currentIntents = [];
        let curr = this.state.index;

        // Choose a sublist of intents to display, up to a maximum of MAX_CURRENT_INTENTS
        while (this.props.intents[curr] && curr < this.state.index + MAX_CURRENT_INTENTS) {
            currentIntents.push(this.props.intents[curr]);
            curr++;
        }

        return (
            <div>
                <div className="full h-full flex flex-col mx-auto gap-y-12 justify-evenly">
                    <div className="flex flex-col gap-y-32 sm:flex-row sm:mx-0 mx-auto sm:justify-around">
                        {this.generateIntents(currentIntents)}
                    </div>
                    {currentIntents.length === MAX_CURRENT_INTENTS &&
                    <div className="flex mx-auto">
                        <IntentDiagram
                            data-testid={currentIntents[2].question}
                            question={currentIntents[2].question}
                            branches={currentIntents[2].children}
                        />
                    </div>
                    }
                </div>
                <div className="fixed left-6 bottom-8">
                    <BaseButton
                        click={this.decrementIndex}
                        isDisabled={this.checkIfMinIndex()}
                        icon={{
                            name: this.state.keysHeld["Control"] ? "skip-left" : "arrow-left",
                            size: "40"
                        }}
                        tooltip="Click this button or press the ← key while holding CTRL to skip to the beginning"
                        label="Left Arrow"
                    />
                </div>
                <div className="fixed right-6 bottom-8" data-testid="arrow-right">
                    <BaseButton
                        click={this.incrementIndex}
                        isDisabled={this.checkIfMaxIndex()}
                        icon={{
                            name: this.state.keysHeld["Control"] ? "skip-right" : "arrow-right",
                            size: "40"
                        }}
                        tooltip="Click this button or press the → key while holding CTRL to skip to the end"
                        label="Right Arrow"
                    />
                </div>
            </div>
        );
    }
}

IntentLister.propTypes = {
    intents: PropTypes.arrayOf(PropTypes.object).isRequired,
    initialIndex: PropTypes.number,
};

IntentLister.defaultProps = {
    initialIndex: 0,
};
 
export default IntentLister;
