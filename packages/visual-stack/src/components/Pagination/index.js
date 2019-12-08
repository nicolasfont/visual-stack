import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import { Button } from '../Button';
import LeftIcon from 'mdi-react/ChevronLeftIcon';
import RightIcon from 'mdi-react/ChevronRightIcon';
import { groupBy, head, prop, pipe } from 'ramda';
import { withErrorBoundary } from '../ErrorBoundary';
import './style.css';

const validRowsPerPageValues = [10, 25, 50];

const getRowsPerPageOptions = rowsPerPageTemplate => {
  return validRowsPerPageValues.map(value => {
    return {
      value: value,
      label: rowsPerPageTemplate.replace('{0}', value),
    };
  });
};

const getRowsPerPageOption = (pageValue, rowsPerPageTemplate) =>
  pipe(
    groupBy(prop('value')),
    prop(pageValue),
    head
  )(getRowsPerPageOptions(rowsPerPageTemplate));

const Pagination = ({
  numberOfRows,
  rowsPerPage,
  page,
  onChange,
  className,
  rowsPerPageTemplate = '{0} per page',
  totalRecordsTemplate = '{0} total records',
}) => {
  const maxPage = Math.ceil(numberOfRows / rowsPerPage) || 1;

  const handleRowsPerPage = ({ value: nextRowsPerPage }) => {
    const paginationValue = {
      page: 1,
      rowsPerPage: nextRowsPerPage,
    };
    onChange(paginationValue);
  };

  const handlePreviousPage = () => {
    const nextPage = page - 1;
    if (nextPage > 0) {
      onChange({ page: nextPage, rowsPerPage });
    }
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage <= maxPage) {
      onChange({ page: nextPage, rowsPerPage });
    }
  };

  const getTranslatedNumberOfRecords = () => {
    return totalRecordsTemplate.replace('{0}', numberOfRows);
  };

  return (
    <div className={`vs-pagination ${className}`}>
      <div className="vs-rows-per-page-container">
        <Select
          name="rows-per-page"
          value={getRowsPerPageOption(rowsPerPage, rowsPerPageTemplate)}
          options={getRowsPerPageOptions(rowsPerPageTemplate)}
          onChange={handleRowsPerPage}
        />
      </div>
      <div className="vs-page-control">
        <Button
          type="icon"
          className="vs-previous-page"
          onClick={handlePreviousPage}
        >
          <LeftIcon />
        </Button>
        <div className="vs-pagination-paging">
          {page}/{maxPage}
        </div>
        <Button type="icon" className="vs-next-page" onClick={handleNextPage}>
          <RightIcon />
        </Button>
      </div>
      <div className="vs-pagination-total-records">
        {getTranslatedNumberOfRecords()}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  numberOfRows: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withErrorBoundary(Pagination);
