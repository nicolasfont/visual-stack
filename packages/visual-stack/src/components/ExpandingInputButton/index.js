import MagnifyIcon from 'mdi-react/MagnifyIcon';
import WindowCloseIcon from 'mdi-react/WindowCloseIcon';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from '../Form';
import './styles.css';
import classNames from 'classnames';

export const ExpandingInputButton = ({
  expanded,
  onFocus,
  onBlur,
  onClear,
  onChange,
  value,
  ...otherProps
}) => {
  const containerClassName = classNames(
    'expanding-input-button',
    expanded && 'expanding-input-button-focused'
  );

  return (
    <div className={containerClassName} onFocus={onFocus} onBlur={onBlur}>
      <MagnifyIcon className="magnify-icon" />
      <Input type="text" onChange={onChange} value={value} {...otherProps} />
      {expanded && (
        <WindowCloseIcon className="window-close-icon" onClick={onClear} />
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
