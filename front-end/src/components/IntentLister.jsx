import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BaseButton from "./BaseButton.jsx";
import IntentDiagram from './IntentDiagram.jsx';

class IntentLister extends Component {
    constructor(props){
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }

    handleKeyPress(event) {
        switch(event.key) {
            case "a":
                this.decrementIndex();
                break;
            case "d":
                this.incrementIndex();
        };
    }

    state = {
        index: 0,
    }  
    
    incrementIndex = () => {
        // Increment index by 3 if the index of the last question is beyond the 3 indices currently displayed
        if (this.props.intents.length > this.state.index + 3) {
          this.setState({index: this.state.index + 3});
        }
    }
  
    decrementIndex = () => {
        // Decrement index by 3, stopping at 0 to avoid negative indices
        this.setState({index: Math.max(this.state.index - 3, 0)});
    }

    checkIfMaxIndex = () => {
        // Check if the lister is displaying the last possible set of questions
        return this.props.intents.length - this.state.index < 3;
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
                <div className="fixed left-4 bottom-8">
                    <BaseButton
                        click={this.decrementIndex}
                        isDisabled={this.checkIfMinIndex()}
                        icon={{
                            name: "arrow-left",
                            size: "40"
                        }}
                    />
                </div>
                <div className="fixed right-4 bottom-8">
                    <BaseButton
                        click={this.incrementIndex}
                        isDisabled={this.checkIfMaxIndex()}
                        icon={{
                            name: "arrow-right",
                            size: "40"
                        }}
                    />
                </div>
            </div>
        );
    }
}

IntentLister.propTypes = {
    intents: PropTypes.arrayOf(PropTypes.object).isRequired,
    index: PropTypes.number.isRequired,
}

 
export default IntentLister;