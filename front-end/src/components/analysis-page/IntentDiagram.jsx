import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IntentDiagram extends Component {
    listLeaves = () => {
        return Object.keys(this.props.branches).map((key) => {
            return (
                <div 
                    className="w-40 h-32 overflow-hidden hover:overflow-y-scroll text-md bg-green-100 shadow-md shadow-blue/10 rounded-2xl p-5 border-2 border-green-200"
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
            <div className="text-black font-cabin flex flex-col justify-center pt-1 -mb-7">
                <h3
                    className="max-w-[33rem] min-h-32 max-h-36 rounded-lg bg-off-white self-center p-5 shadow-lg shadow-blue/10 align-middle text-center md:text-xl 2xl:text-2xl"
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