import React from 'react';
import './Form.css';

export default ({ className, ...restProps }) => (
  <textarea {...restProps} className={`form-control ${className || ''}`} />
);
