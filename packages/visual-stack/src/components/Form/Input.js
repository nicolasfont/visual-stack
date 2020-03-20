import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

const Input = ({ className, type, ...restProps }) => (
  <input
    type={type || 'text'}
    className={`form-control ${className || ''}`}
    {...restProps}
  />
);
Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
