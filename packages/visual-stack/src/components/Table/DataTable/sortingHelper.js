import React from 'react';
import * as R from 'ramda';
export const ASCENDING = 'ascending';
export const DESCENDING = 'descending';

const sort = order => index => R.sortWith([order(R.prop(index))]);
const sortAscendingByIndex = sort(R.ascend);
const sortDescendingByIndex = sort(R.descend);
import ArrowDownIcon from 'mdi-react/ArrowDownIcon';
import ArrowUpIcon from 'mdi-react/ArrowUpIcon';

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

export const getNextData = (index, currentOrder, data) => {
  if (!currentOrder || currentOrder === ASCENDING)
    return sortDescendingByIndex(index)(data);
  if (currentOrder === DESCENDING) return sortAscendingByIndex(index)(data);
};

export const getNextOrder = order => {
  if (!order || order === ASCENDING) return DESCENDING;
  if (order === DESCENDING) return ASCENDING;
};
