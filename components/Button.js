import './Button.css';

import { concat, omit } from 'ramda';
import React, { PropTypes } from 'react';

export const Button = props => {
  const { children, className, type, large } = props;
  const otherProps = omit(['children', 'className', 'type', 'large'], props);

  const classes = concat(
    ['btn-d', `${type}-btn`],
    large ? ['lrg-btn'] : [],
    className ? [className] : []
  );

  return (
    <button
      type="button"
      {...otherProps}
      className={classes.join(' ')}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'success', 'info', 'default', 'warning', 'danger']).isRequired,
  large: PropTypes.bool,
};
