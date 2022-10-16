import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IntentDiagram extends Component {
    listLeaves = () => {
        const result = [];
        this.props.children.forEach((value, key) => {
            result.push(
                <div 
                    className="text-sm bg-green-300 flex-col flex gap-y-0 shadow-sm rounded-full p-5 border border-green-300 hover:border-black focus-within:border-black"
                    key={key}
                >
                    <h4 
                        className="break-words"
                        tabindex={0}
                    >
                        {key} 
                    </h4>
                    <p tabindex={0}> {value}% </p>
                </div>
            );
        });
        return result;
    }

    render() { 
        return (
            <div className="border-2 border-gray-700 rounded-lg bg-purple-400 shadow-lg text-black flex flex-col p-5 pt-1 w-80 gap-y-2">
                <h3 className="break-words text-center text-lg">
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
    children: (props, propName, componentName) => {
        let error;
        if (!(props[propName] instanceof Map)) {
            error = new Error(`${componentName} does not have children with data-type Map`);
        }
        return error;
    }
}

 
export default IntentDiagram;