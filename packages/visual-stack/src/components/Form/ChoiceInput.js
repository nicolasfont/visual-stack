import React from 'react';
import Input from './Input';
import Label from './Label';
import './Form.css';

export default ({
  id,
  className,
  type = 'radio',
  name,
  value,
  label,
  checked,
  style,
  ...restProps
}) => (
  <div
    className={`vs-choice-input ${className ? className : ''}`}
    style={style}
  >
    <Label htmlFor={id} fontWeight="normal" {...restProps}>
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        checked={checked}
        {...restProps}
      />
      {label}
    </Label>
  </div>
);
