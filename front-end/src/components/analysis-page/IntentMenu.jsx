import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from "../../store.js";
import { setDisplayingQuestion } from '../../store/analyzeTranscriptSlice.js';
import BaseButton from "../general/BaseButton.jsx";
import IntentSearch from "../helpers/IntentSearch.js";

// Create search logic
const search = new IntentSearch();

class IntentMenu extends Component {
    
    constructor(props) {
        super(props);
        this.ref = React.createRef();  // Create a React reference to the entire intent menu element
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            inputValue: "",
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }
    
    handleClickOutside(event) {
        /**
         * Detect when the user clicks outside of the intent menu to hide it.
         * This works by checking whether the click target is contained by the intent menu element, which is identified through the ref created in the constructor. If not contained, then the click was outside of the menu and it should close.
         * */
        if (this.ref.current && !this.ref.current.contains(event.target)) {
          this.props.onClickOutside();
        }
    }

    handleChange(event) {
        /**
         * Update the input value state based on the search input field 
         * */
        this.setState({inputValue: event.target.value});
    }

    formatSearchResult = (text, slices) => {
        /** 
        * Return an element that displays and formats a slice of <text> based on <slices>.
        * Used to highlight the slice of an intent's question that matches the search string, and display the remaining text normally.
        * */

        // First, create slice boundaries to define when to change the text format
        const startText = Math.max(slices[text].start - 5, 0);  // Display <text> starting a few chars before the searched portion
        const startSearchSlice = slices[text].start;  // Receive the starting index of the searched portion
        const endSearchSlice = slices[text].end;  // Receive the ending index of the searched portion

        return (
            <div className="truncate" /* Display <text> in 3 slices, with the middle one having highlighted formatting */>
                {(startText > 0 ? "..." : "") + text.slice(startText, startSearchSlice)
                /* Begin text with ellipsis if preceding characters are truncated */}
                <span /* */
                    className='bg-gray-100'>{text.slice(startSearchSlice, endSearchSlice)}
                </span>
                {text.slice(endSearchSlice)}
            </div>
        );
    }

    listIntents = () => {
        // Filter intents based on search input value
        const { filteredIntents, searchSlices } = search.filterIntents(this.props.intents, this.state.inputValue);

        // Generate a list of navigation buttons with each corresponding to 1 intent from the filtered transcript, in order
        // Intents which do not pass the search filter are not rendered in the list
        return filteredIntents.map((intent, filteredIndex) => {

            // Create a function to change this transcript's display index to the index necessary for displaying the current intent
            const goToIntent = () => {
                // Find the index in the original, unfiltered intent list necessary to display this intent
                let originalIndex = this.props.intents.indexOf(intent);
                originalIndex = originalIndex - (originalIndex % 3);
                // Dispatch the index to display the correct set of intents
                store.dispatch(setDisplayingQuestion(originalIndex));
            }

            return (
                // Generate and display a unique button element for this intent
                <li className="relative" key={filteredIndex}>
                    <button
                        className="w-full text-left text-lg py-0 px-4 h-10 rounded truncate overflow-hidden box-border 
                        hover:bg-gray-100 hover:text-black transition ease-in-out
                        focus-within:bg-gray-100 focus-within:text-black"
                        onClick={goToIntent}
                        aria-label={intent.question}
                        data-testid="intent-menu-list-item"
                    >
                        <div /* Format the text representation of the intent in the intent menu */>
                            {this.formatSearchResult(intent.question, searchSlices)}
                        </div>
                    </button>
                </li>
            );
        });
    }

	render() {
		return (
            <div /* Ternary operator is used in class below to animate sliding in/out of intent menu depending on isOpen prop */
                className={"z-10 w-1/4 h-full bg-off-white font-cabin absolute shadow-lg shadow-blue/30 transition ease-in-out " + (this.props.isOpen ? "translate-x-0" : "-translate-x-full")}
                data-testid="intent-menu"
                ref={this.ref}
            >
                <div className="ml-4 mt-4">
                    <BaseButton
                        click={this.props.onClickOutside}
                        label="Close intent menu"
                        icon={{
                            name: "x",
                            size: "20",
                            color: "black"
                        }}
                    />
                </div>
                <ul className="text-center font-bold text-xl mt-10"> 
                    Transcript Intents:
                </ul>
                <ul className="h-2/3 relative overflow-y-scroll bg-off-white-100 shadow-inner-lg rounded p-2 my-4 mx-4">
                    {this.listIntents() /* List of intent buttons */}
                </ul>
                <ul className="flex flex-col" >
                    <input /* Transcript search input */
                        className="bg-off-white text-xl ml-4 mr-4 mt-4 rounded-md px-4 py-2 drop-shadow-md outline-none transition ease-in-out
                        border border-solid border-purple-100
                        hover:border-purple-200
                        focus:border-purple-300 focus:ring-purple-300"
                        aria-label="Search by intent contents"
                        placeholder="Search by intent contents"
                        id="intent-menu-search"
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
    isOpen: PropTypes.bool.isRequired,
    onClickOutside: PropTypes.func,
};

export default IntentMenu;