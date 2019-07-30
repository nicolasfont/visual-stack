import React from 'react';
import { DataTablePure } from '../';
import { DataTable as VSDataTable } from '@cjdev/visual-stack/lib/components/Table/DataTable';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('DataTablePure', () => {
  it('should initialize data table when first mounted', () => {
    const initializeDataTable = jest.fn();
    const id = '1';
    const data = [{ id: 1 }];
    shallow(
      <DataTablePure
        id={id}
        data={data}
        dataTable={{ pagination: {} }}
        initializeDataTable={initializeDataTable}
      />
    );
    expect(initializeDataTable.mock.calls).toEqual([
      [
        {
          id,
          data,
        },
      ],
    ]);
  });

  it('should call setDataTablePage when changing page from VSDataTable', () => {
    const id = '1';
    const setDataTablePage = jest.fn();
    const paginationPayload = { page: 2, rowsPerPage: 50 };
    const wrapper = shallow(
      <DataTablePure
        id={id}
        dataTable={{ pagination: {} }}
        initializeDataTable={() => {}}
        setDataTablePage={setDataTablePage}
      />
    );
    const { onPageChange } = wrapper.find(VSDataTable).props();
    onPageChange(paginationPayload);
    expect(setDataTablePage.mock.calls).toEqual([
      [
        {
          id,
          pagination: paginationPayload,
        },
      ],
    ]);
  });

  it('should call setDataTableSortingOption when sorting from VSDataTable', () => {
    const id = '1';
    const setDataTableSortingOption = jest.fn();
    const sortingPayload = {
      sortingOption: { label: 'id', order: 'ASCENDING' },
      data: [{ id: 1 }],
    };
    const wrapper = shallow(
      <DataTablePure
        id={id}
        dataTable={{ pagination: {} }}
        initializeDataTable={() => {}}
        setDataTableSortingOption={setDataTableSortingOption}
      />
    );
    const { onSort } = wrapper.find(VSDataTable).props();
    onSort(sortingPayload);
    expect(setDataTableSortingOption.mock.calls).toEqual([
      [
        {
          id,
          ...sortingPayload,
        },
      ],
    ]);
  });

  it('should wire the correct props', () => {
    const id = '1';
    const data = [{ id: 1 }];
    const initializeDataTable = jest.fn();
    const onClick = jest.fn();
    const page = 1;
    const columns = [{ label: 'id' }];
    const rowsPerPage = 10;
    const sortable = false;
    const pagination = true;
    const renderToolbar = jest.fn();
    const sortingOption = {
      label: 'id',
      order: 'ASCENDING',
    };
    const caption = 'I am a table';
    const dataTable = {
      data,
      pagination: {
        page,
        rowsPerPage,
      },
      sortingOption,
    };
    const wrapper = shallow(
      <DataTablePure
        caption={caption}
        columns={columns}
        id={id}
        sortable={sortable}
        pagination={pagination}
        data={[]}
        dataTable={{ pagination: {} }}
        initializeDataTable={initializeDataTable}
        dataTable={dataTable}
        onClick={onClick}
        renderToolbar={renderToolbar}
      />
    );
    const props = wrapper.find(VSDataTable).props();
    expect(props.caption).toEqual(caption);
    expect(props.columns).toEqual(columns);
    expect(props.sortable).toEqual(sortable);
    expect(props.pagination).toEqual(pagination);
    expect(props.data).toEqual(dataTable.data);
    expect(props.page).toEqual(dataTable.pagination.page);
    expect(props.rowsPerPage).toEqual(dataTable.pagination.rowsPerPage);
    expect(props.sortingOption).toEqual(dataTable.sortingOption);
    expect(props.onClick).toEqual(onClick);
    expect(props.renderToolbar).toEqual(renderToolbar);
  });

  it('should not reset data table data if props isnt changed', () => {
    const id = 'sample-data-table';
    const setDataTableSortingOption = jest.fn();
    const data = [[1]];
    const wrapper = shallow(
      <DataTablePure
        id={id}
        data={data}
        dataTable={{ pagination: {} }}
        initializeDataTable={() => {}}
        setDataTableSortingOption={setDataTableSortingOption}
      />
    );
    wrapper.setProps({ data });
    expect(setDataTableSortingOption.mock.calls).toHaveLength(0);
  });

  it('should set new data table data if props changed', () => {
    const id = 'sample-data-table';
    const setDataTableSortingOption = jest.fn();
    const data = [[1]];
    const newData = [[2]];
    const wrapper = shallow(
      <DataTablePure
        id={id}
        data={data}
        dataTable={{ pagination: {} }}
        initializeDataTable={() => {}}
        setDataTableSortingOption={setDataTableSortingOption}
      />
    );
    wrapper.setProps({ data: newData });
    expect(setDataTableSortingOption.mock.calls).toEqual([
      [{ data: newData, id }],
    ]);
  });
});
