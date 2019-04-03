import reducer, {
  toggleSideNav,
  toggleSideNavLinkGroup,
  toggleSlidingPanel,
  setSlidingPanelActiveState,
  selectTab,
} from '../src/actions';

describe('reducer', () => {
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
});
