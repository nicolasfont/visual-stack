import reducer, { toggleSideNav, toggleSideNavLinkGroup } from '../src/actions';

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
});
