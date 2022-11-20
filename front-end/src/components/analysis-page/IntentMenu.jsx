import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import store from "../../store.js";

class IntentMenu extends Component {
    listIntents = () => {
        return this.props.intents.map(intent => {
            return (
                <li class="relative">
                    <button class="w-full font-cabin text-left text-xl py-0 px-4 h-12 rounded truncate overflow-hidden box-border 
                    hover:bg-gray-100 hover:text-black transition duration-300 ease-in-out
                    focus-within:bg-gray-100 focus-within:text-black">
                        {intent.question}
                    </button>
                </li>
            );
        });
    }

	render() {
		return (
            <div class="z-10 w-1/4 h-full bg-off-white px-1 absolute shadow-lg shadow-blue/30">
                <ul class="relative">
                    {this.listIntents()}
                </ul>
            </div>
        );
    }
}

IntentMenu.propTypes = {
    intents: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IntentMenu;