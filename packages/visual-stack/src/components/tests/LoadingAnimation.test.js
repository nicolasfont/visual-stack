import React from 'react';
import { mount } from 'enzyme';
import LoadingAnimation from '../LoadingAnimation';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('LoadingAnimation', () => {
  test('should render with default text', () => {
    const wrapper = mount(<LoadingAnimation />);
    expect(wrapper.find(LoadingAnimation)).toHaveLength(1);
    expect(wrapper.find('div.loading-text').text()).toEqual("Loading...");
  });

  test('should render with loading text from prop', () => {
    const expectedLoadingMessage = "Loading Data...";

    const wrapper = mount(<LoadingAnimation loadingMessage={expectedLoadingMessage}/>);
    expect(wrapper.find(LoadingAnimation)).toHaveLength(1);
    expect(wrapper.find('div.loading-text').text()).toEqual(expectedLoadingMessage);
  });
});
