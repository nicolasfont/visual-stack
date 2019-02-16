import React from 'react';
import { ExcelExportButton } from '../../src/components/ExcelExport';
import { mount } from 'enzyme';
import { equal } from 'assert';

describe('ExcelExport', () => {
  describe('ExcelExportButton', () => {
    it('should render custom label', () => {
      const label = 'custom label';
      const wrapper = mount(<ExcelExportButton label={label}/>);
      equal(wrapper.find('button').props().children, label);
    });
  });
});
