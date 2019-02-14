import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../Spinner';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() });

describe('Spinner', () => {
  test('should render with default small size', () => {
    const shallowWrapper = shallow(<Spinner />);
    expect(shallowWrapper.hasClass('vs-spinner')).toEqual(true);
    expect(shallowWrapper.hasClass('vs-spinner-small')).toEqual(true);
  });

  test('should render with large size', () => {
    const shallowWrapper = shallow(<Spinner size="large" />);
    expect(shallowWrapper.hasClass('vs-spinner')).toEqual(true);
    expect(shallowWrapper.hasClass('vs-spinner-large')).toEqual(true);
  });

  test('should render with extra-large size', () => {
    const shallowWrapper = shallow(<Spinner size="extra-large" />);
    expect(shallowWrapper.hasClass('vs-spinner')).toEqual(true);
    expect(shallowWrapper.hasClass('vs-spinner-extra-large')).toEqual(true);
  });
});
