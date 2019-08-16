import WindowCloseIcon from 'mdi-react/WindowCloseIcon';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from '../Form';
import './styles.css';
import classNames from 'classnames';

export const ExpandingInputButton = ({
  icon,
  expanded,
  onFocus,
  onBlur,
  onClear,
  onChange,
  value,
  ...otherProps
}) => {
  const containerClassName = classNames(
    'vs-expanding-input-button',
    expanded && 'vs-expanding-input-button-focused'
  );

  return (
    <div className={containerClassName} onFocus={onFocus} onBlur={onBlur}>
      <span className="vs-expanding-input-button-icon">{icon}</span>
      <Input type="text" onChange={onChange} value={value} {...otherProps} />
      {expanded && (
        <WindowCloseIcon className="vs-window-close-icon" onClick={onClear} />
      )}
    </div>
  );
};

ExpandingInputButton.propTypes = {
  focused: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onFocus: PropTypes.func,
};
