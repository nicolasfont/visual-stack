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
  ...restProps
}) => (
  <Field {...restProps} htmlFor={id} label={label} error={error} help={help}>
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
        {...restProps}
      />
    </FieldContent>
  </Field>
);
