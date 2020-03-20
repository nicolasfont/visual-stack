import React from 'react';
import './PageHeader.css';

export const PageTitle = ({ children, ...restProps }) => (
  <div className="vs-page-heading--title" {...restProps}>
    {children}
  </div>
);

export const PageHeaderSection = ({ children, ...restProps }) => (
  <div className="vs-page-heading--section" {...restProps}>
    {children}
  </div>
);

export const PageDescription = ({ children, ...restProps }) => (
  <span className="vs-page-heading--description" {...restProps}>
    {children}
  </span>
);

export const PageHeader = ({ children, ...restProps }) => (
  <div className="vs-page-heading" {...restProps}>
    {children}
  </div>
);
