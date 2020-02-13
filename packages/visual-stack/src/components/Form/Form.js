import React from 'react';
import './Form.css';

export default ({ children, vertical, ...otherProps }) => (
  <form
    className={vertical ? 'form-vertical' : 'form-horizontal'}
    {...otherProps}
  >
    {children}
  </form>
);
