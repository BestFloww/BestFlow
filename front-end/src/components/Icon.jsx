import React from 'react';
import Icons from './icons/icons.svg';
import PropTypes from 'prop-types';

const Icon = (props) => {
    return (
        <svg
          className={`icon ${props.icon.name}`}
          fill={props.icon.color}
          width={props.icon.size}
          height={props.icon.size}
        >
          <use xlinkHref={`${Icons}#${props.icon.name}`} />
        </svg>
    )
};

Icon.propTypes = {
  icon: PropTypes.shape({
    // The icon's name is required, all other attributes only required to overwrite default appearance of icon as described in icons.svg
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number
  })
};
  
export default Icon;