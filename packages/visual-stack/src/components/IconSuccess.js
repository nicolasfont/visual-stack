import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import classNames from 'classnames';
import iconSuccessSvg from '../../src/images/ui-kit/icon-success.svg';
import './CJLogo.css';

const IconSuccess = ({ className }) => (
  <SVG src={iconSuccessSvg} className={classNames('vs-icon', className)} />
);

IconSuccess.propTypes = {
  className: PropTypes.string,
};

export default IconSuccess;
