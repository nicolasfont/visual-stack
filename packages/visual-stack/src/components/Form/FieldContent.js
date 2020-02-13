import React from 'react';
import './Form.css';

export default ({ className, children }) => (
  <div className={`vs-field-content ${className ? className : ''}`}>
    {children}
  </div>
);
