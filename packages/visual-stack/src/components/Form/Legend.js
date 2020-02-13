import React from 'react';
import './Form.css';

export default ({ children, ...otherProps }) => (
  <legend {...otherProps}>{children}</legend>
);
