import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import './Form.css';

export const Input = ({ className, type, ...otherProps }) => (
  <input
    type={type || 'text'}
    className={`form-control ${className || ''}`}
    {...otherProps}
  />
);
Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export const TextArea = ({ className, ...otherProps }) => (
  <textarea className={`form-control ${className || ''}`} {...otherProps} />
);

export const Label = ({
  children,
  className,
  required,
  vertical,
  fontWeight,
  ...otherProps
}) => (
  <label
    className={`form-label control-label form-label-${
      vertical ? 'vertical' : 'horizontal'
    } ${fontWeight ? `vs-label-font-${fontWeight}` : ''} ${className || ''}`}
    {...otherProps}
  >
    {children}
    {required && <span className="form-group-required-sign">*</span>}
  </label>
);
Label.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
};

export const Legend = ({ children, ...otherProps }) => (
  <legend {...otherProps}>{children}</legend>
);

export const Form = ({ children, vertical, ...otherProps }) => (
  <form
    className={vertical ? 'form-vertical' : 'form-horizontal'}
    {...otherProps}
  >
    {children}
  </form>
);

export const FormGroup = ({
  children,
  error,
  label,
  required,
  vertical,
  classes,
}) => (
  <div
    className={`form-group ${classes ? classes : ''} ${
      error ? 'has-error' : ''
    }`}
  >
    {label ? (
      <Label
        vertical={vertical}
        className={!vertical ? 'col-sm-3' : ''}
        required={required}
      >
        {label}
      </Label>
    ) : (
      <div className={!vertical ? 'col-sm-3' : ''} />
    )}
    <div className={!vertical ? 'col-sm-5' : ''}>{children}</div>
    <div className={`error-container ${!vertical ? 'col-xs-4' : ''}`}>
      {error && <div className="form-group-error-span">{error}</div>}
    </div>
  </div>
);
FormGroup.propTypes = {
  error: PropTypes.node,
  label: PropTypes.node,
  required: PropTypes.bool,
};

// Component that renders a label and error/help message
export const Field = ({
  htmlFor,
  className,
  label,
  error,
  help,
  optional,
  optionalLabel,
  children,
  ...otherProps
}) => (
  <div className={`vs-field ${className ? className : ''}`}>
    <Label
      htmlFor={htmlFor}
      className="vs-field-label"
      weight="bold"
      {...otherProps}
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

export const FieldContent = ({ className, children }) => (
  <div className={`vs-field-content ${className ? className : ''}`}>
    {children}
  </div>
);

// Input with label and error/help message
export const TextField = ({
  id,
  className,
  name,
  value,
  label,
  error,
  help,
  optional,
  optionalLabel,
  ...otherProps
}) => (
  <Field
    htmlFor={id}
    classes={`vs-text-field ${className ? className : ''}`}
    label={label}
    error={error}
    help={help}
    optional={optional}
    optionalLabel={optionalLabel}
    {...otherProps}
  >
    <FieldContent>
      <Input
        id={id}
        className={error ? 'input-error' : ''}
        name={name}
        value={value}
        {...otherProps}
      />
    </FieldContent>
  </Field>
);

// Just radio button and label
export const ChoiceInput = ({
  id,
  className,
  type = 'radio',
  name,
  value,
  label,
  checked,
  style,
  ...otherProps
}) => (
  <div
    className={`vs-choice-input ${className ? className : ''}`}
    style={style}
  >
    <Label htmlFor={id} fontWeight="normal" {...otherProps}>
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        checked={checked}
        {...otherProps}
      />
      {label}
    </Label>
  </div>
);

export const SelectField = ({
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
