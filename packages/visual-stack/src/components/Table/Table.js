import React from 'react';
import cn from 'classnames';
import './Table.css';

export const TableContainer = ({ className, children, ...restProps }) => (
  <div className={cn('vs-table-container', className)} {...restProps}>
    {children}
  </div>
);

export const TableTitle = ({ className, children, ...restProps }) => (
  <div className={cn('vs-table-title', className)} {...restProps}>
    {children}
  </div>
);

export const Table = ({ className, children, ...restProps }) => (
  <table className={cn('vs-table', className)} {...restProps}>
    {children}
  </table>
);

export const TBody = ({ className, children, ...restProps }) => (
  <tbody className={cn('vs-tbody', className)} {...restProps}>
    {children}
  </tbody>
);

export const THead = ({ className, children, ...restProps }) => (
  <thead className={cn('vs-thead', className)} {...restProps}>
    {children}
  </thead>
);

export const TFoot = ({ className, children, ...restProps }) => (
  <tfoot className={cn('vs-tfoot', className)} {...restProps}>
    {children}
  </tfoot>
);

export const Tr = ({ className, children, ...restProps }) => (
  <tr className={cn('vs-row', className)} {...restProps}>
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
    className={`${buildCellClasses(
      center,
      className,
      nowrap,
      right
    )} vs-table-header`}
    {...restProps}
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
    className={buildCellClasses(center, className, nowrap, right)}
    {...restProps}
  >
    {children}
  </td>
);
