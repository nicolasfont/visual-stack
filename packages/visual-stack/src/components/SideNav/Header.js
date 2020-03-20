/** @prettier */
import React from 'react';
import PropTypes from 'prop-types';

export const Header = ({ children, ...restProps }) => (
  <li {...restProps} className="vs-sidenav-entry vs-sidenav-header">
    {children}
  </li>
);
Header.propTypes = {
  children: PropTypes.node.isRequired,
};
