/** @prettier */
import React from 'react';
import { mount, shallow } from 'enzyme';

import { InternalSideNav } from '../../../src/components/SideNav/SideNav';
import { SideNav, Header } from '@cjdev/visual-stack/lib/components/SideNav';

describe('SideNav', () => {
  test('should propagate the active state to VisualStack SideNav', () => {
    const wrapper = shallow(
      <InternalSideNav collapsed={true} userMenu={<div/>}/>
    );
    wrapper.debug();
    expect(wrapper.find(SideNav).prop('collapsed')).toBe(true);
  });

  test('should propagate children to VisualStack SideNav', () => {
    const wrapper = shallow(
      <InternalSideNav userMenu={<div/>}>
          <Header label="whatever" />
      </InternalSideNav>
    );
    expect(wrapper.find(SideNav).find(Header)).toHaveLength(1);
    expect(wrapper.find(SideNav).find(Header).prop('label')).toBe('whatever');
  });

  test('should propagate children to VisualStack SideNav', () => {
    const wrapper = shallow(
      <InternalSideNav>
          <Header label="whatever" />
      </InternalSideNav>
    );
    expect(wrapper.find(SideNav).find(Header)).toHaveLength(1);
    expect(wrapper.find(SideNav).find(Header).prop('label')).toBe('whatever');
  });

  test('should propagate the logo to the SideNav', () => {
    const logo = <span>LOGO</span>;
    const wrapper = mount(
      <InternalSideNav logo={logo} toggleSideNav={() => {}} />
    );
    expect(wrapper.contains(logo)).toBe(true);
  });
});
