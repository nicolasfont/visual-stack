import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { ChoiceInput, Field } from '../Form';

describe('Form', () => {
  describe('Field', () => {
    it('should render required sign when field is required', () => {
      const wrapper = mount(<Field required />);
      expect(wrapper.find('span.form-group-required-sign')).toHaveLength(1);
    });

    it('should not render required sign when field is not required', () => {
      const wrapper = mount(<Field />);
      expect(wrapper.find('span.form-group-required-sign')).toHaveLength(0);
    });
  });

  describe('Choice Input', () => {
    it('should render required sign when field is required', () => {
      const wrapper = mount(<ChoiceInput required />);
      expect(wrapper.find('span.form-group-required-sign')).toHaveLength(1);
    });

    it('should not render required sign when field is not required', () => {
      const wrapper = mount(<ChoiceInput />);
      expect(wrapper.find('span.form-group-required-sign')).toHaveLength(0);
    });
  });
});
