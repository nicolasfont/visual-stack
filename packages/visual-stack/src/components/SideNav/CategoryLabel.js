import React from 'react';
import './SideNav.css';

export const CategoryLabel = ({ children, collapsed }) => {
  return !collapsed && <div className="vs-category-label">{children}</div>;
};
