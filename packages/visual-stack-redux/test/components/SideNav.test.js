
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { InternalSideNav, InternalLinkGroup } from '../../src/components/SideNav';
import { SideNav, Header, LinkGroup, Link } from '@cjdev/visual-stack/lib/components/SideNav';

describe('SideNav', () => {
  it('should propagate the active state to VisualStack SideNav', () => {
    const wrapper = shallow(
      <InternalSideNav active={true} />
    );
    expect(wrapper.find(SideNav).prop('active')).to.be.true;
  });

  it('should propagate children to VisualStack SideNav', () => {
    const wrapper = mount(
      <InternalSideNav >
          <Header label="whatever" />
        </InternalSideNav>
    );
    expect(wrapper.find(SideNav).find(Header)).to.have.length(1);
    expect(wrapper.find(SideNav).find(Header).prop('label')).to.equal('whatever');
  });
});

describe('LinkGroup', () => {
  it('should propagate label to visual stack link group', () => {
    const wrapper = shallow(
      <InternalLinkGroup label="whatever" />
    );
    expect(wrapper.find(LinkGroup).prop('label')).to.equal('whatever');
  });

  it('should calculate expanded value based on state', () => {
    const label = 'LABEL';
    const state = {
      [label]: {
        expanded: false,
      },
      ANOTHER_LINK_GROUP: {
        expanded: true,
      },
    };

    const wrapper = mount(
      <InternalLinkGroup label={label} linkGroups={state} />
    );
    expect(wrapper.find(LinkGroup).prop('expanded')).to.be.false;
  });


  it('should calculate expanded value when not in state', () => {
    const label = 'LABEL';
    const state = {
      ANOTHER_LINK_GROUP: {
        expanded: true,
      },
    };

    const wrapper = mount(
      <InternalLinkGroup label={label} linkGroups={state} />
    );
    expect(wrapper.find(LinkGroup).prop('expanded')).to.be.false;
  });

  it('should toggle itself when clicked', () => {
    const label = 'LABEL';
    const faker = sinon.spy();

    const wrapper = mount(
      <InternalLinkGroup
        label={label}
        linkGroups={{}}
        toggleSideNavLinkGroup={faker}
      />
    );

    wrapper.find(LinkGroup).find('.sidenav-container-label').simulate('click');
    expect(faker).to.have.been.calledWith(label);
  });

  it('should propagate children to VisualStack LinkGroup', () => {
    const wrapper = mount(
      <InternalLinkGroup label="whatever" linkGroups={{}}>
        <Link>123</Link>
      </InternalLinkGroup>
    );
    expect(wrapper.find(Link)).to.have.length(1);
    expect(wrapper.find(Link)).text().to.equal('123');
  });
});
