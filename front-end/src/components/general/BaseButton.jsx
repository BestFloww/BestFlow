import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon.jsx';

const BaseButton = (props) => {
    // Change button styling based on whether it is enabled or disabled
    const getButtonStyle = () => {
        let styling = "font-cabin bg-purple-300 rounded-lg shadow-lg shadow-blue/30 group relative inline-block transition ease-in-out "
        // Styling for enabled vs. disabled buttons
        if (props.isDisabled) {
            styling += "opacity-50 ";
        }
        else {
            styling += "hover:bg-purple-200 active:bg-purple-400 ";
        }
        // Styling for size presets
        switch(props.size) {
            case "sm":
                styling += "py-1 px-4 md:text-md 2xl:text-lg";
                break;
            case "lg":
                styling += "md:py-5 md:px-6 md:text-2xl 2xl:py-8 2xl:px-9 2xl:text-2xl";
                break;
            default:  // medium-sized button
                styling += "py-3 px-6 md:text-lg 2xl:text-2xl";
        }
        return styling;
    };

    return (
        <div className='flex'>
            <button
                onClick={props.click}
                className={getButtonStyle()}
                disabled={props.isDisabled}
                aria-label={props.label || props.text}
                data-testid="custom-button"
            >
                <div className="flex items-center space-x-2 p-3 sm:p-0">
                    {props.icon && <div className="mx-auto"><Icon icon={props.icon}/></div>}
                    {props.text && <div className="mx-auto">{ props.text }</div>}
                </div>
                <div className="group-hover:flex hidden">
                {/* Render tooltip */ !props.isDisabled && props.tooltip &&
                    <span
                        className="absolute hidden group-hover:flex -right-5 -top-2 -translate-y-full w-32 px-2 py-1 bg-gray-200 rounded-lg text-center text-off-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-200"
                        data-testid="tooltip"
                    >
                        {props.tooltip}
                    </span>
                }
                </div>
            </button>
        </div>
    )
};

BaseButton.propTypes = {
    text: PropTypes.string,
    click: PropTypes.func.isRequired,
    size: PropTypes.string,
    tooltip: PropTypes.string,
    isDisabled: PropTypes.bool,
    icon: PropTypes.object,
    label: (props) => {
        // Buttons without text must instead have a descriptive label string for accessibility
        if (props["text"] == null && props["label"] == null) {
            return new Error("Must provide a label string if the button has no text.");
        }
        // Label must be of string type
        if (props["label"] != null && typeof(props["label"]) != "string") {
            return new Error("Label must be a string.");
        }
    }
};

BaseButton.defaultProps = {
    isDisabled: false,
};

export default BaseButton;