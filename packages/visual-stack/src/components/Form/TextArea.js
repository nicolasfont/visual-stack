import React from 'react';
import './Form.css';

export default ({ className, ...restProps }) => (
  <textarea className={`form-control ${className || ''}`} {...restProps} />
);
