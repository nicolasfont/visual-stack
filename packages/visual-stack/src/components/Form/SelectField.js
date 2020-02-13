import React from 'react';
import Select from '../Select';
import Field from './Field';
import FieldContent from './FieldContent';
import './Form.css';

export default ({
  id,
  name,
  options,
  label,
  error,
  help,
  value,
  onChange,
  onBlur,
  noOptionsMessage,
  isClearable,
  isDisabled,
  isMulti,
  isSearchable,
  autoFocus,
  placeholder,
  ...otherProps
}) => (
  <Field htmlFor={id} label={label} error={error} help={help} {...otherProps}>
    <FieldContent>
      <Select
        id={id}
        name={name}
        options={options}
        error={error}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        noOptionsMessage={noOptionsMessage}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isSearchable={isSearchable}
        placeholder={placeholder}
        {...otherProps}
      />
    </FieldContent>
  </Field>
);
