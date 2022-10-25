import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IntentDiagram extends Component {
    listLeaves = () => {
        return Object.keys(this.props.branches).map((key) => {
            return (
                <div 
                    className="text-sm bg-emerald-500 flex-col flex gap-y-0 shadow-sm rounded-2xl p-5 border border-emerald-500 hover:border-black focus-within:border-black"
                    data-testid={`${key}-container`}
                    key={key}
                >
                    <h4 
                        className="break-words"
                        data-testid={key}
                        tabIndex={0}
                    >
                        {key} 
                    </h4>
                    <p
                        data-testid={`${key}-${this.props.branches[key]}`}
                        tabIndex={0}
                    >
                        {this.props.branches[key]}%
                    </p>
                </div>
            );
        });
    }

    render() { 
        return (
            <div className="border-2 border-gray-700 rounded-lg bg-gray-100 shadow-lg text-black flex flex-col p-5 pt-1 w-80 gap-y-2">
                <h3
                    className="break-words text-center text-lg"
                    data-testid={this.props.question}
                >
                    {this.props.question}
                </h3>
                <div className="flex flex-row mx-auto justify-between text-center gap-x-2">
                    {this.listLeaves()}
                </div>
            </div>
        );
    }
}

IntentDiagram.propTypes = {
    question: PropTypes.string.isRequired,
    branches: PropTypes.objectOf(PropTypes.number).isRequired,
}

 
export default IntentDiagram;