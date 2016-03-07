import './Button.css';

import { concat } from 'ramda';
import React, { PropTypes } from 'react';

const mkButton = buttonType => ({ children, className, type, large, ...otherProps }) => {
  const classes = concat(
    ['btn-d', `${type}-btn`],
    large ? ['lrg-btn'] : [],
    className ? [className] : []
  );

  return (
    <button
      type={buttonType}
      {...otherProps}
      className={classes.join(' ')}>
      {children}
    </button>
  );
};

export const Button = mkButton('button');
export const SubmitButton = mkButton('submit');

Button.propTypes = SubmitButton.propTypes = {
  type: PropTypes.oneOf(['primary', 'success', 'info', 'default', 'warning', 'danger']).isRequired,
  large: PropTypes.bool,
};
