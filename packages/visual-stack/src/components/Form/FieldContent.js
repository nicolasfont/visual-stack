import React from 'react';
import './Form.css';

export default ({ className, children, ...restProps }) => (
  <div
    {...restProps}
    className={`vs-field-content ${className ? className : ''}`}
  >
    {children}
  </div>
);
