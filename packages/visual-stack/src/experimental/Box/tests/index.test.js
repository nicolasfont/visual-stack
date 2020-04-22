import React from 'react';
import Box from '../index';
import Enzyme, { mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Box', () => {
  it('should render children', () => {
    const wrapper = mount(<Box>Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box').text()).toEqual('Lorem ipsum');
  });
  it('should render children with direction column', () => {
    const wrapper = mount(
      <Box direction="column">
        <span>Lorem ipsum</span>
        <button>OK</button>
      </Box>
    );
    expect(wrapper.find('.vs-box.vs-box-direction-column span').text()).toEqual(
      'Lorem ipsum'
    );
    expect(
      wrapper.find('.vs-box.vs-box-direction-column button').text()
    ).toEqual('OK');
  });
  it('should render children with direction row', () => {
    const wrapper = mount(
      <Box direction="row">
        <span>Lorem ipsum</span>
        <button>OK</button>
      </Box>
    );
    expect(wrapper.find('.vs-box.vs-box-direction-row span').text()).toEqual(
      'Lorem ipsum'
    );
    expect(wrapper.find('.vs-box.vs-box-direction-row button').text()).toEqual(
      'OK'
    );
  });
  it('should render with border', () => {
    const wrapper = mount(<Box border>Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-border').text()).toEqual('Lorem ipsum');
  });
  it('should render with padding', () => {
    const wrapper = mount(<Box padding>Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-default').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with padding small', () => {
    const wrapper = mount(<Box padding="small">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-small').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with padding large', () => {
    const wrapper = mount(<Box padding="large">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-large').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with paddingLeft', () => {
    const wrapper = mount(<Box paddingLeft>Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-left-default').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with paddingLeft small', () => {
    const wrapper = mount(<Box paddingLeft="small">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-left-small').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with paddingLeft large', () => {
    const wrapper = mount(<Box paddingLeft="large">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-left-large').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with paddingRight', () => {
    const wrapper = mount(<Box paddingRight>Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-right-default').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with paddingRight small', () => {
    const wrapper = mount(<Box paddingRight="small">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-right-small').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with paddingRight large', () => {
    const wrapper = mount(<Box paddingRight="large">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-right-large').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with paddingTop', () => {
    const wrapper = mount(<Box paddingTop>Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-top-default').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with paddingTop small', () => {
    const wrapper = mount(<Box paddingTop="small">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-top-small').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with paddingTop large', () => {
    const wrapper = mount(<Box paddingTop="large">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-top-large').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with paddingBottom', () => {
    const wrapper = mount(<Box paddingBottom>Lorem ipsum</Box>);
    expect(
      wrapper.find('.vs-box.vs-box-padding-bottom-default').text()
    ).toEqual('Lorem ipsum');
  });
  it('should render with paddingBottom small', () => {
    const wrapper = mount(<Box paddingBottom="small">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-bottom-small').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with paddingBottom large', () => {
    const wrapper = mount(<Box paddingBottom="large">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-padding-bottom-large').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with gap', () => {
    const wrapper = mount(<Box gap>Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-gap-default').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with gap small', () => {
    const wrapper = mount(<Box gap="small">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-gap-small').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with gap large', () => {
    const wrapper = mount(<Box gap="large">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-gap-large').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with alignItems center', () => {
    const wrapper = mount(<Box alignItems="center">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-align-items-center').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with alignItems start', () => {
    const wrapper = mount(<Box alignItems="start">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-align-items-start').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with alignItems end', () => {
    const wrapper = mount(<Box alignItems="end">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-align-items-end').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with justifyContent center', () => {
    const wrapper = mount(<Box justifyContent="center">Lorem ipsum</Box>);
    expect(
      wrapper.find('.vs-box.vs-box-justify-content-center').text()
    ).toEqual('Lorem ipsum');
  });
  it('should render with justifyContent start', () => {
    const wrapper = mount(<Box justifyContent="start">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-justify-content-start').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with justifyContent end', () => {
    const wrapper = mount(<Box justifyContent="end">Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-justify-content-end').text()).toEqual(
      'Lorem ipsum'
    );
  });
  it('should render with justifyContent space-around', () => {
    const wrapper = mount(<Box justifyContent="space-around">Lorem ipsum</Box>);
    expect(
      wrapper.find('.vs-box.vs-box-justify-content-space-around').text()
    ).toEqual('Lorem ipsum');
  });
  it('should render with justifyContent space-between', () => {
    const wrapper = mount(
      <Box justifyContent="space-between">Lorem ipsum</Box>
    );
    expect(
      wrapper.find('.vs-box.vs-box-justify-content-space-between').text()
    ).toEqual('Lorem ipsum');
  });
  it('should render with justifyContent space-evenly', () => {
    const wrapper = mount(<Box justifyContent="space-evenly">Lorem ipsum</Box>);
    expect(
      wrapper.find('.vs-box.vs-box-justify-content-space-evenly').text()
    ).toEqual('Lorem ipsum');
  });
  it('should render with grow', () => {
    const wrapper = mount(<Box grow>Lorem ipsum</Box>);
    expect(wrapper.find('.vs-box.vs-box-grow').text()).toEqual('Lorem ipsum');
  });
  it('should render with arbitrary data-id prop', () => {
    const wrapper = mount(
      <Box data-id="test" id="test">
        Lorem ipsum
      </Box>
    );
    expect(wrapper.find('.vs-box[data-id="test"]').text()).toEqual(
      'Lorem ipsum'
    );
  });
});
