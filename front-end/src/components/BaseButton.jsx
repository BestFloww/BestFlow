import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon.jsx';

const BaseButton = (props) => {
    // Change button styling based on whether it is enabled or disabled
    const getButtonStyle = () => {
        const baseStyling = "bg-blue-300 rounded-lg shadow-lg py-3 px-6 ";
        const disabledStyling = "opacity-50";
        const enabledStyling = "hover:bg-blue-200 active:bg-blue-400";
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
                { props.icon && <Icon icon={props.icon}/> }
            </button>
        </div>
    )
};

BaseButton.propTypes = {
    text: PropTypes.string,
    click: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
    icon: PropTypes.object,
};

BaseButton.defaultProps = {
    isDisabled: false
};

export default BaseButton;