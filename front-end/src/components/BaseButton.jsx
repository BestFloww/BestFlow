import React from 'react';
import PropTypes from 'prop-types';

const BaseButton = (props) => {
    return (
        <div className='flex'>
            <button
                onClick={props.click}
                className="bg-blue-300 rounded-lg shadow-lg hover:bg-blue-200 active:bg-blue-400 py-3 px-6"
                data-testid="custom-button"
            > 
                { props.text }
            </button>
        </div>
    )
};

BaseButton.propTypes = {
    text: PropTypes.string,
    click: PropTypes.func.isRequired,
}

export default BaseButton;