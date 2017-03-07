import reducer, {
  toggleSideNav,
  toggleSideNavLinkGroup,
  toggleSecondNav,
  openTopNavDropdown,
  closeTopNavDropdown,
  toggleTopNavDropDown,
  toggleSlidingPanel,
} from '../src/actions';

describe('reducer', () => {
  it('should toggle SideNav', () => {
    const beforeState = {
      sideNav: {
        active: false,
      },
    };
    const afterState = {
      sideNav: {
        active: true,
      },
    };
    expect(reducer(beforeState, toggleSideNav())).to.deep.equal(afterState);
    expect(reducer(afterState, toggleSideNav())).to.deep.equal(beforeState);
  });

  it('should toggle LinkGroup expansion', () => {
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
    expect(reducer(beforeState, toggleSideNavLinkGroup('linkGroup1'))).to.deep.equal(afterState);
  });

  it('should toggle SecondNav', () => {
    const beforeState = {
      topNav: {
        secondNavActive: false,
      },
    };
    const afterState = {
      topNav: {
        secondNavActive: true,
      },
    };
    expect(reducer(beforeState, toggleSecondNav())).to.deep.equal(afterState);
    expect(reducer(afterState, toggleSecondNav())).to.deep.equal(beforeState);
  });

  it('should open userMenu', () => {
    const beforeState = {
      topNav: {
        userMenu: {
          open: false,
        },
      },
    };

    const afterState = {
      topNav: {
        userMenu: {
          open: true,
        },
      },
    };
    expect(reducer(beforeState, openTopNavDropdown('userMenu'))).to.deep.equal(afterState);
  });

  it('should close userMenu', () => {
    const beforeState = {
      topNav: {
        userMenu: {
          open: true,
        },
      },
    };

    const afterState = {
      topNav: {
        userMenu: {
          open: false,
        },
      },
    };
    expect(reducer(beforeState, closeTopNavDropdown('userMenu'))).to.deep.equal(afterState);
  });

  it('should toggle userMenu when no initial state', () => {
    const beforeState = {
      topNav: {},
    };

    const afterState = {
      topNav: {
        userMenu: {
          open: true,
        },
      },
    };
    expect(reducer(beforeState, toggleTopNavDropDown('userMenu'))).to.deep.equal(afterState);
  });

  it('should toggle SlidingPanel', () => {
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
    expect(reducer(beforeState, toggleSlidingPanel())).to.deep.equal(afterState);
    expect(reducer(afterState, toggleSlidingPanel())).to.deep.equal(beforeState);
  });
});