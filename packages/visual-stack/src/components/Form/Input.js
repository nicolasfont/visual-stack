import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

const Input = ({ className, type, ...otherProps }) => (
  <input
    type={type || 'text'}
    className={`form-control ${className || ''}`}
    {...otherProps}
  />
);
Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
