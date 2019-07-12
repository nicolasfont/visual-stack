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
import MenuDownIcon from 'mdi-react/MenuDownIcon';
import MenuUpIcon from 'mdi-react/MenuUpIcon';
import * as R from 'ramda';
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

const generateHeader = (sortingOption, onSort, data) => (
  { label: currentLabel, width },
  index
) => (
  <Th
    id="label"
    style={width && { width }}
    className="vs-data-table-header"
    key={index}
    onClick={() => {
      const { label, order } = sortingOption;
      const isCurrentColumnSorted = label === currentLabel;
      const currentOrder = isCurrentColumnSorted ? order : null;
      const nextOrder = getNextOrder(currentOrder);
      const nextData = getNextData(index, currentOrder, data);
      onSort({
        sortingOption: {
          label: currentLabel,
          order: nextOrder,
        },
        data: nextData,
      });
    }}
  >
    {currentLabel} {getSortingIcon(sortingOption, currentLabel)}
  </Th>
);

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
  columns = [],
  data = [],
  rowsPerPage = 25,
  page = 1,
  onPageChange,
  pagination = false,
  sortingOption = {},
  onSort,
}) => {
  const normalizedData = pagination
    ? getDataWithPagination(rowsPerPage, page)(data)
    : data;

  return (
    <TableContainer>
      <TableTitle>{caption}</TableTitle>
      <Table>
        <THead>
          <Tr>{columns.map(generateHeader(sortingOption, onSort, data))}</Tr>
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
