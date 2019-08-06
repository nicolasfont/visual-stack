import React from 'react';
import AsyncSelect from '../index';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const testOptions = [
  { value: 'value1', label: 'Value 1' },
  { value: 'value2', label: 'Value 2' },
  { value: 'value3', label: 'Value 3' },
];

describe('AsyncSelect', () => {
  test('should render', () => {
    const wrapper = mount(<AsyncSelect />);
    expect(wrapper.find(AsyncSelect).length).toEqual(1);
  });

  test('should pass additional arbitrary parameters to react creatable select', () => {
    const shallowWrapper = shallow(
      <AsyncSelect
        defaultOptions={testOptions}
        className="additional-classname"
        otherProp={'another prop'}
      />
    );

    expect(
      shallowWrapper
        .find('.vs-default-react-select-async')
        .hasClass('additional-classname')
    ).toBe(true);
    expect(
      shallowWrapper.find('.vs-default-react-select-async').prop('otherProp')
    ).toBe('another prop');
  });
});
