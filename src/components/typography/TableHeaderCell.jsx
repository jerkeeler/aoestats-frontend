import React from 'react';
import TableCell from './TableCell';

const TableHeaderCell = (props) => (
  <TableCell border={false} {...props}>
    {props.children}
  </TableCell>
);

export default TableHeaderCell;
