import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';

import { InternalNavGroup } from '../../src/components/Sidebar';

describe('Sidebar', () => {
  let openDropdownSpy, registerNavSpy, component;

  describe('NavGroup should', () => {
    beforeEach(() => {
      openDropdownSpy = spy();
      registerNavSpy = spy();
      const openDropdown = () => { openDropdownSpy(); };
      const registerNavGroup  = () => { registerNavSpy(); };
      const storeState = { navGroupDropdown: { something: false } };
      component = mount(
        <InternalNavGroup
          onNavGroupClick={ openDropdown }
          registerNavGroup={ registerNavGroup }
          storeState = { storeState }
        />
      );
    });
    it('open when clicked', () => {
      component.find('button').simulate('click');
      expect(openDropdownSpy).to.have.been.calledOnce;
    });

    it('register the InternalNavGroup does initial rendering', () => {
      expect(registerNavSpy).to.have.been.calledOnce;
    });
  });
});
