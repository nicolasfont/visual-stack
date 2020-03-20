/** @prettier */
import React from 'react';
import { SideNavSvgIcon } from './Icons';

export const LinkContentWrapper = ({ icon, label, ...restProps }) => {
  const finalIcon = icon ? icon : <div className="placeholder-icon" />;

  return (
    <div {...restProps} className="vs-sidenav-link-content-wrapper">
      <SideNavSvgIcon>{finalIcon}</SideNavSvgIcon>
      <div className="vs-sidenav-link-label vs-sidenav-container-label">
        {label}
      </div>
    </div>
  );
};

export const Link = ({ hoverText, children, ...restProps }) => {
  return (
    <li
      {...restProps}
      className="vs-sidenav-entry vs-sidenav-link"
      title={hoverText}
    >
      {children}
    </li>
  );
};
