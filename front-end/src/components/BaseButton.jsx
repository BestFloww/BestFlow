import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon.jsx';

const BaseButton = (props) => {
    // Change button styling based on whether it is enabled or disabled
    const getButtonStyle = () => {
        const baseStyling = "bg-blue-300 font-bold rounded-lg shadow-lg py-3 px-6 ";
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
                { props.svgName && <Icon name={props.svgName} color={props.svgColor} size={props.svgSize}/> }
            </button>
        </div>
    )
};

BaseButton.propTypes = {
    text: PropTypes.string,
    click: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
    svgName: PropTypes.string,
    svgColor: PropTypes.string,
    svgSize: PropTypes.number
};

BaseButton.defaultProps = {
    isDisabled: false
};

export default BaseButton;