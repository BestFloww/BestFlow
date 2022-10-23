import React from 'react';
import PropTypes from 'prop-types';

const BaseButton = (props) => {
    // Change button appearance based on whether it is enabled or disabled
    const style = () => {
        if (props.isDisabled) {
            return "bg-blue-300 rounded-lg shadow-lg opacity-50 py-3 px-6";
        } else {
            return "bg-blue-300 rounded-lg shadow-lg hover:bg-blue-200 active:bg-blue-400 py-3 px-6";
        }
    };

    return (
        <div className='flex'>
            <button
                onClick={props.click}
                className={style()}
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