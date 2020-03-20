import React from 'react';
import './PageContent.css';

const PageContent = ({ children, ...restProps }) => (
  <div {...restProps} className="vs-page-content">
    {children}
  </div>
);

export default PageContent;
