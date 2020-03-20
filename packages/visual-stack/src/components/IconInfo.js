import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import classNames from 'classnames';
import iconInfoSvg from '../../src/images/ui-kit/icon-info.svg';
import './CJLogo.css';

const IconInfo = ({ className, ...restProps }) => (
  <SVG
    {...restProps}
    src={iconInfoSvg}
    className={classNames('vs-icon', className)}
  />
);

IconInfo.propTypes = {
  className: PropTypes.string,
};

export default IconInfo;
