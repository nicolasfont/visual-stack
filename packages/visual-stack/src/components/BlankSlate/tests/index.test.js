import React from 'react';
import * as R from 'ramda';
import { mount } from 'enzyme';
import {
  BlankSlate,
  PrimaryActionButton,
  SecondaryActionButton,
  Description,
} from '../';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('BlankSlate Description', () => {
  const el = document.createElement('div');
  document.body.appendChild(el);

  test('should render', () => {
    const wrapper = mount(<Description> description </Description>);
    expect(wrapper.find(Description).length).toEqual(1);
  });

  test('should contain description text', () => {
    const wrapper = mount(<Description>description text</Description>);
    expect(wrapper.find(Description).text()).toEqual('description text');
  });
});

describe('BlankSlate PrimaryActionButton', () => {
  const el = document.createElement('div');
  document.body.appendChild(el);

  test('should have a label', () => {
    const wrapper = mount(<PrimaryActionButton label="a button" />);
    const button = wrapper.find(PrimaryActionButton);
    expect(button.length).toEqual(1);
    expect(button.text()).toEqual('a button');
  });

  test('should respond to clicks', () => {
    const clickWatcher = { clickCount: 0 };
    const clickHandler = () => {
      clickWatcher.clickCount += 1;
    };
    const wrapper = mount(
      <PrimaryActionButton label="a button" handler={clickHandler} />
    );
    const button = wrapper.find('button.vs-bs-button-primary');
    button.simulate('click');
    expect(clickWatcher.clickCount).toEqual(1);
  });
});

describe('BlankSlate SecondaryActionButton', () => {
  const el = document.createElement('div');
  document.body.appendChild(el);

  test('should have a label', () => {
    const wrapper = mount(<SecondaryActionButton label="a button" />);
    const button = wrapper.find(SecondaryActionButton);
    expect(button.length).toEqual(1);
    expect(button.text()).toEqual('a button');
  });

  test('should respond to clicks', () => {
    const clickWatcher = { clickCount: 0 };
    const clickHandler = () => {
      clickWatcher.clickCount += 1;
    };
    const wrapper = mount(
      <SecondaryActionButton label="a button" handler={clickHandler} />
    );
    const button = wrapper.find('button');
    button.simulate('click');
    expect(clickWatcher.clickCount).toEqual(1);
  });
});

describe('BlankSlate', () => {
  const el = document.createElement('div');
  document.body.appendChild(el);

  test('should render', () => {
    const wrapper = mount(<BlankSlate title="title" />);
    expect(wrapper.find(BlankSlate).length).toEqual(1);
    expect(
      wrapper.find(<h1 className="vs-bs-title">"You have no content."</h1>)
    );
  });

  test('should render container, image, and title', () => {
    const wrapper = mount(<BlankSlate />);
    expect(wrapper.find('.vs-bs-container').length).toEqual(1);
    expect(wrapper.find('.vs-bs-img').length).toEqual(1);
    expect(wrapper.find('.vs-bs-title').length).toEqual(1);
    expect(wrapper.find(<h1 className="vs-bs-title">"title"</h1>));
  });

  test('should render a primary action button', () => {
    const wrapper = mount(
      <BlankSlate>
        <PrimaryActionButton label="primary button" />
      </BlankSlate>
    );
    expect(wrapper.find(PrimaryActionButton).length).toEqual(1);
  });

  test('should render a primary action button', () => {
    const wrapper = mount(
      <BlankSlate>
        <SecondaryActionButton label="secondary button" />
      </BlankSlate>
    );
    expect(wrapper.find(SecondaryActionButton).length).toEqual(1);
  });
});
