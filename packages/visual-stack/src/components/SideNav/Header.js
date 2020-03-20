/** @prettier */
import React from 'react';
import PropTypes from 'prop-types';

export const Header = ({ children, ...restProps }) => (
  <li className="vs-sidenav-entry vs-sidenav-header" {...restProps}>
    {children}
  </li>
);
Header.propTypes = {
  children: PropTypes.node.isRequired,
};
