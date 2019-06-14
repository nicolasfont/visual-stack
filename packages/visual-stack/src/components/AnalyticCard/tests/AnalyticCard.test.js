import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { AnalyticCard } from '../';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('analytic card', () => {
  it('should pass in onClick if given and have vs-analytic-card-clickable classname', () => {
    const onClick = jest.fn();
    const wrapper = mount(<AnalyticCard onClick={onClick} />);
    wrapper
      .find('div.vs-analytic-card-clickable')
      .props()
      .onClick();
    expect(onClick.mock.calls).toHaveLength(1);
  });
  it('should render children that are passed in', () => {
    const child = <div>i am baby</div>;
    const wrapper = mount(<AnalyticCard children={child} />);
    expect(wrapper.find('div.vs-analytic-card').props().children).toEqual(
      child
    );
  });
  it('should not have vs-analytic-card-clickable classname when no onclicks are passed in', () => {
    const wrapper = mount(<AnalyticCard />);
    expect(wrapper.find('div.vs-analytic-card-clickable')).toEqual({});
  });
});
