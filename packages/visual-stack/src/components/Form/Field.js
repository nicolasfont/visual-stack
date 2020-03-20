import React from 'react';
import Label from './Label';
import './Form.css';

export default ({
  htmlFor,
  className,
  label,
  error,
  help,
  optional,
  optionalLabel,
  children,
  ...restProps
}) => (
  <div className={`vs-field ${className ? className : ''}`}>
    <Label
      htmlFor={htmlFor}
      className="vs-field-label"
      weight="bold"
      {...restProps}
    >
      {label}{' '}
      <span className="vs-field-optional">
        {optional ? `- ${optionalLabel}` : null}
      </span>
    </Label>
    {children}
    {error ? (
      <div className="vs-validation-error">{error}</div>
    ) : (
      <div className="vs-field-help">{help}</div>
    )}
  </div>
);
