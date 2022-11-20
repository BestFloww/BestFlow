import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from "../../store.js";
import { setDisplayingQuestion } from '../../store/analyzeTranscriptSlice.js';

class IntentMenu extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            inputValue: "",
        };
    }
    
    handleChange = (event) => {
        // Update the input value state based on input field
        this.setState({inputValue: event.target.value});
    }

    listIntents = () => {
        // Generate a list of navigation buttons with each corresponding to 1 intent from the current transcript, in order
        return this.props.intents.map((intent, buttonIndex) => {

            const goToIntent = () => {
                // Set the transcript index to display this intent
                const displayIndex = buttonIndex - (buttonIndex % 3);
                store.dispatch(setDisplayingQuestion(displayIndex));
            }

            return (
                // SEARCH FEATURE: If the user's search input matches this intent's question, then
                intent.question.toLowerCase().includes(this.state.inputValue.toLowerCase()) ?
                // Generate and display a unique button element for this intent
                <li className="relative" key={buttonIndex}>
                    <button
                        className="w-full text-left text-lg py-0 px-4 h-10 rounded truncate overflow-hidden box-border 
                        hover:bg-gray-100 hover:text-black transition duration-300 ease-in-out
                        focus-within:bg-gray-100 focus-within:text-black"
                        onClick={goToIntent}
                    >
                        {intent.question}
                    </button>
                </li>
                // Otherwise, do not include this intent in the menu
                : null
            );
        });
    }

	render() {
		return (
            <div className="z-10 w-1/4 h-full bg-off-white font-cabin absolute shadow-lg shadow-blue/30">
                <ul className='text-center font-bold text-xl mt-24'> 
                    Transcript Intents:
                </ul>
                <ul className="h-2/3 relative overflow-y-scroll bg-off-white-100 shadow-inner-lg rounded p-2 my-4 mx-4"
                    /*List of intent buttons*/>
                    {this.listIntents()}
                </ul>
                <ul className="flex flex-col">
                    <input
                        className="bg-off-white text-xl ml-4 mr-4 my-4 rounded-md px-4 py-2 drop-shadow-md outline-none transition ease-in-out
                        border border-solid border-purple-100
                        hover:border-purple-200
                        focus:border-purple-300 focus:ring-purple-300"
                        aria-label="Search by intent contents"
                        placeholder="Search by intent contents"
                        onChange={this.handleChange}
                        value={this.state.inputValue}
                    />
                </ul>
            </div>
        );
    }
}

IntentMenu.propTypes = {
    intents: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IntentMenu;