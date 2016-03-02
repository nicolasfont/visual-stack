import './MenuBar.css';

import React from 'react';
import { Link } from 'react-router';

export const MenuBarItem = ({ children, to }) =>
  <li>
    <Link to={to}>
      <span className="navbar-menu--title">{children}</span>
    </Link>
  </li>;

export const MenuBar = ({ children, titleHref }) =>
  <nav className="navbar navbar-default navbar-container">
    <div className="container-fluid">
      <div className="row">
        <div className="navbar-header navbar-header--logo">
          <Link to={titleHref || '#'} className="navbar-brand" />
          <span className="navbar-divider" />

          <ul className="nav navbar-nav">
            {children}
          </ul>

          <ul className="nav navbar-nav navbar-right">
          </ul>
        </div>
      </div>
    </div>
  </nav>;
