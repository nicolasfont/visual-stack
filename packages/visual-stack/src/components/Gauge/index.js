import React from 'react';
import { TrendDown, TrendUp } from '../Icons';
import './style.css';

export const GaugeContainer = ({ children }) => (
  <div className="vs-gauge-container">{children}</div>
);

export const Gauge = ({ children }) => (
  <div className="vs-gauge">{children}</div>
);

export const GaugeTitle = ({ children }) => (
  <div className="vs-gauge-title">{children}</div>
);

export const GaugeValue = ({ children }) => (
  <div className="vs-gauge-value">{children}</div>
);

export const GaugeTrendContainer = ({ children }) => (
  <div className="vs-gauge-trend-container">{children}</div>
);

export const GaugeTrend = ({ children }) => (
  <div className="vs-gauge-trend">{children}</div>
);

export const GaugeTrendValue = ({ children }) => (
  <div className="vs-gauge-trend-value">{children}</div>
);

export const GaugeNegativeTrendValue = ({ children }) => (
  <div className="vs-gauge-trend-value vs-gauge-trend-negative">
    <TrendDown />
    {children}
  </div>
);

export const GaugePositiveTrenValue = ({ children }) => (
  <div className="vs-gauge-trend-value vs-gauge-trend-positive">
    <TrendUp />
    {children}
  </div>
);

export const GaugeTrendLabel = ({ children }) => (
  <div className="vs-gauge-trend-label">{children}</div>
);

export const GaugeValueUnit = ({ children }) => (
  <span className="vs-gauge-value-unit">{children}</span>
);
