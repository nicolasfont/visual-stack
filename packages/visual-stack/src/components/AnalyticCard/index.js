import React from 'react';
import { TrendDown, TrendUp } from '../Icons';
import './style.css';
import { isNil } from 'ramda';
import classNames from 'classnames';
import { Button } from '../Button';

export const AnalyticCardContainer = ({
  children,
  className,
  ...restProps
}) => (
  <div className={`vs-analytic-card-container ${className}`} {...restProps}>
    {children}
  </div>
);

export const AnalyticCard = ({
  children,
  className,
  onClick,
  ...restProps
}) => {
  const isClickable = !isNil(onClick);
  return (
    <div
      className={classNames({
        'vs-analytic-card': true,
        [className]: true,
        'vs-analytic-card-clickable': isClickable,
      })}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </div>
  );
};

export const AnalyticCardTitle = ({ children, className, ...restProps }) => (
  <div {...restProps} className={`vs-analytic-card-title ${className}`}>
    {children}
  </div>
);

export const AnalyticCardValue = ({ children, className, ...restProps }) => (
  <div {...restProps} className={`vs-analytic-card-value ${className}`}>
    {children}
  </div>
);

export const AnalyticCardTrendContainer = ({
  children,
  className,
  ...restProps
}) => (
  <div
    {...restProps}
    className={`vs-analytic-card-trend-container ${className}`}
  >
    {children}
  </div>
);

export const AnalyticCardTrend = ({ children, className, ...restProps }) => (
  <div {...restProps} className={`vs-analytic-card-trend ${className}`}>
    {children}
  </div>
);

export const AnalyticCardTrendValue = ({
  children,
  className,
  ...restProps
}) => (
  <div {...restProps} className={`vs-analytic-card-trend-value ${className}`}>
    {children}
  </div>
);

export const AnalyticCardNegativeTrendValue = ({
  children,
  className,
  ...restProps
}) => (
  <div
    {...restProps}
    className={`vs-analytic-card-trend-value vs-analytic-card-trend-negative ${className}`}
  >
    <TrendDown />
    {children}
  </div>
);

export const AnalyticCardPositiveTrendValue = ({
  children,
  className,
  ...restProps
}) => (
  <div
    {...restProps}
    className={`vs-analytic-card-trend-value vs-analytic-card-trend-positive ${className}`}
  >
    <TrendUp />
    {children}
  </div>
);

export const AnalyticCardTrendLabel = ({
  children,
  className,
  ...restProps
}) => (
  <div {...restProps} className={`vs-analytic-card-trend-label ${className}`}>
    {children}
  </div>
);

export const AnalyticCardValueUnit = ({
  children,
  className,
  ...restProps
}) => (
  <span {...restProps} className={`vs-analytic-card-value-unit ${className}`}>
    {children}
  </span>
);

export const ViewDetailButton = ({
  label = 'View Details',
  onClick,
  ...restProps
}) => (
  <Button
    {...restProps}
    type="outline-secondary"
    className="vs-analytic-card-view-detail-button"
    onClick={onClick}
  >
    {label}
  </Button>
);
