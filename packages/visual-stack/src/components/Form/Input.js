import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

const Input = ({ className, type, ...restProps }) => (
  <input
    {...restProps}
    type={type || 'text'}
    className={`form-control ${className || ''}`}
  />
);
Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
