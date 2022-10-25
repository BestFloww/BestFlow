import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IntentDiagram extends Component {
    listLeaves = () => {
        return Object.keys(this.props.branches).map((key) => {
            return (
                <div 
                    className="container mx-auto text-md place-content-center
                    bg-green-100 flex-col flex gap-y-0 shadow-md shadow-blue/10 rounded-2xl p-5 border-2 border-green-200 hover:border-black focus-within:border-black"
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
            <div className="container mx-auto text-black font-cabin flex flex-col pt-1 gap-y-2">
                <h3
                    className="rounded-lg bg-off-white self-center w-80 p-5 shadow-lg shadow-blue/10 break-words text-center text-2xl"
                    data-testid={this.props.question}
                >
                    {this.props.question}
                </h3>
                <div className="rounded-lg flex flex-row mx-auto justify-between text-center gap-x-9 m-9">
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