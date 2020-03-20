import React from 'react';
import ReactCreatableSelect from 'react-select/creatable';
import cn from 'classnames';
import './CreatableSelect.css';

const CreatableSelect = ({ className, ...restProps }) => (
  <ReactCreatableSelect
    {...restProps}
    className={cn('vs-default-react-select-creatable', className)}
    classNamePrefix={'vs-react-select-creatable'}
  />
);
export default CreatableSelect;
