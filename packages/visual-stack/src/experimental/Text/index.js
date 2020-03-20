import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './Text.css';

const Text = ({ children, className, italic, type, ...restProps }) => {
  return (
    <span
      {...restProps}
      className={classNames(
        'vs-text',
        `vs-text-type-${type}`,
        italic && 'vs-text-italic',
        className
      )}
    >
      {children}
    </span>
  );
};

Text.defaultProps = {
  type: 'default',
};

Text.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  italic: PropTypes.bool,
  type: PropTypes.oneOf([
    'default',
    'light',
    'bold',
    'small',
    'small-light',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subheading',
    'link',
  ]),
};

export default Text;
