import React from 'react';
import ReactCreatableSelect from 'react-select/creatable';
import cn from 'classnames';
import './CreatableSelect.css';

const CreatableSelect = ({ className, ...restProps }) => (
  <ReactCreatableSelect
    className={cn('vs-default-react-select-creatable', className)}
    classNamePrefix={'vs-react-select-creatable'}
    {...restProps}
  />
);
export default CreatableSelect;
