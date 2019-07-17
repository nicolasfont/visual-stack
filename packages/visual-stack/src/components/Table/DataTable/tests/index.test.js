import React from 'react';
import { DataTable, ASCENDING, DESCENDING } from '..';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { trim, range, sum } from 'ramda';
import { wrap } from 'module';

Enzyme.configure({ adapter: new Adapter() });

describe('DataTable', () => {
  describe('headers', () => {
    it('should render when there are columns', () => {
      const label1 = 'label1';
      const label2 = 'label2';
      const wrapper = mount(
        <DataTable
          columns={[
            {
              label: label1,
            },
            {
              label: label2,
            },
          ]}
        />
      );
      expect(wrapper.find('th').map(node => trim(node.text()))).toEqual([
        label1,
        label2,
      ]);
    });

    it('should render with width when there is a width for columns', () => {
      const width1 = '100%';
      const width2 = '99%';
      const wrapper = mount(
        <DataTable
          columns={[
            {
              label: '',
              width: width1,
            },
            {
              label: '',
              width: width2,
            },
          ]}
        />
      );
      expect(wrapper.find('th').map(node => node.prop('style'))).toEqual([
        { width: width1 },
        { width: width2 },
      ]);
    });
  });

  describe('rows', () => {
    it('should render when there is data', () => {
      const data1 = 'data1';
      const data2 = 'data2';
      const data3 = 'data3';
      const data4 = 'data4';
      const wrapper = mount(
        <DataTable data={[[data1, data2], [data3, data4]]} />
      );
      expect(wrapper.find('td').map(node => node.text())).toEqual([
        data1,
        data2,
        data3,
        data4,
      ]);
    });
  });

  describe('pagination', () => {
    it('should not render if pagination is not enabled', () => {
      const wrapper = mount(<DataTable />);
      expect(wrapper.find('Pagination')).toHaveLength(0);
    });

    it('should render if pagination is enabled', () => {
      const onPageChange = jest.fn();
      const wrapper = mount(
        <DataTable onPageChange={onPageChange} pagination />
      );
      const paginationWrapper = wrapper.find('Pagination');
      const paginationProps = paginationWrapper.props();
      expect(paginationWrapper).toHaveLength(1);
      expect(paginationProps).toEqual({
        rowsPerPage: 25,
        page: 1,
        onChange: onPageChange,
        className: 'vs-table-pagination',
        numberOfRows: 0,
      });
    });

    describe('Rendering Rows', () => {
      const group1 = range(1, 26);
      const group2 = range(26, 51);
      const group3 = range(51, 76);
      const groupedData1 = group1.map(number => [number]);
      const groupedData2 = group2.map(number => [number]);
      const groupedData3 = group3.map(number => [number]);

      it('should render a fixed number of rows when pagination is enabled', () => {
        const onPageChange = jest.fn();
        const wrapper = mount(
          <DataTable
            rowsPerPage={25}
            page={2}
            data={[...groupedData1, ...groupedData2, ...groupedData3]}
            onPageChange={onPageChange}
            pagination
          />
        );
        expect(wrapper.find('td').map(node => node.text())).toEqual(
          group2.map(number => number.toString())
        );
      });

      it('should render a all the rows when pagination is disabled', () => {
        const wrapper = mount(
          <DataTable
            rowsPerPage={25}
            page={2}
            data={[...groupedData1, ...groupedData2, ...groupedData3]}
          />
        );
        expect(wrapper.find('td').map(node => node.text())).toEqual(
          [...group1, ...group2, ...group3].map(number => number.toString())
        );
      });
    });
  });

  describe('sorting', () => {
    describe('when displaying headers', () => {
      it('should not render any sortable style if sortable is not enabled', () => {
        const wrapper = mount(
          <DataTable
            columns={[{ label: 'id' }]}
            sortingOption={{
              label: 'id',
              order: DESCENDING,
            }}
          />
        );
        expect(wrapper.find('MenuUpIcon')).toHaveLength(0);
        expect(wrapper.find('MenuDownIcon')).toHaveLength(0);
        expect(wrapper.find('th.vs-data-table-header-sorted')).toHaveLength(0);
        expect(wrapper.find('th.vs-data-table-header-sortable')).toHaveLength(
          0
        );
      });

      it('should bold header if the column is sorted', () => {
        const wrapper = mount(
          <DataTable
            columns={[{ label: 'id' }]}
            sortingOption={{
              label: 'id',
              order: DESCENDING,
            }}
            sortable
          />
        );
        const targetHeader = wrapper.find('th.vs-data-table-header-sorted');
        expect(targetHeader).toHaveLength(1);
        expect(trim(targetHeader.text())).toEqual('id');
      });

      it('should not bold header if the column is not sorted', () => {
        const wrapper = mount(
          <DataTable
            columns={[{ label: 'id' }]}
            sortingOption={{
              label: 'id2',
              order: DESCENDING,
            }}
            sortable
          />
        );
        const targetHeader = wrapper.find('th.vs-data-table-header-sorted');
        expect(targetHeader).toHaveLength(0);
      });

      it('should render the menu up icon', () => {
        const wrapper = mount(
          <DataTable
            columns={[
              { label: 'id' },
              {
                label: 'first name',
              },
              {
                label: 'last name',
              },
            ]}
            sortingOption={{
              label: 'first name',
              order: ASCENDING,
            }}
            sortable
          />
        );
        const targetHeaderWrapper = wrapper
          .find('th.vs-data-table-header-sortable')
          .filterWhere(node => trim(node.text()) === 'first name');
        const otherHeadersWrapper = wrapper
          .find('th.vs-data-table-header-sortable')
          .filterWhere(node => trim(node.text()) !== 'first name');
        expect(targetHeaderWrapper.find('MenuUpIcon')).toHaveLength(1);
        expect(
          sum(otherHeadersWrapper.map(node => node.find('MenuDownIcon').length))
        ).toEqual(0);
      });

      it('should render menu down icon', () => {
        const wrapper = mount(
          <DataTable
            columns={[
              { label: 'id' },
              {
                label: 'first name',
              },
              {
                label: 'last name',
              },
            ]}
            sortingOption={{
              label: 'first name',
              order: DESCENDING,
            }}
            sortable
          />
        );
        const targetHeaderWrapper = wrapper
          .find('th.vs-data-table-header-sortable')
          .filterWhere(node => trim(node.text()) === 'first name');
        expect(targetHeaderWrapper.find('MenuDownIcon')).toHaveLength(1);
      });
    });

    describe('when clicking on sorted header', () => {
      it('should not be clickable when sortable is not enabled', () => {
        const label = 'id';
        const wrapper = mount(
          <DataTable
            columns={[{ label: label }]}
            sortingOption={{
              label,
              order: DESCENDING,
            }}
          />
        );
        const targetHeaderWrapper = wrapper
          .find('th')
          .filterWhere(node => trim(node.text()) === label);
        expect(targetHeaderWrapper.prop('onClick')).toEqual(undefined);
      });

      it('should callback with the sorting option', () => {
        const onSort = jest.fn();
        const label = 'first name';
        const wrapper = mount(
          <DataTable
            columns={[
              {
                label,
              },
            ]}
            sortingOption={{
              label,
              order: DESCENDING,
            }}
            onSort={onSort}
            sortable
          />
        );
        const targetHeaderWrapper = wrapper
          .find('th.vs-data-table-header-sortable')
          .filterWhere(node => trim(node.text()) === label);
        targetHeaderWrapper.simulate('click');

        expect(onSort.mock.calls[0][0].sortingOption).toEqual({
          label,
          order: ASCENDING,
        });
      });

      it('should callback with alternate sorting order', () => {
        const onSort = jest.fn();
        const label = 'first name';
        const wrapper = mount(
          <DataTable
            columns={[
              {
                label,
              },
            ]}
            sortingOption={{
              label,
              order: ASCENDING,
            }}
            onSort={onSort}
            sortable
          />
        );
        const targetHeaderWrapper = wrapper
          .find('th.vs-data-table-header-sortable')
          .filterWhere(node => trim(node.text()) === label);
        targetHeaderWrapper.simulate('click');
        expect(onSort.mock.calls[0][0].sortingOption).toEqual({
          label,
          order: DESCENDING,
        });
      });

      it('should callback with the ascending sorting data on non sorted header', () => {
        const onSort = jest.fn();
        const first = 'a';
        const second = 'b';
        const third = 'c';
        const label = 'id';
        const wrapper = mount(
          <DataTable
            columns={[
              {
                label,
              },
            ]}
            sortingOption={{
              label: 'NOT YOUR TARGET HEADER',
              order: DESCENDING,
            }}
            data={[[second], [first], [third]]}
            onSort={onSort}
            sortable
          />
        );
        const targetHeaderWrapper = wrapper
          .find('th.vs-data-table-header-sortable')
          .filterWhere(node => trim(node.text()) === label);
        targetHeaderWrapper.simulate('click');

        expect(onSort.mock.calls[0][0].data).toEqual([
          [first],
          [second],
          [third],
        ]);
      });

      it('should callback with the ascending sorting data', () => {
        const onSort = jest.fn();
        const first = 'a';
        const second = 'b';
        const third = 'c';
        const label = 'id';
        const wrapper = mount(
          <DataTable
            columns={[
              {
                label,
              },
            ]}
            sortingOption={{
              label,
              order: DESCENDING,
            }}
            data={[[second], [first], [third]]}
            onSort={onSort}
            sortable
          />
        );
        const targetHeaderWrapper = wrapper
          .find('th.vs-data-table-header-sortable')
          .filterWhere(node => trim(node.text()) === label);
        targetHeaderWrapper.simulate('click');

        expect(onSort.mock.calls[0][0].data).toEqual([
          [first],
          [second],
          [third],
        ]);
      });

      it('should callback with the descending sorting data', () => {
        const onSort = jest.fn();
        const label = 'first name';
        const first = 'a';
        const second = 'b';
        const third = 'c';
        const wrapper = mount(
          <DataTable
            columns={[
              {
                label,
              },
            ]}
            sortingOption={{
              label,
              order: ASCENDING,
            }}
            data={[[second], [first], [third]]}
            onSort={onSort}
            sortable
          />
        );
        const targetHeaderWrapper = wrapper
          .find('th.vs-data-table-header-sortable')
          .filterWhere(node => trim(node.text()) === label);
        targetHeaderWrapper.simulate('click');
        expect(onSort.mock.calls[0][0].data).toEqual([
          [third],
          [second],
          [first],
        ]);
      });
    });

    describe('when clicking on non-sorted header', () => {
      it('should callback with default sorting order', () => {
        const onSort = jest.fn();
        const label = 'first name';
        const wrapper = mount(
          <DataTable
            columns={[
              {
                label,
              },
            ]}
            onSort={onSort}
            sortable
          />
        );
        const targetHeaderWrapper = wrapper
          .find('th.vs-data-table-header-sortable')
          .filterWhere(node => trim(node.text()) === label);
        targetHeaderWrapper.simulate('click');
        expect(onSort.mock.calls[0][0].sortingOption).toEqual({
          label,
          order: ASCENDING,
        });
      });

      it('should callback with default sorting order and ignore the sorted header', () => {
        const onSort = jest.fn();
        const label = 'first name';
        const wrapper = mount(
          <DataTable
            columns={[
              {
                label,
              },
            ]}
            onSort={onSort}
            sortingOption={{
              label: 'id',
              order: ASCENDING,
            }}
            sortable
          />
        );
        const targetHeaderWrapper = wrapper
          .find('th.vs-data-table-header-sortable')
          .filterWhere(node => trim(node.text()) === label);
        targetHeaderWrapper.simulate('click');
        expect(onSort.mock.calls[0][0].sortingOption).toEqual({
          label,
          order: ASCENDING,
        });
      });
    });
  });
});
