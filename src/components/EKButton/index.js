import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './ek-button.scss';

const EKButton = props => {

  const { className, style, size, color, children, onClick } = props;
  const buttonStyle = cx('ekbutton', className, `ekbutton__size--${size}` );

  return (
    <button onClick= { onClick } className={ buttonStyle } style={ { ...style, backgroundColor: color } }>
      { children }
    </button>
    
  );
};

EKButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(['s', 'm', 'l']),
  color: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default EKButton;