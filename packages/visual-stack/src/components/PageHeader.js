import React from 'react';
import './PageHeader.css';

export const PageTitle = ({ children }) =>
  <div className="page-heading--title">
    {children}
  </div>;

export const PageHeaderSection = ({ children }) =>
  <div className="page-heading--section">
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
