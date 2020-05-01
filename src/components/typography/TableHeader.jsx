import React from 'react';

const TableHeader = ({ children, className = '' }) => (
  <thead>
    <tr className={`bg-table-row2 flex w-full py-2 font-bold ${className}`}>
      {children}
    </tr>
  </thead>
);

export default TableHeader;
