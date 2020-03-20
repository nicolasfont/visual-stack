import React from 'react';
import './Form.css';

export default ({ children, vertical, ...restProps }) => (
  <form
    {...restProps}
    className={vertical ? 'form-vertical' : 'form-horizontal'}
  >
    {children}
  </form>
);
