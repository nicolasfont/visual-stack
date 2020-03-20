import React from 'react';
import cn from 'classnames';
import './Table.css';

export const TableContainer = ({ className, children, ...restProps }) => (
  <div {...restProps} className={cn('vs-table-container', className)}>
    {children}
  </div>
);

export const TableTitle = ({ className, children, ...restProps }) => (
  <div {...restProps} className={cn('vs-table-title', className)}>
    {children}
  </div>
);

export const Table = ({ className, children, ...restProps }) => (
  <table {...restProps} className={cn('vs-table', className)}>
    {children}
  </table>
);

export const TBody = ({ className, children, ...restProps }) => (
  <tbody {...restProps} className={cn('vs-tbody', className)}>
    {children}
  </tbody>
);

export const THead = ({ className, children, ...restProps }) => (
  <thead {...restProps} className={cn('vs-thead', className)}>
    {children}
  </thead>
);

export const TFoot = ({ className, children, ...restProps }) => (
  <tfoot {...restProps} className={cn('vs-tfoot', className)}>
    {children}
  </tfoot>
);

export const Tr = ({ className, children, ...restProps }) => (
  <tr {...restProps} className={cn('vs-row', className)}>
    {children}
  </tr>
);

const buildCellClasses = (center, className, nowrap, right) => {
  return cn(
    'vs-cell',
    className,
    { 'vs-cell-right': right },
    { 'vs-cell-center': center },
    { 'vs-cell-nowrap': nowrap }
  );
};

export const Th = ({
  center,
  className,
  nowrap,
  right,
  children,
  ...restProps
}) => (
  <th
    {...restProps}
    className={`${buildCellClasses(
      center,
      className,
      nowrap,
      right
    )} vs-table-header`}
  >
    {children}
  </th>
);

export const Td = ({
  center,
  className,
  nowrap,
  right,
  children,
  ...restProps
}) => (
  <td
    {...restProps}
    className={buildCellClasses(center, className, nowrap, right)}
  >
    {children}
  </td>
);
