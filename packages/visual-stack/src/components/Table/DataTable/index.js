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
import * as R from 'ramda';
import { getNextData, getNextOrder, getSortingIcon } from './sortingHelper';
import PropTypes from 'prop-types';
import './DataTable.css';

const generateHeader = ({ sortable, sortingOption, onSort, data }) => (
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

const generateRow = ({ onClick, columns }) => (rowItems, index) => (
  <Tr key={index}>
    {rowItems.map((item, columnIndex) => {
      const getColumn = R.compose(
        R.defaultTo({}),
        R.prop(columnIndex)
      );
      const { label, clickable, renderCell = R.identity } = getColumn(columns);
      return (
        <Td key={columnIndex}>
          {clickable && (
            <a
              className="vs-data-table-clickable-cell"
              onClick={() => {
                onClick({
                  value: item,
                  label,
                });
              }}
            >
              {renderCell(item)}
            </a>
          )}
          {!clickable && renderCell(item)}
        </Td>
      );
    })}
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
  onClick,
  onSort,
  renderToolbar,
}) => {
  const normalizedData = pagination
    ? getDataWithPagination(rowsPerPage, page)(data)
    : data;

  return (
    <TableContainer className="vs-data-table-container">
      <TableTitle>
        <div className="vs-data-table-top-level-header">
          <div>
            {caption}
            <p>{description}</p>
          </div>
          <div>{renderToolbar && renderToolbar({ columns, data })}</div>
        </div>
      </TableTitle>
      <Table>
        <THead>
          <Tr>
            {columns.map(
              generateHeader({ sortable, sortingOption, onSort, data })
            )}
          </Tr>
        </THead>
        <TBody>{normalizedData.map(generateRow({ onClick, columns }))}</TBody>
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
  sortingOption: PropTypes.shape({
    label: PropTypes.string,
    order: PropTypes.string,
  }),
  sortable: PropTypes.bool,
  onSort: PropTypes.func,
  onClick: PropTypes.func,
  renderToolbar: PropTypes.func,
};