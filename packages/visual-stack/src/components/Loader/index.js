import React from 'react';
import './styles.css';

export const Loader = ({ props }) => (
  <div {...props} className="loading-container">
    <div className="loading-bars">
      <div />
      <div />
      <div />
    </div>
    <div className="loading-text">Loading Data...</div>
  </div>
);
