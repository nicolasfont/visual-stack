import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

const Label = ({
  children,
  className,
  required,
  vertical,
  fontWeight,
  ...otherProps
}) => (
  <label
    className={`form-label control-label form-label-${
      vertical ? 'vertical' : 'horizontal'
    } ${fontWeight ? `vs-label-font-${fontWeight}` : ''} ${className || ''}`}
    {...otherProps}
  >
    {children}
    {required && <span className="form-group-required-sign">*</span>}
  </label>
);
Label.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
};

export default Label;
