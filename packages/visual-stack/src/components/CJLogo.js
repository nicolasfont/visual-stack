import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import classNames from 'classnames';
import logoSvg from '../../src/images/ui-kit/new-cj-logo-icon.svg';
import './CJLogo.css';

const CJLogo = ({ className }) => (
  <SVG
    src={logoSvg}
    className={classNames('vs-cj-logo', 'vs-cj-logo-svg', className)}
  />
);

CJLogo.propTypes = {
  className: PropTypes.string,
};

export default CJLogo;
