import React from 'react';
import R from 'ramda';
import './style.css';

const ApplicationLayout = ({ sideNav, sideNavState, children }) => (
  <div className="vs-application-layout">
    <div className="vs-application-layout-container">
      <div
        className={
          sideNavState || R.isNil(sideNavState)
            ? 'vs-application-layout-side'
            : 'vs-application-layout-side-collapsed'
        }
      >
        {sideNav}
      </div>
      <div className="vs-application-layout-content">{children}</div>
      <div className="vs-application-layout-filter" />
    </div>
  </div>
);

export default ApplicationLayout;
