import React from 'react';
import ReactDOM from 'react-dom';
import { spy } from 'sinon';
import { mount } from 'enzyme';

import { InternalMenuBarDropdown } from '../../src/components/MenuBar';

import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('MenuBarDropdown', () => {
  const context = { menuBarName: 'test-menu-bar' };
  const el = document.createElement('div');
  document.body.appendChild(el);
  const options = { context, attachTo: el };

  const component = props =>
    <InternalMenuBarDropdown
      name="test-dropdown"
      title="Test Dropdown"
      {...props} />;

  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  test('opens when clicked', () => {
    const openDropdown = spy();
    const props = { menuBars: {}, openDropdown };
    wrapper = mount(
      <InternalMenuBarDropdown
        name="test-dropdown"
        title="Test Dropdown"
        {...props} />,
      options
    );

    ReactDOM.findDOMNode(wrapper.instance()).click();
    wrapper.update();

    expect(openDropdown.calledOnce).toBeTruthy();
  });

  test('closes when clicked a second time', () => {
    const closeDropdown = spy();
    const props = {
      menuBars: { 'test-menu-bar': { 'test-dropdown': { open: true } } },
      closeDropdown,
    };

    wrapper = mount(
      <InternalMenuBarDropdown
        name="test-dropdown"
        title="Test Dropdown"
        {...props} />,
      options
    );

    ReactDOM.findDOMNode(wrapper.instance()).click();
    wrapper.update();
    expect(closeDropdown.called).toBeTruthy();
  });

  test('closes when clicked outside the dropdown', () => {
    const closeDropdown = spy();
    const props = { menuBars: {}, closeDropdown };

    wrapper = mount(
      <InternalMenuBarDropdown
        name="test-dropdown"
        title="Test Dropdown"
        {...props} />,
      options
    );

    document.body.click();
    wrapper.update();
    expect(closeDropdown.calledOnce).toBeTruthy();
  });
});
