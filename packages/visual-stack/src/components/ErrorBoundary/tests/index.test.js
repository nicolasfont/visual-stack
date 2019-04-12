import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { withErrorBoundary } from '../';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const suppressError = () => {
  // eslint-disable-next-line no-console
  console.error = () => {};
};

describe('ErrorBoundary', () => {
  it('should render an error message', () => {
    suppressError();
    const BadComponent = () => <div>{undefined.map}</div>;
    const ErrorBoundedComponent = withErrorBoundary(BadComponent);
    const wrapper = mount(<ErrorBoundedComponent />);
    expect(wrapper.text()).toEqual('Something went wrong.');
  });

  it('should render the component if there is no exception', () => {
    const GoodComponent = () => <div>Good</div>;
    const ErrorBoundedComponent = withErrorBoundary(GoodComponent);
    const wrapper = mount(<ErrorBoundedComponent />);
    expect(wrapper.text()).toEqual('Good');
  });
});
