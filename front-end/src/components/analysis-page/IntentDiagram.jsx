import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../../store.js';
import { toggleFlag, toggleStar } from '../../store/analyzeTranscriptSlice.js';
import StarAPI from "../../services/StarAPI.js";
import FlagAPI from "../../services/FlagAPI.js";

class IntentDiagram extends Component {
    listLeaves = () => {
        return Object.keys(this.props.children).map((key) => {
            return (
                <div 
                    className="container object-contain mx-auto text-md place-content-center
                    bg-green-100 flex-col flex gap-y-0 shadow-md shadow-blue/10 rounded-2xl p-5
                    border-2 border-green-200 hover:border-black focus-within:border-black"
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
                        data-testid={`${key}-${this.props.children[key]}`}
                        tabIndex={0}
                    >
                        {this.props.children[key]}%
                    </p>
                </div>
            );
        });
    }

    toggleStarred = async(intentQuestion) => {
        const newStarredStatus = !this.props.isStarred;
        store.dispatch(toggleStar(intentQuestion));
        const changedIntent = {question: this.props.question, children: this.props.children, star: newStarredStatus, flag: this.props.isFlagged};
        await StarAPI.put(changedIntent);
    }

    toggleFlagged = async(intentQuestion) => {
        const newFlaggedStatus = !this.props.isFlagged;
        store.dispatch(toggleFlag(intentQuestion));
        const changedIntent = {question: this.props.question, children: this.props.children, star: this.props.isStarred, flag: newFlaggedStatus};
        await FlagAPI.put(changedIntent);
    }

    render() { 
        return (
            <div className="container mx-auto text-black font-cabin flex flex-col pt-1 gap-y-2">
                <div className="inline-flex place-self-center">
                    <button onClick={this.toggleStarred(this.props.question)} aria-label="star button">
                        <label>
                            <svg
                            className={this.props.isStarred ? "w-16 m-3 fill-yellow cursor-pointer": "w-16 m-3 fill-transparent cursor-pointer"}
                            viewBox="0 0 25 25" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" stroke-width="1.5px" stroke="#000000"/>  
                            </svg>
                        </label>
                    </button>
                    <h3
                        className="rounded-lg bg-off-white self-center p-5 shadow-lg shadow-blue/10 break-words text-center md:text-xl 2xl:text-2xl"
                        data-testid={this.props.question}
                    >
                        {this.props.question}
                    </h3>
                    <button onClick={this.toggleFlagged(this.props.question)} aria-label="flag-button">
                        <label>
                            <svg
                            className={this.props.isFlagged ? "w-16 m-3 fill-red cursor-pointer": "w-16 m-3 fill-transparent cursor-pointer"}
                            viewBox="0 0 512 512" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg">
                                <path d="M368,112c-11,1.4-24.9,3.5-39.7,3.5c-23.1,0-44-5.7-65.2-10.2c-21.5-4.6-43.7-9.3-67.2-9.3c-46.9,0-62.8,10.1-64.4,11.2   l-3.4,2.4v2.6v161.7V416h16V272.7c6-2.5,21.8-6.9,51.9-6.9c21.8,0,42.2,8.3,63.9,13c22,4.7,44.8,9.6,69.5,9.6   c14.7,0,27.7-2,38.7-3.3c6-0.7,11.3-1.4,16-2.2V126v-16.5C379.4,110.4,374,111.2,368,112z" stroke-width="2em" stroke="#000000" fill="content"/>
                            </svg>
                        </label>
                    </button>
                </div>
                <div className="rounded-lg flex flex-row mx-auto justify-between text-center gap-x-9 m-9">
                    {this.listLeaves()}
                </div>
            </div>
        );
    }
}

IntentDiagram.propTypes = {
    question: PropTypes.string.isRequired,
    children: PropTypes.objectOf(PropTypes.number).isRequired,
    isFlagged: PropTypes.bool.isRequired,
    isStarred: PropTypes.bool.isRequired,
}

 
export default IntentDiagram;