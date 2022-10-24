import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IntentDiagram from './IntentDiagram.jsx';

class IntentLister extends Component {

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
        let curr = this.props.index;
        while (this.props.intents[curr] && curr < this.props.index + MAX_CURRENT_INTENTS) {
            currentIntents.push(this.props.intents[curr]);
            curr++;
        }
        return (
            <div className="full h-full flex flex-col mx-auto gap-y-20 justify-evenly">
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
        );
    }
}

IntentLister.propTypes = {
    intents: PropTypes.arrayOf(PropTypes.object).isRequired,
    index: PropTypes.number.isRequired,
}

 
export default IntentLister;