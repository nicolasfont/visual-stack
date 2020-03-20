import React from 'react';
import { ExpandingInputButton } from '../index';
import Enzyme, { shallow } from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
Enzyme.configure({ adapter: new Adapter() });
import MagnifyIcon from 'mdi-react/MagnifyIcon';

describe('ExpandingInputButton', () => {
  it('should render when expanded', () => {
    const wrapper = shallow(
      <ExpandingInputButton
        icon={<MagnifyIcon />}
        expanded={true}
        onFocus={() => {}}
        onBlur={() => {}}
        onClear={() => {}}
        onChange={() => {}}
        placeholder={''}
        value={''}
      />
    );

    const inputButton = wrapper.find('.vs-expanding-input-button');

    expect(inputButton).toHaveLength(1);

    expect(inputButton.contains(<MagnifyIcon />)).toEqual(true);

    expect(inputButton.find('Input').length).toEqual(1);

    expect(inputButton.find('WindowCloseIcon').length).toEqual(1);
  });

  it('should render when not expanded', () => {
    const wrapper = shallow(
      <ExpandingInputButton
        icon={<MagnifyIcon />}
        expanded={false}
        onFocus={() => {}}
        onBlur={() => {}}
        onClear={() => {}}
        onChange={() => {}}
        placeholder={''}
        value={''}
      />
    );

    const inputButton = wrapper.find('.vs-expanding-input-button');

    expect(inputButton).toHaveLength(1);

    expect(inputButton.contains(<MagnifyIcon />)).toEqual(true);

    expect(inputButton.find('Input').length).toEqual(1);

    expect(inputButton.find('WindowCloseIcon').length).toEqual(0);
  });

  it('should call onChange when typing text', () => {
    const mockOnChange = jest.fn();

    const wrapper = shallow(
      <ExpandingInputButton
        onChange={mockOnChange}
        expanded={false}
        onFocus={() => {}}
        onBlur={() => {}}
        onClear={() => {}}
        placeholder={''}
        value={''}
      />
    );

    wrapper.find('Input').simulate('focus');
    wrapper.find('Input').simulate('change', { target: { value: 'test' } });

    expect(mockOnChange.mock.calls).toHaveLength(1);
    expect(mockOnChange.mock.calls[0][0]).toEqual({
      target: { value: 'test' },
    });
  });

  it('should clear text when clicking close button', () => {
    const mockOnClear = jest.fn();

    const wrapper = shallow(
      <ExpandingInputButton
        onClear={mockOnClear}
        value="test"
        expanded={true}
      />
    );

    wrapper.find('Input').simulate('focus');
    wrapper.find('WindowCloseIcon').simulate('click');

    expect(mockOnClear.mock.calls).toHaveLength(1);
  });
});
