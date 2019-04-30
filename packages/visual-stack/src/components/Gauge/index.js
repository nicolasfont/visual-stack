import React from 'react';
import './style.css';

export const GaugeContainer = ({ children }) => (
  <div className="vs-gauge-container">{children}</div>
);

export const Gauge = ({ children }) => (
  <div className="vs-gauge">{children}</div>
);
