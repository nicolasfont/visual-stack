import React from 'react';
import { mount } from 'enzyme';
import {Modal} from "../Modal";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('Modal', () => {
  it('should call onEscapeKeyUp when escape key pressed', () => {
    //given

    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    let removeWasCalled = false;
    document.removeEventListener = jest.fn((event, cb) => {
      removeWasCalled = true;
    });

    const fakeKeyFunction = jest.fn();
    const wrapper = mount(<Modal onEscapeKeyUp={fakeKeyFunction} />);

    //when
    map.keyup({ keyCode: 27 });
    wrapper.unmount();

    //then
    expect(fakeKeyFunction).toHaveBeenCalled();
    expect(removeWasCalled).toBe(true);
  });
});
