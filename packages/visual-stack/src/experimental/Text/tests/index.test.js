import React from 'react';
import Text from '../index';
import Enzyme, { mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Text', () => {
  describe('Types', () => {
    it('should render text type default', () => {
      const wrapper = mount(<Text>Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text').text()).toEqual('Lorem ipsum');
    });
    it('should render text type light', () => {
      const wrapper = mount(<Text type="light">Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-type-light').text()).toEqual(
        'Lorem ipsum'
      );
    });
    it('should render text type bold', () => {
      const wrapper = mount(<Text type="bold">Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-type-bold').text()).toEqual(
        'Lorem ipsum'
      );
    });
    it('should render text type small', () => {
      const wrapper = mount(<Text type="small">Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-type-small').text()).toEqual(
        'Lorem ipsum'
      );
    });
    it('should render text type small-light', () => {
      const wrapper = mount(<Text type="small-light">Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-type-small-light').text()).toEqual(
        'Lorem ipsum'
      );
    });
    it('should render text type h1', () => {
      const wrapper = mount(<Text type="h1">Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-type-h1').text()).toEqual(
        'Lorem ipsum'
      );
    });
    it('should render text type h2', () => {
      const wrapper = mount(<Text type="h2">Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-type-h2').text()).toEqual(
        'Lorem ipsum'
      );
    });
    it('should render text type h3', () => {
      const wrapper = mount(<Text type="h3">Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-type-h3').text()).toEqual(
        'Lorem ipsum'
      );
    });
    it('should render text type h4', () => {
      const wrapper = mount(<Text type="h4">Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-type-h4').text()).toEqual(
        'Lorem ipsum'
      );
    });
    it('should render text type h5', () => {
      const wrapper = mount(<Text type="h5">Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-type-h5').text()).toEqual(
        'Lorem ipsum'
      );
    });
    it('should render text type h6', () => {
      const wrapper = mount(<Text type="h6">Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-type-h6').text()).toEqual(
        'Lorem ipsum'
      );
    });
    it('should render text type subheading', () => {
      const wrapper = mount(<Text type="subheading">Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-type-subheading').text()).toEqual(
        'Lorem ipsum'
      );
    });
    it('should render text type link', () => {
      const wrapper = mount(<Text type="link">Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-type-link').text()).toEqual(
        'Lorem ipsum'
      );
    });
  });
  describe('Italic', () => {
    it('should render text italic', () => {
      const wrapper = mount(<Text italic>Lorem ipsum</Text>);

      expect(wrapper.find('.vs-text.vs-text-italic').text()).toEqual(
        'Lorem ipsum'
      );
    });
    it('should render text type h4 and italic', () => {
      const wrapper = mount(
        <Text type="h4" italic>
          Lorem ipsum
        </Text>
      );

      expect(
        wrapper.find('.vs-text.vs-text-type-h4.vs-text-italic').text()
      ).toEqual('Lorem ipsum');
    });
  });
});
