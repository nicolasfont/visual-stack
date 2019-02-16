import React from 'react';
import { mount } from 'enzyme';

import Card from '../';

describe('<Card />', () => {
  test('should render a tag with children, if given href', () => {
    const content = 'hello';
    const wrapper = mount(<Card href="something">{content}</Card>);
    const aTagChildren = wrapper.find('a').props().children;
    expect(aTagChildren).toEqual(content);
  });
  test('should render div with children by default', () => {
    const content = 'hello';
    const wrapper = mount(<Card>{content}</Card>);
    const aTagChildren = wrapper.find('div').props().children;
    expect(aTagChildren).toEqual(content);
  });

  test('should forward all the props to a tag', () => {
    const href = 'cj.com';
    const fakeProps = { href };
    const wrapper = mount(<Card {...fakeProps}/>);
    const aTagProps = wrapper.find('a').props();
    expect(aTagProps.href).toEqual(href);
  });
});
