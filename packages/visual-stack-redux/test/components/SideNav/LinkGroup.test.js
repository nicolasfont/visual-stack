/** @prettier */
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { InternalLinkGroup } from '../../../src/components/SideNav/LinkGroup';
import { LinkGroup, Link } from '@cjdev/visual-stack/lib/components/SideNav';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('LinkGroup', () => {
  test('should propagate label to visual stack link group', () => {
    const wrapper = shallow(
      <InternalLinkGroup label="whatever" />
    );
    expect(wrapper.find(LinkGroup).prop('label')).toBe('whatever');
  });

  test('should calculate expanded value based on state', () => {
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
    expect(wrapper.find(LinkGroup).prop('expanded')).toBe(false);
  });

  test('should calculate expanded value when not in state', () => {
    const label = 'LABEL';
    const state = {
      ANOTHER_LINK_GROUP: {
        expanded: true,
      },
    };

    const wrapper = mount(
      <InternalLinkGroup label={label} linkGroups={state} />
    );
    expect(wrapper.find(LinkGroup).prop('expanded')).toBe(false);
  });

  test('should toggle itself when clicked with given state', () => {
    const label = 'LABEL';
    const faker = sinon.spy();
    const toggleFake = sinon.spy();

    const wrapper = mount(
      <InternalLinkGroup
        label={label}
        linkGroups={{}}
        toggleSideNav={toggleFake}
        toggleSideNavLinkGroup={faker}
      />
    );

    wrapper.find(LinkGroup).find('.vs-sidenav-container-label').simulate('click');
    expect(faker.calledWith(true, label)).toBeTruthy();
    expect(toggleFake.calledOnce).toBeTruthy();
    expect(toggleFake.calledWith(false)).toBeTruthy();
  });

  test('should propagate children to VisualStack LinkGroup', () => {
    const wrapper = mount(
      <InternalLinkGroup label="whatever" linkGroups={{}}>
        <Link><a href="mockRouterLink">123</a></Link>
      </InternalLinkGroup>
    );
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Link).text()).toBe('123');
  });
});
