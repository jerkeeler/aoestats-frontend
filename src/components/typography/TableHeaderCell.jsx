import classnames from 'classnames';
import React from 'react';

const TableHeaderCell = ({ children, onClick, className }) => (
  <th
    className={classnames(
      'flex-grow',
      'flex-1',
      'flex',
      'items-center',
      'px-2',
      'py-3',
      className,
    )}
    onClick={() => onClick && onClick()}
  >
    {children}
  </th>
);

export default TableHeaderCell;
