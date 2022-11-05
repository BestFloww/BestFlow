import React from 'react';
import Icons from './icons/icons.svg';
import PropTypes from 'prop-types';

const Icon = (props) => {
    return (
        <svg
          className={`icon-${props.icon.name}`}
          alt={props.icon.name}
          fill={props.icon.color}
          width={props.icon.size}
          height={props.icon.size}
          data-testid={`custom-icon-${props.icon.name}`}
        >
          <use xlinkHref={`${Icons}#${props.icon.name}`} />
        </svg>
    )
};

Icon.propTypes = {
  icon: PropTypes.shape({
    // The icon's name is required, all other attributes only required to overwrite default appearance of icon as described in Icons.svg
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.string
  })
};
  
export default Icon;