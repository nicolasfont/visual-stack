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
  <div className={`vs-analytic-card-title ${className}`} {...restProps}>
    {children}
  </div>
);

export const AnalyticCardValue = ({ children, className, ...restProps }) => (
  <div className={`vs-analytic-card-value ${className}`} {...restProps}>
    {children}
  </div>
);

export const AnalyticCardTrendContainer = ({
  children,
  className,
  ...restProps
}) => (
  <div
    className={`vs-analytic-card-trend-container ${className}`}
    {...restProps}
  >
    {children}
  </div>
);

export const AnalyticCardTrend = ({ children, className, ...restProps }) => (
  <div className={`vs-analytic-card-trend ${className}`} {...restProps}>
    {children}
  </div>
);

export const AnalyticCardTrendValue = ({
  children,
  className,
  ...restProps
}) => (
  <div className={`vs-analytic-card-trend-value ${className}`} {...restProps}>
    {children}
  </div>
);

export const AnalyticCardNegativeTrendValue = ({
  children,
  className,
  ...restProps
}) => (
  <div
    className={`vs-analytic-card-trend-value vs-analytic-card-trend-negative ${className}`}
    {...restProps}
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
    className={`vs-analytic-card-trend-value vs-analytic-card-trend-positive ${className}`}
    {...restProps}
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
  <div className={`vs-analytic-card-trend-label ${className}`} {...restProps}>
    {children}
  </div>
);

export const AnalyticCardValueUnit = ({
  children,
  className,
  ...restProps
}) => (
  <span className={`vs-analytic-card-value-unit ${className}`} {...restProps}>
    {children}
  </span>
);

export const ViewDetailButton = ({
  label = 'View Details',
  onClick,
  ...restProps
}) => (
  <Button
    type="outline-secondary"
    className="vs-analytic-card-view-detail-button"
    onClick={onClick}
    {...restProps}
  >
    {label}
  </Button>
);
