import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from "../../store.js";
import { setDisplayingQuestion } from '../../store/analyzeTranscriptSlice.js';
import { toggleStarFilter } from "../../store/starFilterSlice.js";
import { toggleFlagFilter } from "../../store/flagFilterSlice.js";
import BaseButton from "../general/BaseButton.jsx";
import IntentSearch from "../helpers/IntentSearch.js";
import {connect} from "react-redux";

const search = new IntentSearch();

class IntentMenu extends Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();  // Create a React reference to the entire intent menu element
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            inputValue: "",
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }

    handleClickOutside(event) {
        if (this.ref.current && !this.ref.current.contains(event.target)) {
            // Close menu if ref (this element) contains the click target
            this.props.onClickOutside();
        }
    }

    handleChange(event) {
        this.setState({inputValue: event.target.value});
    }

    handleStarFilterChange() {
        store.dispatch(toggleStarFilter());
    }

    handleFlagFilterChange() {
        store.dispatch(toggleFlagFilter());
    }

    handleKeyDown(event) {
        switch(event.key) {
            case "Enter":
            case "Space":
                if (!this.ref.current.contains(event.target)) {
                    // Close menu if ref (this element) does not contain the key target, and the key is used for accessibility
                    this.props.onClickOutside();
                }
                break;
            case "Escape":
                // If the key is Escape, close menu no matter the target
                this.props.onClickOutside();
                break;
            default:
                break;
        };
    }

    formatSearchResult = (text, slices) => {
        const startText = Math.max(slices[text].start - 5, 0);  // Display text starting a few chars before the searched portion
        const startSearchSlice = slices[text].start;
        const endSearchSlice = slices[text].end;

        return (
            <div className="truncate" /* Display text in 3 slices, with the middle one having highlighted styling */>
                {(startText > 0 ? "..." : "") + text.slice(startText, startSearchSlice)
                    /* Begin text with ellipsis if preceding characters are truncated */}
                <span /* */
                    className='bg-gray-100'>{text.slice(startSearchSlice, endSearchSlice)}
                </span>
                {text.slice(endSearchSlice)}
            </div>
        );
    }

    addStarIndicator = (intent) => {
        if (intent.star) {
            return (
                <div
                    className="rounded-full h-2 w-2 bg-yellow my-0.5 mr-1"
                    data-testid="star-circle"
                >
                </div>
            )
        }
    }

    addFlagIndicator = (intent) => {
        if (intent.flag) {
            return (
                <div
                    className="rounded-full h-2 w-2 bg-red my-0.5 mr-1"
                    data-testid="flag-circle"
                >
                </div>
            )
        }
    }

    listIntents = () => {
        let { filteredIntents, searchSlices } = search.filterIntents(this.props.intents, this.state.inputValue,
            this.props.starFilter, this.props.flagFilter);

        // Generate a list of buttons with each corresponding to 1 intent from the filtered intents list, in order
        return filteredIntents.map((intent, filteredIndex) => {

            const goToIntent = () => {
                // Dispatch the index in the original, unfiltered intent list necessary to display this intent
                let originalIndex = this.props.intents.indexOf(intent);
                originalIndex = originalIndex - (originalIndex % 3);
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
                        <div>
                            <div
                                className="inline-block align-middle"
                            >
                                {this.addStarIndicator(intent)}
                                {this.addFlagIndicator(intent)}
                            </div>
                            <div /* Format the text representation of the intent in the intent menu */
                                className="inline-block align-middle"
                            >
                                {this.formatSearchResult(intent.question, searchSlices)}
                            </div>
                        </div>
                    </button>
                </li>
            );
        });
    }

    render() {
        return (
            <div /* Ternary operator is used in class below to animate sliding in/out of intent menu depending on isOpen prop */
                className={"z-10 w-full sm:w-1/3 lg:w-1/4 h-full bg-off-white font-cabin fixed sm:absolute shadow-lg shadow-blue/30 transition ease-in-out " + (this.props.isOpen ? "translate-x-0" : "-translate-x-full")}
                data-testid="intent-menu"
                aria-hidden={!this.props.isOpen}
                ref={this.ref}
            >
                {this.props.isOpen && /* Only render internal elements if menu isOpen */
                    <div className="h-5/6">
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
                        <div
                            className="mx-3 my-3"
                        >
                            <div
                                className="inline-block align-middle"
                            >
                                <button
                                    className="w-10 h-10"
                                    onClick={this.handleStarFilterChange}
                                    aria-label="filter star button"
                                    data-testid="star-filter"
                                >
                                    <label>
                                        <svg
                                            className={this.props.starFilter ? "w-10 fill-yellow cursor-pointer": "w-10 fill-transparent cursor-pointer"}
                                            viewBox="0 0 25 25" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" strokeWidth="1.5px" stroke="#000000"/>
                                        </svg>
                                    </label>
                                </button>
                            </div>
                            <div
                                className="inline-block align-middle"
                            >
                                <button
                                    className="w-10 h-10"
                                    onClick={this.handleFlagFilterChange}
                                    aria-label="filter flag button"
                                    data-testid="flag-filter"
                                >
                                    <label>
                                        <svg
                                            className={this.props.flagFilter ? "w-10 fill-red cursor-pointer": "w-10 fill-transparent cursor-pointer"}

                                            viewBox="0 0 512 512" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M368,112c-11,1.4-24.9,3.5-39.7,3.5c-23.1,0-44-5.7-65.2-10.2c-21.5-4.6-43.7-9.3-67.2-9.3c-46.9,0-62.8,10.1-64.4,11.2   l-3.4,2.4v2.6v161.7V416h16V272.7c6-2.5,21.8-6.9,51.9-6.9c21.8,0,42.2,8.3,63.9,13c22,4.7,44.8,9.6,69.5,9.6   c14.7,0,27.7-2,38.7-3.3c6-0.7,11.3-1.4,16-2.2V126v-16.5C379.4,110.4,374,111.2,368,112z" strokeWidth="2em" stroke="#000000" fill="content"/>
                                        </svg>
                                    </label>
                                </button>
                            </div>
                        </div>
                        <ul className="text-center font-bold text-xl">
                            Transcript Intents:
                        </ul>
                        <ul className="h-4/5 relative overflow-y-scroll bg-off-white-100 shadow-inner-lg rounded p-2 my-3 mx-4">
                            {this.listIntents()}
                        </ul>
                        <ul className="flex flex-col" >
                            <input /* Transcript search input */
                                className="bg-off-white text-xl ml-4 mr-4 mt-3 rounded-md px-4 py-2 drop-shadow-md outline-none transition ease-in-out
                                border border-solid border-purple-100
                                hover:border-purple-200
                                focus:border-purple-300 focus:ring-purple-300"
                                aria-label="Search by keyword"
                                placeholder="Search by keyword"
                                id="intent-menu-search"
                                onChange={this.handleChange}
                                value={this.state.inputValue}
                            />
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    starFilter: state.starFilter.starFilterState,
    flagFilter: state.flagFilter.flagFilterState
});

IntentMenu.propTypes = {
    intents: PropTypes.arrayOf(PropTypes.object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClickOutside: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(IntentMenu);