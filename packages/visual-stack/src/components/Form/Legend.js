import React from 'react';
import './Form.css';

export default ({ children, ...restProps }) => (
  <legend {...restProps}>{children}</legend>
);
