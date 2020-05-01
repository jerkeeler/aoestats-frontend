import React from 'react';
import { Link } from 'gatsby';

import { MapsByName } from '../data';
import Table from './typography/Table';
import TableHeader from './typography/TableHeader';
import TableCell from './typography/TableCell';
import TableRow from './typography/TableRow';
import { getWinRateClass, percentage } from '../formatting';
import MapImage from './MapImage';
import { getMapPath } from '../urls';
import TableHeaderCell from './typography/TableHeaderCell';

const MapRow = ({ filter, mapInfo }) => (
  <TableRow>
    <TableCell>
      <MapImage mapNum={mapInfo.mapNum} className="w-16 h-16 mr-2" />{' '}
      <Link
        to={getMapPath(filter, mapInfo.name)}
        className="ml-2 hover:text-primary"
      >
        {mapInfo.displayName}
      </Link>
    </TableCell>
    <TableCell className={`text-${getWinRateClass(mapInfo.winRate)}`}>
      {percentage(mapInfo.winRate)}%
    </TableCell>
  </TableRow>
);

const CivMapRates = ({ filter, mapStats }) => {
  const flatMapWinRates = Object.entries(mapStats).map(([key, value]) => ({
    winRate: value.value,
    name: key,
    displayName: MapsByName[key].displayName,
    mapNum: MapsByName[key].id,
  }));
  flatMapWinRates.sort((a, b) => (a.winRate < b.winRate ? 1 : -1));

  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>Map Name</TableHeaderCell>
        <TableHeaderCell>Win Rate</TableHeaderCell>
      </TableHeader>
      <tbody>
        {flatMapWinRates.map((m) => (
          <MapRow key={m.mapNum} filter={filter} mapInfo={m} />
        ))}
      </tbody>
    </Table>
  );
};

export default CivMapRates;
