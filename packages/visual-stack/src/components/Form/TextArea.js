import React from 'react';
import './Form.css';

export default ({ className, ...otherProps }) => (
  <textarea className={`form-control ${className || ''}`} {...otherProps} />
);
