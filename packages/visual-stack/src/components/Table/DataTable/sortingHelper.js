import React from 'react';
import * as R from 'ramda';
import ArrowDownIcon from 'mdi-react/ArrowDownIcon';
import ArrowUpIcon from 'mdi-react/ArrowUpIcon';

export const ASCENDING = 'ascending';
export const DESCENDING = 'descending';

export const getSortingIcon = (sortingOption, currentLabel) => {
  let icon = null;
  if (sortingOption.order === ASCENDING) {
    icon = <ArrowUpIcon />;
  }
  if (sortingOption.order === DESCENDING) {
    icon = <ArrowDownIcon />;
  }
  if (sortingOption.label !== currentLabel) {
    icon = <ArrowDownIcon className="vs-unsorted-row-icon" />;
  }
  return icon;
};

const sort = order => (index, data) => R.sortWith([order(R.prop(index))])(data);
const sortAscendingByIndex = sort(R.ascend);
const sortDescendingByIndex = sort(R.descend);
const sortingFunctionMap = {
  [ASCENDING]: sortAscendingByIndex,
  [DESCENDING]: sortDescendingByIndex,
};

export const sortData = (index, order, data) =>
  sortingFunctionMap[order](index, data);

export const getNextOrder = order => {
  if (!order || order === ASCENDING) return DESCENDING;
  if (order === DESCENDING) return ASCENDING;
};

export const getNextData = (index, currentOrder, data) =>
  sortData(index, getNextOrder(currentOrder), data);
