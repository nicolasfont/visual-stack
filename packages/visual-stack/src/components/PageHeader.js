import React from 'react';
import './PageHeader.css';

export const PageTitle = ({ children, ...restProps }) => (
  <div {...restProps} className="vs-page-heading--title">
    {children}
  </div>
);

export const PageHeaderSection = ({ children, ...restProps }) => (
  <div {...restProps} className="vs-page-heading--section">
    {children}
  </div>
);

export const PageDescription = ({ children, ...restProps }) => (
  <span {...restProps} className="vs-page-heading--description">
    {children}
  </span>
);

export const PageHeader = ({ children, ...restProps }) => (
  <div {...restProps} className="vs-page-heading">
    {children}
  </div>
);
