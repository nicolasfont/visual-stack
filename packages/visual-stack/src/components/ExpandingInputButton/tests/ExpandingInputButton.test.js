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
        expanded={true}
        onFocus={() => {}}
        onBlur={() => {}}
        onClear={() => {}}
        onChange={() => {}}
        placeholder={'Enter search query'}
        value={''}
      />
    );

    const inputButton = wrapper.find('.expanding-input-button');

    expect(inputButton).toHaveLength(1);

    expect(
      inputButton.contains(<MagnifyIcon className="magnify-icon" />)
    ).toEqual(true);

    expect(
      inputButton
        .debug()
        .indexOf(
          '<Input type="text" onChange={[Function: onChange]} value="" placeholder="Enter search query" />'
        ) > -1
    ).toEqual(true);

    expect(
      inputButton
        .debug()
        .indexOf(
          '<WindowCloseIcon className="window-close-icon" onClick={[Function: onClear]} />'
        ) > -1
    ).toEqual(true);

    expect(inputButton.debug().indexOf('Enter search query') > -1).toEqual(
      true
    );
  });

  it('should render when not expanded', () => {
    const wrapper = shallow(
      <ExpandingInputButton
        expanded={false}
        onFocus={() => {}}
        onBlur={() => {}}
        onClear={() => {}}
        onChange={() => {}}
        placeholder={''}
        value={''}
      />
    );

    const inputButton = wrapper.find('.expanding-input-button');

    expect(inputButton).toHaveLength(1);

    expect(
      inputButton.contains(<MagnifyIcon className="magnify-icon" />)
    ).toEqual(true);

    expect(
      inputButton
        .debug()
        .indexOf(
          '<Input type="text" onChange={[Function: onChange]} value="" placeholder="" />'
        ) > -1
    ).toEqual(true);

    expect(
      inputButton
        .debug()
        .indexOf(
          '<WindowCloseIcon className="window-close-icon" onClick={[Function: onClear]} />'
        )
    ).toEqual(-1);
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
