import './Form.css';

import React, { PropTypes } from 'react';

export const Input = ({ className, type, ...otherProps }) =>
  <input
    type={type || 'text'}
    className={`form-control ${className || ''}`}
    {...otherProps} />;
Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export const Label = ({ className, required, children, ...otherProps }) =>
  <label className={`form-label control-label form-label-horizontal ${className || ''}`} {...otherProps}>
    {children}
    {required && <span className="form-group-required-sign">*</span>}
  </label>;
Label.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
};

export const Legend = ({ children, ...otherProps }) =>
  <legend {...otherProps}>{children}</legend>;

export const Form = ({ children, ...otherProps }) =>
  <form className="form-horizontal" {...otherProps}>{children}</form>;

export const FormGroup = ({ children, error, label, required }) =>
  <div className={`form-group ${error ? 'has-error' : ''}`}>
    {label ? <Label className="col-sm-3" required={required}>{label}</Label>
           : <div className="col-sm-3" />}
    <div className="col-sm-5">
      {children}
    </div>
    <div className="error-container col-xs-4">
      {error && <div className="form-group-error-span">{error}</div>}
    </div>
  </div>;
FormGroup.propTypes = {
  error: PropTypes.node,
  label: PropTypes.node,
  required: PropTypes.bool,
};
