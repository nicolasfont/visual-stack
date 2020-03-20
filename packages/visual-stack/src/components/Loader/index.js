import React from 'react';
import './styles.css';

export const Loader = ({ props }) => (
  <div className="loading-container" {...props}>
    <div className="loading-bars">
      <div />
      <div />
      <div />
    </div>
    <div className="loading-text">Loading Data...</div>
  </div>
);
