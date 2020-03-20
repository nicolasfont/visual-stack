import React from 'react';
import PropTypes from 'prop-types';
import './Panel.css';
import { deprecated } from 'prop-types-extra';

export const Panel = ({ children, ...restProps }) => (
  <div className="cj-panel panel vs-panel-default" {...restProps}>
    {children}
  </div>
);

export const Footer = ({ children, ...restProps }) => (
  <div className="cj-panel panel-footer" {...restProps}>
    {children}
  </div>
);

const paddingMapping = {
  none: 'none',
  large: 'wide',
};

export const Body = ({ children, paddingSize, padding, ...restProps }) => {
  const paddingSizeClass = paddingSize
    ? `cj-panel-body-padding-${paddingSize}`
    : '';
  const paddingClass = padding
    ? `cj-panel-body-padding-${paddingMapping[padding]}`
    : '';
  return (
    <div
      className={`cj-panel panel-body ${paddingSizeClass} ${paddingClass}`}
      {...restProps}
    >
      {children}
    </div>
  );
};

export const Header = ({ title, children, ...restProps }) => (
  <div className="cj-panel panel-heading" {...restProps}>
    {title && <legend>{title}</legend>}
    {children}
  </div>
);
Header.propTypes = {
  title: PropTypes.string,
};

Body.propTypes = {
  paddingSize: deprecated(
    PropTypes.oneOf(['none', 'wide']),
    'Use `padding` instead.'
  ),
  padding: PropTypes.oneOf(['none', 'large']),
};
