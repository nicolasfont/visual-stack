import React from 'react';
import * as uut from '../index';
import Enzyme, { mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('TriStateCheckbox', () => {
  it('should render unselected state', () => {
    const wrapper = mount(<uut.TriStateCheckbox value={0} />);
    const checkbox = wrapper.find('input[type="checkbox"]').getDOMNode();

    expect(checkbox.checked).toEqual(false);
    expect(checkbox.indeterminate).toEqual(false);
  });
  it('should render selected state', () => {
    const wrapper = mount(<uut.TriStateCheckbox value={1} />);
    const checkbox = wrapper.find('input[type="checkbox"]').getDOMNode();

    expect(checkbox.checked).toEqual(true);
    expect(checkbox.indeterminate).toEqual(false);
  });
  it('should render indeterminate state', () => {
    const wrapper = mount(<uut.TriStateCheckbox value={-1} />);
    const checkbox = wrapper.find('input[type="checkbox"]').getDOMNode();
    expect(checkbox.indeterminate).toEqual(true);
  });
  it('should trigger events on click', () => {
    var clicked = false;
    const wrapper = mount(
      <uut.TriStateCheckbox
        value={1}
        onClick={() => {
          clicked = true;
        }}
      />
    );
    const checkbox = wrapper.find('input[type="checkbox"]');
    checkbox.props().onClick();
    expect(clicked).toEqual(true);
  });
});
