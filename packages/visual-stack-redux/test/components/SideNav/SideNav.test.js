/** @prettier */
import React from 'react';
import { mount, shallow } from 'enzyme';

import { InternalSideNav } from '../../../src/components/SideNav/SideNav';
import { SideNav, Header } from '@cjdev/visual-stack/lib/components/SideNav';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('SideNav', () => {
  test('should propagate the active state to VisualStack SideNav', () => {
    const wrapper = shallow(
      <InternalSideNav collapsed={true} userMenu={<div />} />
    );
    wrapper.debug();
    expect(wrapper.find(SideNav).prop('collapsed')).toBe(true);
  });

  test('should propagate children to VisualStack SideNav', () => {
    const wrapper = shallow(
      <InternalSideNav userMenu={<div />}>
        <Header label="whatever">something</Header>
      </InternalSideNav>
    );
    expect(wrapper.find(SideNav).find(Header)).toHaveLength(1);
    expect(
      wrapper
        .find(SideNav)
        .find(Header)
        .prop('label')
    ).toBe('whatever');
  });

  test('should propagate children to VisualStack SideNav', () => {
    const wrapper = shallow(
      <InternalSideNav>
        <Header label="whatever">something</Header>
      </InternalSideNav>
    );
    expect(wrapper.find(SideNav).find(Header)).toHaveLength(1);
    expect(
      wrapper
        .find(SideNav)
        .find(Header)
        .prop('label')
    ).toBe('whatever');
  });

  test('should propagate the logo to the SideNav', () => {
    const logo = <span>LOGO</span>;
    const wrapper = mount(
      <InternalSideNav logo={logo} toggleSideNav={() => {}} />
    );
    expect(wrapper.contains(logo)).toBe(true);
  });
});
