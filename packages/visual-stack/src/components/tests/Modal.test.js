import React from 'react';
import { Modal, Header } from '../Modal';
import { mount } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() });

describe('Modal', () => {
  test('should call onBackgroundClick when background is clicked', () => {
    let onBackgroundClickCalls = 0;
    const mockOnBackgroundClick = () => {
      onBackgroundClickCalls += 1;
    };

    const wrapper = mount(
      <Modal onBackgroundClick={ mockOnBackgroundClick }/>
    );

    wrapper.find(Modal).simulate('click');

    expect(onBackgroundClickCalls).toEqual(1);
  });

  test('should not call onBackgroundClick when modal is clicked', () => {
    let onBackgroundClickCalls = 0;
    const mockOnBackgroundClick = () => {
      onBackgroundClickCalls += 1;
    };

    const wrapper = mount(
      <Modal onBackgroundClick={mockOnBackgroundClick}>
        <Header />
      </Modal>
    );

    wrapper.find(Header).simulate('click');

    expect(onBackgroundClickCalls).toEqual(0);
  });
});
