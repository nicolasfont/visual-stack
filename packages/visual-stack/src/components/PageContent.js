import React from 'react';
import './PageContent.css';

const PageContent = ({ children, ...restProps }) => (
  <div className="vs-page-content" {...restProps}>
    {children}
  </div>
);

export default PageContent;
