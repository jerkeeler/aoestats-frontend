import React from 'react';

const TableCell = ({
  children,
  className = '',
  border = true,
  onClick = null,
}) => (
  <td
    className={`flex-grow flex-1 flex items-center px-2 py-3 ${
      border ? 'border-t' : ''
    } border-table-border ${className}`}
    onClick={() => onClick && onClick()}
  >
    {children}
  </td>
);

export default TableCell;
