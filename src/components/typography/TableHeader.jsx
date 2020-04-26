import React from 'react';

const TableHeader = ({ children, className = '' }) => (
  <tr className={`bg-table-row2 flex w-full py-2 font-bold ${className}`}>
    {children}
  </tr>
);

export default TableHeader;
