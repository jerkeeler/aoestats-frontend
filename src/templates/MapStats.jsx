import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import MapCard from '../components/MapCard';
import MapImage from '../components/MapImage';
import SEO from '../components/SEO';
import SortIndicator from '../components/SortIndicator';
import H1 from '../components/typography/H1';
import HR from '../components/typography/HR';
import Table from '../components/typography/Table';
import TableCell from '../components/typography/TableCell';
import TableHeader from '../components/typography/TableHeader';
import TableHeaderCell from '../components/typography/TableHeaderCell';
import TableRow from '../components/typography/TableRow';
import { Maps } from '../data';
import { Ladder } from '../defs';
import { leftPad, percentage } from '../formatting';
import useSort from '../hooks/useSort';
import useStore from '../hooks/useStore';
import { getMapPath } from '../urls';
import { createFilter } from '../utils';

const StatsRow = ({ mapStats, filter }) => (
  <TableRow>
    <TableCell>
      <MapImage mapNum={mapStats.id} className="w-16 h-16" />
      <Link
        to={getMapPath(filter, mapStats.name)}
        className="ml-3 hover:text-primary"
      >
        {mapStats.displayName}
      </Link>
    </TableCell>
    <TableCell className="font-mono justify-end">
      {percentage(mapStats.playRate)}%
    </TableCell>
    <TableCell className="font-mono justify-end">
      {mapStats.avgGameLength.minutes}:
      {leftPad(`${mapStats.avgGameLength.seconds || 0}`, 2, '0')}
    </TableCell>
  </TableRow>
);

const MapStats = ({ data, location }) => {
  const filter = createFilter(data);
  const node = data.postgres.filter;
  const mapStats = node.deMapstatsByFilterId.nodes.concat().map((m) => ({
    ...m,
    ...Maps[m.mapNum],
    totalSeconds: m.avgGameLength.minutes * 60 + (m.avgGameLength.seconds || 0),
  }));
  mapStats.sort((a, b) => (a.name > b.name ? 1 : -1));

  const storeValue = useStore();
  const { onClick, tableStats, sortVal, sortDirection } = useSort({
    initialStats: mapStats,
    initialSortVal: storeValue.mapStatsSortVal,
    initialSortDir: storeValue.mapStatsSortDir,
    setContextSortVal: storeValue.setMapStatsSortVal,
    setContextSortDir: storeValue.setMapStatsSortDir,
  });

  return (
    <Layout filter={filter} location={location}>
      <SEO
        title="Maps"
        description={`Side by side comparisons of Age of Empires II civilizations by Map, including win rate,
        play rate, and age timings for the ${
          Ladder[filter.ladderVal]
        } ladder across ${filter.eloVal || 'all'} Elo.`}
      />
      <H1>Map Stats</H1>
      <HR />
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center">
        {mapStats.map((mapStat) => (
          <MapCard mapInfo={mapStat} filter={filter} key={mapStat.mapNum} />
        ))}
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableHeaderCell
              onClick={() => onClick('name')}
              className="hover:cursor-pointer"
            >
              Map
              <SortIndicator
                className="ml-3"
                sortVal="name"
                currentSortVal={sortVal}
                sortDirection={sortDirection}
              />
            </TableHeaderCell>
            <TableHeaderCell
              className="justify-end hover:cursor-pointer"
              onClick={() => onClick('playRate')}
            >
              <SortIndicator
                className="mr-3"
                sortVal="playRate"
                currentSortVal={sortVal}
                sortDirection={sortDirection}
              />
              Play Rate
            </TableHeaderCell>
            <TableHeaderCell
              className="justify-end hover:cursor-pointer"
              onClick={() => onClick('totalSeconds')}
            >
              <SortIndicator
                className="mr-3"
                sortVal="totalSeconds"
                currentSortVal={sortVal}
                sortDirection={sortDirection}
              />
              Game Length
            </TableHeaderCell>
          </TableHeader>
          <tbody>
            {tableStats.map((mapStat) => (
              <StatsRow
                key={mapStat.mapNum}
                mapStats={mapStat}
                filter={filter}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($filterId: Int!) {
    postgres {
      filter: deFilterById(id: $filterId) {
        id
        patchVal
        ladderVal
        eloVal
        combined
        deMapstatsByFilterId {
          nodes {
            winRate
            playRate
            mapNum
            series
            numPlayed
            avgGameLength {
              seconds
              minutes
            }
          }
        }
      }
    }
  }
`;

export default MapStats;
