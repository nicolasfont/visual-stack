import React from 'react';
import { DataTable } from '..';
import { ASCENDING, DESCENDING } from '../sortingHelper';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { trim, range, sum } from 'ramda';

Enzyme.configure({ adapter: new Adapter() });

describe('DataTable', () => {
  describe('Top Level Header', () => {
    it('should display tool bar', () => {
      const renderToolbar = jest.fn(() => <div id="test">TEST</div>);
      const data = [[1, 2, 3]];
      const columns = [
        {
          label: 'hello',
        },
      ];
      const wrapper = mount(
        <DataTable
          renderToolbar={renderToolbar}
          data={data}
          columns={columns}
        />
      );
      expect(renderToolbar.mock.calls).toEqual([[{ data, columns }]]);
      expect(wrapper.find('div#test').text()).toEqual('TEST');
    });
  });

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
    it('should say "No data available." when there is no data', () => {
      const wrapper = mount(
        <DataTable data={[]} />
      );
      expect(wrapper.find('td')).toHaveLength(0);
      expect(wrapper.find('div.vs-data-table-no-data-label').text()).toEqual("No data available.");
    });

    it('should use the overridden label when there is no data', () => {
      const noDataLabel = "I have no data";
      const wrapper = mount(
        <DataTable data={[]} noDataLabel={noDataLabel}/>
      );
      expect(wrapper.find('td')).toHaveLength(0);
      expect(wrapper.find('div.vs-data-table-no-data-label').text()).toEqual(noDataLabel);
    });

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

    it('should have clickable cell', () => {
      const targetLabel = 'target';
      const targetData = 'target data';
      const columns = [
        {
          label: '1',
        },
        {
          label: '2',
        },
        {
          label: targetLabel,
          clickable: true,
        },
        {
          label: '4',
        },
      ];
      const onClick = jest.fn();
      const wrapper = mount(
        <DataTable
          columns={columns}
          data={[
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, targetData, 4],
            [1, 2, 3, 4],
          ]}
          onClick={onClick}
        />
      );
      const targetTD = wrapper
        .find('a')
        .filterWhere(node => node.text() === targetData);
      targetTD.simulate('click');
      expect(onClick.mock.calls).toEqual([
        [{ label: targetLabel, value: targetData }],
      ]);
    });

    it('should not be able to click on regular td', () => {
      const targetLabel = 'target';
      const targetData = 'target data';
      const columns = [
        {
          label: targetLabel,
        },
        {
          label: '1',
          clickable: true,
        },
      ];
      const onClick = jest.fn();
      const wrapper = mount(
        <DataTable
          columns={columns}
          data={[[targetData, 2], [1, 2]]}
          onClick={onClick}
        />
      );
      const targetTD = wrapper
        .find('td.vs-cell')
        .filterWhere(node => node.text() === targetData);
      targetTD.simulate('click');
      expect(onClick.mock.calls).toHaveLength(0);
    });

    describe('Displaying custom cell', () => {
      it('should display custom cell when there is renderCell function', () => {
        const label = 'change';
        const targetData = 'value';
        const renderCell = value => `test ${value}`;
        const columns = [
          {
            label,
            renderCell,
          },
        ];
        const wrapper = mount(
          <DataTable columns={columns} data={[[targetData]]} />
        );
        const targetTD = wrapper
          .find('td.vs-cell')
          .filterWhere(node => node.text() === `test value`);
        expect(targetTD).toHaveLength(1);
      });
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

    it('should pass translation templates to pagination', () => {
      const onPageChange = jest.fn();

      const numberOfRowsTemplate = "number of rows template";
      const totalRecordsTemplate = "total records template";

      const wrapper = mount(
        <DataTable onPageChange={onPageChange}
                   pagination
                   numberOfRowsTemplate={numberOfRowsTemplate}
                   totalRecordsTemplate={totalRecordsTemplate}/>
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
        numberOfRowsTemplate: numberOfRowsTemplate,
        totalRecordsTemplate: totalRecordsTemplate
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

      it('should render the arrow up icon', () => {
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
        expect(targetHeaderWrapper.find('ArrowUpIcon')).toHaveLength(1);
      });

      it('should render default arrow down icon for non sorted header', () => {
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
        const otherHeadersWrapper = wrapper
          .find('th.vs-data-table-header-sortable')
          .filterWhere(node => trim(node.text()) !== 'first name');
        expect(
          sum(
            otherHeadersWrapper.map(node => node.find('ArrowDownIcon').length)
          )
        ).toEqual(2);
      });

      it('should render arrow down icon', () => {
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
        expect(targetHeaderWrapper.find('ArrowDownIcon')).toHaveLength(1);
      });
    });

    describe('when clicking on sorted header', () => {
      it('should not be clickable when sortable is not enabled', () => {
        const label = 'id';
        const wrapper = mount(
          <DataTable
            columns={[{ label }]}
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

      it('should callback with the descending sorting data on non sorted header', () => {
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
          [third],
          [second],
          [first],
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
          order: DESCENDING,
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
          order: DESCENDING,
        });
      });
    });
  });
});
