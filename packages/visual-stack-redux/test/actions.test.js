import reducer, {
  toggleSideNav,
  toggleSideNavLinkGroup,
  toggleSlidingPanel,
  setSlidingPanelActiveState,
  selectTab,
  initializePagination,
  setPaginationValue,
  selectPaginationValue,
  updateCalendarRanges,
  forDatepicker,
  updateNamedCalendarRanges,
  resetCalendarSelection,
  toggleFilterDropdown,
  hideFilterDropdown,
  expandFilterDropdown,
  initializeDataTable,
  setDataTablePage,
  setDataTableSortingOption,
} from '../src/actions';
import { selectDataTable } from '../lib/actions';
import { DESCENDING } from '@cjdev/visual-stack/lib/components/Table/DataTable/sortingHelper';

describe('reducer', () => {
  test('initial state', () => {
    const initialState = reducer(undefined, {});
    expect(initialState).toEqual({
      menuBar: {},
      modal: expect.any(Object),
      alert: expect.any(Object),
      navGroupDropdown: {},
      sideNav: {},
      slidingPanel: {},
      tabLayout: {},
      pagination: {},
      datePicker: {},
    });
  });

  test('should toggle SideNav with given state', () => {
    const beforeState = {
      sideNav: {
        collapsed: false,
      },
    };
    const afterState = {
      sideNav: {
        collapsed: true,
      },
    };
    expect(reducer(beforeState, toggleSideNav(true))).toEqual(afterState);
    expect(reducer(afterState, toggleSideNav(false))).toEqual(beforeState);
  });

  test('should toggle LinkGroup expansion', () => {
    const beforeState = {
      sideNav: {
        linkGroups: {
          linkGroupShouldntChange: {
            expanded: false,
          },
        },
      },
    };
    const afterState = {
      sideNav: {
        linkGroups: {
          linkGroup1: {
            expanded: true,
          },
          linkGroupShouldntChange: {
            expanded: false,
          },
        },
      },
    };
    expect(
      reducer(beforeState, toggleSideNavLinkGroup(true, 'linkGroup1'))
    ).toEqual(afterState);
  });

  test('should collapse existing expanded LinkGroups', () => {
    const beforeState = {
      sideNav: {
        linkGroups: {
          linkGroupShouldBeReset: {
            expanded: true,
          },
        },
      },
    };
    const afterState = {
      sideNav: {
        linkGroups: {
          linkGroup1: {
            expanded: true,
          },
          linkGroupShouldBeReset: {
            expanded: false,
          },
        },
      },
    };
    expect(
      reducer(beforeState, toggleSideNavLinkGroup(true, 'linkGroup1'))
    ).toEqual(afterState);
  });

  test('should toggle SlidingPanel', () => {
    const beforeState = {
      slidingPanel: {
        active: false,
      },
    };
    const afterState = {
      slidingPanel: {
        active: true,
      },
    };
    expect(reducer(beforeState, toggleSlidingPanel())).toEqual(afterState);
    expect(reducer(afterState, toggleSlidingPanel())).toEqual(beforeState);
  });

  test('should toggle filter dropdown', () => {
    const beforeState = {
      slidingPanel: {
        id1: {
          expanded: true,
        },
        active: true,
      },
    };
    const afterState = {
      slidingPanel: {
        id1: {
          expanded: false,
        },
        active: true,
      },
    };
    expect(reducer(beforeState, toggleFilterDropdown('id1'))).toEqual(
      afterState
    );
  });

  test('should hide filter dropdown', () => {
    const beforeState = {
      slidingPanel: {
        id1: {
          expanded: true,
        },
        active: true,
      },
    };
    const afterState = {
      slidingPanel: {
        id1: {
          expanded: false,
        },
        active: true,
      },
    };
    expect(reducer(beforeState, hideFilterDropdown('id1'))).toEqual(afterState);
  });

  test('should expand filter dropdown', () => {
    const beforeState = {
      slidingPanel: {
        id1: {
          expanded: false,
        },
        active: true,
      },
    };
    const afterState = {
      slidingPanel: {
        id1: {
          expanded: true,
        },
        active: true,
      },
    };
    expect(reducer(beforeState, expandFilterDropdown('id1'))).toEqual(
      afterState
    );
  });

  test('should update index by tabLayoutId', () => {
    const beforeState = {
      tabLayout: {},
    };
    const afterState = {
      tabLayout: {
        ID123: {
          index: 0,
        },
      },
    };
    expect(
      reducer(beforeState, selectTab({ tabLayoutId: 'ID123', index: 0 }))
    ).toEqual(afterState);
  });

  test('should set SlidingPanel active state to desired state', () => {
    const beforeState = {
      slidingPanel: {
        active: false,
      },
    };
    const afterState = {
      slidingPanel: {
        active: true,
      },
    };
    expect(reducer(beforeState, setSlidingPanelActiveState(true))).toEqual(
      afterState
    );
    expect(reducer(afterState, setSlidingPanelActiveState(false))).toEqual(
      beforeState
    );
  });

  test('set initial value for pagination', () => {
    const paginationId = 'sample';
    const beforeState = {
      pagination: {},
    };

    const afterState = reducer(
      beforeState,
      initializePagination({ paginationId })
    );

    expect(afterState.pagination[paginationId]).toEqual({
      page: 1,
      rowsPerPage: 10,
    });
  });

  test('set pagination value', () => {
    const paginationId = 'sample';
    const rowsPerPage = 10;
    const page = 2;
    const beforeState = {
      pagination: {
        paginationId: {},
      },
    };

    const afterState = reducer(
      beforeState,
      setPaginationValue({ paginationId, rowsPerPage, page })
    );

    expect(afterState.pagination[paginationId]).toEqual({
      rowsPerPage,
      page,
    });
  });

  test('select default pagination value from redux state', () => {
    const state = {
      visualStack: {
        pagination: {},
      },
    };

    const ownProps = {
      paginationId: 'test',
    };

    const paginationValue = selectPaginationValue(state, ownProps);
    expect(paginationValue).toEqual({
      page: 1,
      rowsPerPage: 10,
    });
  });

  test('select existing pagination value from redux state', () => {
    const existingPaginationValue = {
      page: 2,
      rowsPerPage: 25,
    };
    const state = {
      visualStack: {
        pagination: {
          test: existingPaginationValue,
        },
      },
    };

    const ownProps = {
      paginationId: 'test',
    };

    const paginationValue = selectPaginationValue(state, ownProps);
    expect(paginationValue).toEqual(existingPaginationValue);
  });

  test('datepicker updateCalendarRanges action works', () => {
    const beforeState = { datePicker: { a: {}, b: {} } };

    const afterState = reducer(
      beforeState,
      forDatepicker('a', updateCalendarRanges(['1', '2']))
    );

    expect(afterState).toEqual({
      datePicker: {
        a: { selectedRanges: ['1', '2'] },
        b: {},
      },
    });
  });

  test('datepicker updateNamedCalendarRanges action works', () => {
    const beforeState = {
      datePicker: { a: {}, b: { selectedRanges: ['a', 'b'] } },
    };

    const afterState = reducer(
      beforeState,
      forDatepicker('b', updateNamedCalendarRanges(['1', '2']))
    );

    expect(afterState).toEqual({
      datePicker: {
        a: {},
        b: { selectedRanges: ['a', 'b'], selectedNamedRanges: ['1', '2'] },
      },
    });
  });

  test('datepicker resetCalendarSelection action works', () => {
    const beforeState = {
      datePicker: {
        a: { selectedRanges: ['a', 'b'] },
        b: { selectedRanges: ['a', 'b'], selectedNamedRanges: ['1', '2'] },
      },
    };

    const afterState = reducer(
      beforeState,
      forDatepicker('b', resetCalendarSelection())
    );

    expect(afterState).toEqual({
      datePicker: {
        a: { selectedRanges: ['a', 'b'] },
        b: {},
      },
    });
  });

  test('should initialize dataTable data', () => {
    const id = 'sample-data-table';
    const data = [
      {
        id: 1,
      },
    ];
    const columns = [];
    const sortingOption = null;
    const beforeState = {};
    const afterState = reducer(
      beforeState,
      initializeDataTable({ id, data, columns, sortingOption })
    );
    expect(afterState.dataTable[id]).toEqual({
      data,
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
      sortingOption: {},
    });
  });

  test('should initialize dataTable data with default sorting option ', () => {
    const id = 'sample-data-table';
    const data = [[4], [3], [7], [1], [2]];
    const columns = [
      {
        label: 'id',
      },
    ];
    const sortingOption = {
      label: 'id',
      order: DESCENDING,
    };
    const beforeState = {};
    const afterState = reducer(
      beforeState,
      initializeDataTable({ id, data, columns, sortingOption })
    );
    const {
      data: actualData,
      sortingOption: actualSortingOption,
    } = afterState.dataTable[id];
    expect(actualData).toEqual([[7], [4], [3], [2], [1]]);
    expect(actualSortingOption).toEqual(sortingOption);
  });

  test('should setDataTablePage', () => {
    const id = 'sample-data-table';
    const pagination = {
      size: 1,
      rowsPerPage: 10,
    };
    const beforeState = {};
    const afterState = reducer(
      beforeState,
      setDataTablePage({ id, pagination })
    );
    expect(afterState.dataTable[id]).toEqual({
      pagination,
    });
  });

  test('should setDataTableSortingOption', () => {
    const id = 'sample-data-table';
    const data = [{ id: 1 }];
    const sortingOption = {
      label: 'id',
      order: 'ASCENDING',
    };
    const beforeState = {};
    const afterState = reducer(
      beforeState,
      setDataTableSortingOption({ id, data, sortingOption })
    );
    expect(afterState.dataTable[id]).toEqual({
      data,
      sortingOption,
    });
  });

  test('should select data table from tabe id', () => {
    const dataTable = {
      data: [{ id: 1 }],
      sortingOption: { page: 1, rowsPerPage: 10 },
      pagination: {
        label: 'id',
        order: 'ASCENDING',
      },
    };
    const id = 'sample-data-table';
    const state = {
      visualStack: {
        dataTable: {
          [id]: dataTable,
        },
      },
    };
    expect(selectDataTable(id)(state)).toEqual(dataTable);
  });
});
