import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import classNames from 'classnames';
import iconInfoSvg from '../../src/images/ui-kit/icon-info.svg';
import './CJLogo.css';

const IconSuccess = ({ className }) => (
  <ReactSVG path={iconInfoSvg} className={classNames('vs-icon', className)} />
);

IconSuccess.propTypes = {
  className: PropTypes.string,
};

export default IconSuccess;
