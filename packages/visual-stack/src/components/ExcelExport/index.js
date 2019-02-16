import React from 'react';
import { Button } from '../Button';
import propTypes from 'prop-types';
import { exportExcel } from './excelUtil';

export const ExcelExportButton = ({ label='export', items=[], headers=[], sheetName='sheet', fileName='data.xlsx' }) => {
  return <Button
          type="solid-primary"
          onClick={() => { exportExcel({ items, headers, sheetName, fileName }); }}>
          {label}
        </Button>;
};

ExcelExportButton.propTypes = {
  label: propTypes.string,
  items: propTypes.array,
  headers: propTypes.array,
  sheetName: propTypes.string,
  fileName: propTypes.string,
};
