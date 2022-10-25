import React from 'react';
import PropTypes from 'prop-types';

const BaseButton = (props) => {
    // Change button appearance based on whether it is enabled or disabled
    const getButtonStyle = () => {
        let styling = "font-cabin bg-purple-300 rounded-lg shadow-lg shadow-blue/30 "
        //Styling for enabled vs. disabled buttons
        if (props.isDisabled) {
            styling += "opacity-50 ";
        }
        else {
            styling += "hover:bg-purple-200 active:bg-purple-400 ";
        }
        //Styling for size presets
        switch(props.size) {
            case "sm":
                styling += "py-1 px-4 md:text-md 2xl:text-lg";
                break;
            case "lg":
                styling += "md:py-5 md:px-6 md:text-2xl 2xl:py-6 2xl:px-9 2xl:text-2xl";
                break;
            default:
                styling += "py-3 px-6 md:text-lg 2xl:text-2xl";

        }
        return styling;
    };

    return (
        <div className='flex'>
            <button
                onClick={props.click}
                className={getButtonStyle()}
                data-testid="custom-button"
                disabled={props.isDisabled}
            > 
                { props.text }
            </button>
        </div>
    )
};

BaseButton.propTypes = {
    text: PropTypes.string,
    click: PropTypes.func.isRequired,
    size: PropTypes.string,
    isDisabled: PropTypes.bool,
}

BaseButton.defaultProps = {
    isDisabled: false,
}

export default BaseButton;