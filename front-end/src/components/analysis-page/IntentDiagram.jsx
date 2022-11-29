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
                    className="text-md bg-green-100 shadow-md shadow-blue/10 rounded-2xl pb-2 mb-5 border-2 border-green-200"
                    key={key}
                >
                    <p
                        data-testid={`${key}-${this.props.children[key]}`}
                        className="w-20 h-9 p-2 flex align-center justify-center text-md mx-auto"
                    >
                        {this.props.children[key]}%
                    </p>
                    <div
                        className="w-40 h-24 overflow-hidden overflow-y-scroll flex align-center justify-center"
                        data-testid={`${key}-container`}
                    >
                        <h4 
                            className="break-words text-center my-auto w-32"
                            data-testid={key}
                        >
                            {key} 
                        </h4>
                    </div>
                </div>
            );
        });
    }

    toggleStarred = async() => {
        try {
            const projectId = store.getState().analyzeTranscript.projectIdToBeDisplayed;
            store.dispatch(toggleStar(this.props.question));
            await StarAPI.put(
                {
                    question: this.props.question,
                    projectId: projectId,
                    starStatus: !this.props.isStarred
                });
        } catch (e) {
            window.alert("Error in starring question. Please try again. " + e.response.error);
        }
    }

    toggleFlagged = async() => {
        try {
            const projectId = store.getState().analyzeTranscript.projectIdToBeDisplayed;
            store.dispatch(toggleFlag(this.props.question));
            await FlagAPI.put(
                {
                    question: this.props.question,
                    projectId: projectId,
                    flagStatus: !this.props.isFlagged
                });
        } catch (e) {
            window.alert("Error in flagging question. Please try again. " + e.response.error);
        }
    }

    render() { 
        return (
            <div className="text-black font-cabin flex flex-col place-self-center pt-1 -mb-9">
                <div className="inline-flex place-items-center max-w-[20rem] sm:max-w-[47rem]">
                    <button className="w-16 h-16" onClick={this.toggleStarred} aria-label="star button" data-testid="star-button">
                        <label>
                            <svg
                            className={this.props.isStarred ? "w-16 fill-yellow cursor-pointer": "w-16 fill-transparent cursor-pointer"}
                            data-testid="star-svg"

                            viewBox="0 0 25 25" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" strokeWidth="1.5px" stroke="#000000"/>  
                            </svg>
                        </label>
                    </button>
                    <h3
                        className="rounded-lg bg-off-white self-center p-5 shadow-lg shadow-blue/10 break-words text-center md:text-lg 2xl:text-2xl w-52 sm:min-w-[30rem] sm:max-w-[35rem] 2xl:max-h-[14rem]"
                        data-testid={this.props.question}
                    >
                        {this.props.question}
                    </h3>
                    <button className="w-16 h-16" onClick={this.toggleFlagged} aria-label="flag button" data-testid="flag-button">
                        <label>
                            <svg
                            className={this.props.isFlagged ? "w-16 fill-red cursor-pointer": "w-16 fill-transparent cursor-pointer"}
                            data-testid="flag-svg"

                            viewBox="0 0 512 512" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg">
                                <path d="M368,112c-11,1.4-24.9,3.5-39.7,3.5c-23.1,0-44-5.7-65.2-10.2c-21.5-4.6-43.7-9.3-67.2-9.3c-46.9,0-62.8,10.1-64.4,11.2   l-3.4,2.4v2.6v161.7V416h16V272.7c6-2.5,21.8-6.9,51.9-6.9c21.8,0,42.2,8.3,63.9,13c22,4.7,44.8,9.6,69.5,9.6   c14.7,0,27.7-2,38.7-3.3c6-0.7,11.3-1.4,16-2.2V126v-16.5C379.4,110.4,374,111.2,368,112z" strokeWidth="2em" stroke="#000000" fill="content"/>
                            </svg>
                        </label>
                    </button>
                </div>
                <div className="rounded-lg flex flex-col gap-y-3 md:flex-row mx-auto justify-between text-center gap-x-9 m-9">
                    {this.listLeaves()}
                </div>
            </div>
        );
    }
}

IntentDiagram.propTypes = {
    question: PropTypes.string.isRequired,
    children: PropTypes.objectOf(PropTypes.number).isRequired,
    isFlagged: PropTypes.bool,
    isStarred: PropTypes.bool,
};

IntentDiagram.defaultProps = {
    isFlagged: false,
    isStarred: false,
};

 
export default IntentDiagram;