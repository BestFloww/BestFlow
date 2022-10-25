import React from 'react';
import PropTypes from 'prop-types';

const BaseButton = (props) => {
    // Change button appearance based on whether it is enabled or disabled
    const getButtonStyle = () => {
        const baseStyling = "font-cabin bg-purple-300 rounded-lg shadow-lg shadow-blue/30 py-3 px-6 ";
        const disabledStyling = "opacity-50";
        const enabledStyling = "hover:bg-purple-200 active:bg-purple-400";
        return baseStyling + (props.isDisabled ? disabledStyling : enabledStyling);
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
    isDisabled: PropTypes.bool,
}

BaseButton.defaultProps = {
    isDisabled: false,
}

export default BaseButton;