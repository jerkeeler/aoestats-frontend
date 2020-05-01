import React from 'react';
import { Link } from 'gatsby';

import { getCivPath } from '../urls';
import TableRow from './typography/TableRow';
import TableCell from './typography/TableCell';
import TableHeader from './typography/TableHeader';
import Table from './typography/Table';
import CivImage from './CivImage';
import { getWinRateClass } from '../formatting';
import TableHeaderCell from './typography/TableHeaderCell';

const CivRow = ({ filter, civ }) => (
  <TableRow>
    <TableCell>
      <CivImage civId={civ.civNum} className="w-10 h-10 inline-block" />
      <Link
        to={getCivPath(filter, civ.name)}
        className="ml-2 hover:text-primary"
      >
        {civ.name}
      </Link>
    </TableCell>
    <TableCell className={`font-mono text-${getWinRateClass(civ.winRate)}`}>
      <span>{(civ.winRate * 100).toFixed(2)}%</span>
    </TableCell>
  </TableRow>
);

const TopCivs = ({ filter, civs }) => (
  <Table>
    <TableHeader>
      <TableHeaderCell>Civilization</TableHeaderCell>
      <TableHeaderCell>Win Rate</TableHeaderCell>
    </TableHeader>
    <tbody>
      {civs.map((civ) => (
        <CivRow key={civ.civNum} civ={civ} filter={filter} />
      ))}
    </tbody>
  </Table>
);

export default TopCivs;
