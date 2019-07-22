import React from 'react';
import './DataTable.css';
import {
  TableContainer,
  TableTitle,
  THead,
  Tr,
  TBody,
  Table,
  Td,
  Th,
} from '../';
import Pagination from '../../Pagination';
import MenuDownIcon from 'mdi-react/ArrowDownIcon';
import MenuUpIcon from 'mdi-react/ArrowUpIcon';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import { Button } from '../../Button';
import DownloadIcon from 'mdi-react/DownloadIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

import './DataTable.css';

export const ASCENDING = 'ascending';
export const DESCENDING = 'descending';

const getSortingIcon = (sortingOption, currentLabel) => {
  let icon = null;
  if (sortingOption.order === ASCENDING) {
    icon = <MenuUpIcon />;
  }
  if (sortingOption.order === DESCENDING) {
    icon = <MenuDownIcon />;
  }
  if (sortingOption.label !== currentLabel) {
    icon = null;
  }
  return icon;
};

const getNextOrder = order => {
  if (!order || order === DESCENDING) return ASCENDING;
  if (order === ASCENDING) return DESCENDING;
};

const sort = order => index => R.sortWith([order(R.prop(index))]);
const sortAscendingByIndex = sort(R.ascend);
const sortDescendingByIndex = sort(R.descend);

const getNextData = (index, currentOrder, data) => {
  if (!currentOrder || currentOrder === DESCENDING)
    return sortAscendingByIndex(index)(data);
  if (currentOrder === ASCENDING) return sortDescendingByIndex(index)(data);
};

const generateHeader = (sortable, sortingOption, onSort, data) => (
  { label: currentLabel, width },
  index
) => {
  const isCurrentColumnSorted = () => {
    return sortingOption.label === currentLabel;
  };

  const headerClickHandler = () => {
    const { order } = sortingOption;
    const currentOrder = isCurrentColumnSorted() ? order : null;
    const nextOrder = getNextOrder(currentOrder);
    const nextData = getNextData(index, currentOrder, data);
    onSort({
      sortingOption: {
        label: currentLabel,
        order: nextOrder,
      },
      data: nextData,
    });
  };

  return (
    <Th
      id="label"
      style={width && { width }}
      className={`
        ${sortable && 'vs-data-table-header-sortable'}
        ${sortable && isCurrentColumnSorted() && 'vs-data-table-header-sorted'}
      `}
      key={index}
      onClick={sortable ? headerClickHandler : undefined}
    >
      <div>
	      {currentLabel} 
	      <span>{sortable && getSortingIcon(sortingOption, currentLabel)}</span>
      </div>
    </Th>
  );
};

const generateRow = (rowItems, index) => (
  <Tr key={index}>
    {rowItems.map((item, index) => (
      <Td key={index}>{item}</Td>
    ))}
  </Tr>
);

const getDataWithPagination = (rowsPerPage, page) =>
  R.compose(
    R.take(rowsPerPage),
    R.drop(rowsPerPage * (page - 1))
  );

export const DataTable = ({
  caption = '',
  description = '',
  columns = [],
  data = [],
  rowsPerPage = 25,
  page = 1,
  onPageChange,
  pagination = false,
  sortingOption = {},
  sortable = false,
  onSort,
}) => {
  const normalizedData = pagination
    ? getDataWithPagination(rowsPerPage, page)(data)
    : data;

  return (
    <TableContainer className="vs-data-table-container">
      <TableTitle>
      	<div>
	      	{caption}
					<p>{description}</p>
				</div>
				<div>
					<Button type="icon">
						<DownloadIcon />
					</Button>
					<Button type="inline-outline-secondary">
					  Dimension
					  <ChevronDownIcon className="vs-inline-button-chevron"/>
					</Button>
				</div>
    	</TableTitle>
      <Table>
        <THead>
          <Tr>
            {columns.map(generateHeader(sortable, sortingOption, onSort, data))}
          </Tr>
        </THead>
        <TBody>{normalizedData.map(generateRow)}</TBody>
      </Table>
      {pagination && (
        <Pagination
          className="vs-table-pagination"
          numberOfRows={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChange={onPageChange}
        />
      )}
    </TableContainer>
  );
};

DataTable.propTypes = {
  caption: PropTypes.string,
  description: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  pagination: PropTypes.bool,
  sortingOption: PropTypes.object,
  sortable: PropTypes.bool,
  onSort: PropTypes.func,
};
