import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';
import './Form.css';

const FormGroup = ({ children, error, label, required, vertical, classes }) => (
  <div
    className={`form-group ${classes ? classes : ''} ${
      error ? 'has-error' : ''
    }`}
  >
    {label ? (
      <Label
        vertical={vertical}
        className={!vertical ? 'col-sm-3' : ''}
        required={required}
      >
        {label}
      </Label>
    ) : (
      <div className={!vertical ? 'col-sm-3' : ''} />
    )}
    <div className={!vertical ? 'col-sm-5' : ''}>{children}</div>
    <div className={`error-container ${!vertical ? 'col-xs-4' : ''}`}>
      {error && <div className="form-group-error-span">{error}</div>}
    </div>
  </div>
);
FormGroup.propTypes = {
  error: PropTypes.node,
  label: PropTypes.node,
  required: PropTypes.bool,
};

export default FormGroup;
