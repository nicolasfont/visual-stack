import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import classNames from 'classnames';
import iconWarningSvg from '../../src/images/ui-kit/icon-warning.svg';
import './CJLogo.css';

const IconWarning = ({ className, ...restProps }) => (
  <SVG
    {...restProps}
    src={iconWarningSvg}
    className={classNames('vs-icon', className)}
  />
);

IconWarning.propTypes = {
  className: PropTypes.string,
};

export default IconWarning;
