import React from 'react';
import { mount } from 'enzyme';
import { exportExcel } from '../excelUtil';
import { ExcelExportButton } from '../';

jest.mock('../excelUtil');

describe('ExcelExportButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render custom label', () => {
    const expectedLabel = 'custom label';
    const wrapper = mount(<ExcelExportButton label={expectedLabel} />);
    const actualLabel = wrapper.find('button').props().children;
    expect(actualLabel).toEqual(expectedLabel);
  });

  it('should call exportExcel function with defaultValues when its clicked', () => {
    const wrapper = mount(<ExcelExportButton />);
    wrapper.find('button').simulate('click');
    expect(exportExcel.mock.calls).toEqual([[
      { items: [], headers: [], sheetName: 'sheet', fileName: 'data.xlsx' },
    ]]);
  });

  it('should call exportExcel function with values when its clicked', () => {
    const props = {
      items: [{ hello: 1 }],
      headers: ['hello'],
      sheetName: 'example',
      fileName: 'anotherName.xlsx',
    };
    const wrapper = mount(<ExcelExportButton {...props}/>);
    wrapper.find('button').simulate('click');
    expect(exportExcel.mock.calls).toEqual([[props]]);
  });
});
