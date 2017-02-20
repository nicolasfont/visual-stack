import React from 'react';
import './style.css';

const ApplicationLayout = ({ topNav, sideNav, children }) => {
  return (
    <div className="application-layout">
      { topNav }
      <div className="application-layout-container">
        { sideNav }
        <div className="application-layout-content">
          { children }
        </div>
      </div>
    </div>
  );
};

export default ApplicationLayout;

