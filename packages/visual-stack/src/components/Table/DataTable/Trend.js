import React from 'react';
import './DataTable.css';
import ArrowDownBoldIcon from 'mdi-react/ArrowDownBoldIcon';
import ArrowUpBoldIcon from 'mdi-react/ArrowUpBoldIcon';
import ArrowRightBoldIcon from 'mdi-react/ArrowRightBoldIcon';

export const renderTrendingUp = value => (
  <>
    <ArrowUpBoldIcon color="#0ec38f" className="vs-table-trend-icon" />
    {value}
  </>
);

export const renderTrendingDown = value => (
  <>
    <ArrowDownBoldIcon color="#f65161" className="vs-table-trend-icon" />
    {value}
  </>
);

export const renderNoTrending = value => (
  <>
    <ArrowRightBoldIcon className="vs-table-trend-icon" />
    {value}
  </>
);
