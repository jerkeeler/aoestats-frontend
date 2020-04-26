import React from 'react';

const TableRow = ({ children, className = '' }) => (
  <tr
    className={`odd:bg-table-row1 even:bg-table-row2
    flex w-full ${className}`}
  >
    {children}
  </tr>
);

export default TableRow;
