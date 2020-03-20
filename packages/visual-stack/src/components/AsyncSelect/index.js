import React from 'react';
import ReactAsyncSelect from 'react-select/async';
import cn from 'classnames';
import './AsyncSelect.css';

const AsyncSelect = ({ className, ...restProps }) => (
  <ReactAsyncSelect
    {...restProps}
    className={cn('vs-default-react-select-async', className)}
    classNamePrefix={'vs-react-select-async'}
  />
);
export default AsyncSelect;
