import React from 'react';
import './SideNav.css';

export const CategoryLabel = ({ children, collapsed, ...restProps }) => {
  return (
    !collapsed && (
      <div {...restProps} className="vs-category-label">
        {children}
      </div>
    )
  );
};
