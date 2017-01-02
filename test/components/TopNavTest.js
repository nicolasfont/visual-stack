import React from 'react';
import { mount } from 'enzyme';
import { equal } from 'assert';
import { TopNav, SecondaryNav } from '../../src/components/TopNav';

describe('TopNav', () => {
  it('should render kebab when given secondaryNav', () => {
    const secondaryNav = <SecondaryNav />;
    const wrapper = mount(
      <TopNav
        secondaryNav={secondaryNav}
      />
    );
    equal(wrapper.find('.secondarynav-toggle-icon').length, 1);
  });

  it('should not render kebab when no secondaryNav', () => {
    const wrapper = mount(
      <TopNav />
    );
    equal(wrapper.find('.secondarynav-toggle-icon').length, 0);
  });
});
