import React, { Component } from 'react';
import { DataTable as VSDataTable } from '@cjdev/visual-stack/lib/components/Table/DataTable';
import { connect } from 'react-redux';
import {
  initializeDataTable,
  setDataTablePage,
  setDataTableSortingOption,
  selectDataTable,
} from '../../actions';
import * as R from 'ramda';
import PropTypes from 'prop-types';

export class DataTablePure extends Component {
  componentDidMount() {
    const initialPayload = R.pick(['id', 'data'])(this.props);
    this.props.initializeDataTable(initialPayload);
  }

  render() {
    const {
      sortable,
      columns,
      caption,
      description,
      dataTable,
      pagination,
      id,
      setDataTablePage,
      setDataTableSortingOption,
    } = this.props;
    return (
      <div>
        <VSDataTable
          caption={caption}
          description={description}
          sortable={sortable}
          pagination={pagination}
          data={dataTable.data}
          columns={columns}
          page={dataTable.pagination.page}
          rowsPerPage={dataTable.pagination.rowsPerPage}
          sortingOption={dataTable.sortingOption}
          onPageChange={pagination => {
            setDataTablePage({ id, pagination });
          }}
          onSort={({ data, sortingOption }) => {
            setDataTableSortingOption({ id, data, sortingOption });
          }}
        />
      </div>
    );
  }
}

DataTablePure.propTypes = {
  caption: PropTypes.string,
  description: PropTypes.string,
  sortable: PropTypes.bool,
  pagination: PropTypes.bool,
  data: PropTypes.array,
  columns: PropTypes.array,
  dataTable: PropTypes.shape({
    data: PropTypes.array,
    sortingOption: PropTypes.shape({
      label: PropTypes.string,
      order: PropTypes.string,
    }),
    pagination: PropTypes.shape({
      page: PropTypes.number,
      rowsPerPage: PropTypes.number,
    }),
  }),
  initializeDataTable: PropTypes.func.isRequired,
  setDataTablePage: PropTypes.func,
  setDataTableSortingOption: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  dataTable: selectDataTable(ownProps.id)(state),
});

const mapDispatchToProps = {
  initializeDataTable,
  setDataTablePage,
  setDataTableSortingOption,
};

export const DataTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTablePure);
