import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IntentDiagram extends Component {
    listLeaves = () => {
        return Object.keys(this.props.children).map((key) => {
            return (
                <div 
                    className="text-sm bg-green-300 flex-col flex gap-y-0 shadow-sm rounded-full p-5 border border-green-300 hover:border-black focus-within:border-black"
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
                        data-testid={`${key}-${this.props.children[key]}`}
                        tabIndex={0}
                    >
                        {this.props.children[key]}%
                    </p>
                </div>
            );
        });
    }

    render() { 
        return (
            <div className="border-2 border-gray-700 rounded-lg bg-purple-400 shadow-lg text-black flex flex-col p-5 pt-1 w-80 gap-y-2">
                <h3
                    className="break-words text-center text-lg"
                    data-testid={this.props.question}
                >
                    {this.props.question}
                </h3>
                <div className="flex flex-row justify-between text-center gap-x-2">
                    {this.listLeaves()}
                </div>
            </div>
        );
    }
}

IntentDiagram.propTypes = {
    question: PropTypes.string.isRequired,
    children: PropTypes.objectOf(PropTypes.number).isRequired,
}

 
export default IntentDiagram;