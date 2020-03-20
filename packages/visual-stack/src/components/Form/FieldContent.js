import React from 'react';
import './Form.css';

export default ({ className, children, ...restProps }) => (
  <div
    className={`vs-field-content ${className ? className : ''}`}
    {...restProps}
  >
    {children}
  </div>
);
