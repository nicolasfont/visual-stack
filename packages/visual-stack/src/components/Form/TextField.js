import React from 'react';
import Field from './Field';
import FieldContent from './FieldContent';
import Input from './Input';
import './Form.css';

export default ({
  id,
  className,
  name,
  value,
  label,
  error,
  help,
  optional,
  optionalLabel,
  ...restProps
}) => (
  <Field
    {...restProps}
    htmlFor={id}
    classes={`vs-text-field ${className ? className : ''}`}
    label={label}
    error={error}
    help={help}
    optional={optional}
    optionalLabel={optionalLabel}
  >
    <FieldContent>
      <Input
        {...restProps}
        id={id}
        className={error ? 'input-error' : ''}
        name={name}
        value={value}
      />
    </FieldContent>
  </Field>
);
