import './PageHeader.css';

import React from 'react';

export const PageTitle = ({ children }) =>
  <div className="page-heading--title">
    {children}
  </div>;

export const PageDescription = ({ children }) =>
  <span className="page-heading--description">
    {children}
  </span>;

export const PageHeader = ({ children }) =>
  <div className="page-heading">
    {children}
  </div>;
