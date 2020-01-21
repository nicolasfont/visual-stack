import React from 'react';
import PropTypes from 'prop-types';
import { concat, reduce, unapply } from 'ramda';
import './Button.css';

const concatAll = unapply(reduce(concat, []));

const mkButton = buttonType => ({
  children,
  className,
  type,
  small,
  large,
  ...otherProps
}) => {
  const classes = concatAll(
    ['vs-btn-d', `vs-${type}-btn`],
    small ? ['vs-sm-btn'] : [],
    large ? ['vs-lg-btn'] : [],
    className ? [className] : []
  );

  return (
    <button type={buttonType} {...otherProps} className={classes.join(' ')}>
      {children}
    </button>
  );
};

export const Button = mkButton('button');
export const SubmitButton = mkButton('submit');

Button.propTypes = SubmitButton.propTypes = {
  type: PropTypes.oneOf([
    'primary',
    'success',
    'info',
    'default',
    'warning',
    'danger',
    'solid-primary',
    'solid-primary-raised',
    'solid-secondary',
    'outline-primary',
    'outline-secondary',
    'outline-secondary-raised',
    'rounded-solid',
    'rounded-outline',
    'icon',
    'text',
    'text-link',
    'inline-outline-secondary',
    'solid-primary-pill',
    'solid-secondary-pill',
  ]).isRequired,
  small: PropTypes.bool,
  large: PropTypes.bool,
};
