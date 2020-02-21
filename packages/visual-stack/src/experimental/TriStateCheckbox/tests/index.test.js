import React from 'react';
import { TriStateCheckbox } from '../index';
import Enzyme, { mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('TriStateCheckbox', () => {
  it('should render unselected state', () => {
    const wrapper = mount(<TriStateCheckbox value={0}></TriStateCheckbox>);
    const checkbox = wrapper.find('input[type="checkbox"]').getDOMNode();

    expect(checkbox.checked).toEqual(false);
    expect(checkbox.indeterminate).toEqual(false);
  });
  it('should render selected state', () => {
    const wrapper = mount(<TriStateCheckbox value={1}></TriStateCheckbox>);
    const checkbox = wrapper.find('input[type="checkbox"]').getDOMNode();

    expect(checkbox.checked).toEqual(true);
    expect(checkbox.indeterminate).toEqual(false);
  });
  it('should render indeterminate state', () => {
    const wrapper = mount(<TriStateCheckbox value={-1}></TriStateCheckbox>);
    const checkbox = wrapper.find('input[type="checkbox"]').getDOMNode();
    expect(checkbox.indeterminate).toEqual(true);
  });
  it('should trigger events on click', () => {
    var clicked = false;
    const wrapper = mount(
      <TriStateCheckbox
        value={1}
        onClick={() => {
          clicked = true;
        }}
      ></TriStateCheckbox>
    );
    const checkbox = wrapper.find('input[type="checkbox"]');
    checkbox.props().onClick();
    expect(clicked).toEqual(true);
  });
});
