import React from 'react';
import ReactAsyncSelect from 'react-select/async';
import cn from 'classnames';
import './AsyncSelect.css';

const AsyncSelect = ({ className, ...otherProps }) => (
  <ReactAsyncSelect
    className={cn('vs-default-react-select-async', className)}
    classNamePrefix={'vs-react-select-async'}
    {...otherProps}
  />
);
export default AsyncSelect;
