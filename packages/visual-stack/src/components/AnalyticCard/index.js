import React from 'react';
import { TrendDown, TrendUp } from '../Icons';
import './style.css';

export const AnalyticCardContainer = ({ children }) => (
  <div className="vs-analytic-card-container">{children}</div>
);

export const AnalyticCard = ({ children }) => (
  <div className="vs-analytic-card">{children}</div>
);

export const AnalyticCardTitle = ({ children }) => (
  <div className="vs-analytic-card-title">{children}</div>
);

export const AnalyticCardValue = ({ children }) => (
  <div className="vs-analytic-card-value">{children}</div>
);

export const AnalyticCardTrendContainer = ({ children }) => (
  <div className="vs-analytic-card-trend-container">{children}</div>
);

export const AnalyticCardTrend = ({ children }) => (
  <div className="vs-analytic-card-trend">{children}</div>
);

export const AnalyticCardTrendValue = ({ children }) => (
  <div className="vs-analytic-card-trend-value">{children}</div>
);

export const AnalyticCardNegativeTrendValue = ({ children }) => (
  <div className="vs-analytic-card-trend-value vs-analytic-card-trend-negative">
    <TrendDown />
    {children}
  </div>
);

export const AnalyticCardPositiveTrendValue = ({ children }) => (
  <div className="vs-analytic-card-trend-value vs-analytic-card-trend-positive">
    <TrendUp />
    {children}
  </div>
);

export const AnalyticCardTrendLabel = ({ children }) => (
  <div className="vs-analytic-card-trend-label">{children}</div>
);

export const AnalyticCardValueUnit = ({ children }) => (
  <span className="vs-analytic-card-value-unit">{children}</span>
);
