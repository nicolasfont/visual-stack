import React from 'react';
import Enzyme, { mount } from 'enzyme';
import * as uut from '../';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const BadComponent = _ => null;

describe('withErrorBoundary', () => {
  it('should render an error message', () => {
    const ErrorBoundedComponent = uut.withErrorBoundary(BadComponent);
    const wrapper = mount(<ErrorBoundedComponent />);
    wrapper.find(BadComponent).simulateError(new Error('fail!'));

    expect(wrapper.text()).toEqual('Something went wrong.');
  });

  it('should render the component if there is no exception', () => {
    const GoodComponent = () => <div>Good</div>;
    const ErrorBoundedComponent = uut.withErrorBoundary(GoodComponent);
    const wrapper = mount(<ErrorBoundedComponent />);

    expect(wrapper.text()).toEqual('Good');
  });
});

describe('ErrorBoundary', () => {
  test('works in happy path', () => {
    const wrapper = mount(
      <uut.ErrorBoundary>
        <div id="expected" />
      </uut.ErrorBoundary>
    );

    expect(wrapper.find('#expected')).toHaveLength(1);
  });

  test('uses error renderer', () => {
    const wrapper = mount(
      <uut.ErrorBoundary errorRenderer={() => <div id="expected" />}>
        <BadComponent />
      </uut.ErrorBoundary>
    );

    wrapper.find(BadComponent).simulateError(new Error('fail!'));

    expect(wrapper.find('#expected')).toHaveLength(1);
  });

  describe('onError', () => {
    test('passes error to onError', () => {
      expect.hasAssertions();
      const err = new Error('fail');

      let spy = false;
      const wrapper = mount(
        <uut.ErrorBoundary
          onError={err => {
            spy = err;
          }}
        >
          <BadComponent {...{ err }} />
        </uut.ErrorBoundary>
      );

      wrapper.find(BadComponent).simulateError(err);

      expect(spy).toEqual(err);
    });

    test('uses recoveries', () => {
      expect.hasAssertions();
      const err = new Error('fail');

      let spy = false;

      const wrapper = mount(
        <uut.ErrorBoundary
          onError={(err, recoveries) => {
            recoveries.recover(err);
          }}
          recoveries={{
            recover(err) {
              spy = err;
            },
          }}
        >
          <BadComponent />
        </uut.ErrorBoundary>
      );

      wrapper.find(BadComponent).simulateError(err);

      expect(spy).toEqual(err);
    });
  });
});
