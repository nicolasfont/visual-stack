import './Button.css';

import { concat, omit } from 'ramda';
import React, { PropTypes } from 'react';

const mkButton = buttonType => props => {
  const { children, className, type, large } = props;
  const otherProps = omit(['children', 'className', 'type', 'large'], props);

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
