import React from 'react';
import Icons from './icons/icons.svg';
import PropTypes from 'prop-types';

const Icon = (props) => {
    return (
        <svg className={`${props.name}`} fill={props.color} height={props.size} width={props.size}>
            <use xlinkHref={`${Icons}#${props.name}`} />
        </svg>
    )
};

Icon.propTypes = {
    // The icon's name is required, all other attributes only required to overwrite defaults in icons.svg
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number
};
  
export default Icon;