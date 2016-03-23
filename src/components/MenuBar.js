import './MenuBar.css';

import React, { PropTypes, createElement } from 'react';
import { Link } from 'react-router';

export const MenuBarItem = ({ children, to }) =>
  <li>
    <Link to={to}>
      <span className="navbar-menu--title">{children}</span>
    </Link>
  </li>;
MenuBarItem.propTypes = {
  to: PropTypes.string.isRequired,
};

export const MenuBarDropdown = ({ children, title, open }) =>
  <li className={`dropdown ${open ? 'open' : ''}`}>
    <a href="#" className="dropdown-toggle" onClick={e => { e.preventDefault(); }}>
      <span className="navbar-menu--title">{title}</span>
      <span className="caret" />
    </a>
    <ul className="dropdown-menu user-menu">
      {children}
    </ul>
  </li>;
MenuBarDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

export const MenuBarDropdownItem = ({ children, to }) =>
  <li><Link to={to}>{children}</Link></li>;
MenuBarDropdownItem.propTypes = {
  to: PropTypes.string.isRequired,
};

export const MenuBar = ({ children, leftItems, rightItems, titleHref }) =>
  <nav className="navbar navbar-default navbar-container">
    <div className="container-fluid">
      <div className="row">
        <div className="navbar-header navbar-header--logo">
          <Link to={titleHref || '#'} className="navbar-brand" />
          <span className="navbar-divider" />

          {/* silence missing `key` warnings by using spread with createElement instead of interpolating an array */}
          {createElement('ul', { className: 'nav navbar-nav' }, ...(leftItems || children || []))}
          {createElement('ul', { className: 'nav navbar-nav navbar-right' }, ...(rightItems || []))}
        </div>
      </div>
    </div>
  </nav>;
MenuBar.propTypes = {
  leftItems: PropTypes.arrayOf(PropTypes.element),
  rightItems: PropTypes.arrayOf(PropTypes.element),
  titleHref: PropTypes.string,
};
