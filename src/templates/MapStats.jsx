import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Ladder } from '../defs';
import H1 from '../components/typography/H1';
import MapCard from '../components/MapCard';
import { Maps } from '../data';
import HR from '../components/typography/HR';
import Table from '../components/typography/Table';
import TableHeader from '../components/typography/TableHeader';
import TableCell from '../components/typography/TableCell';
import TableRow from '../components/typography/TableRow';
import { leftPad, percentage } from '../formatting';
import MapImage from '../components/MapImage';
import { getMapPath } from '../urls';
import useSort from '../hooks/useSort';
import SortIndicator from '../components/SortIndicator';
import TableHeaderCell from '../components/typography/TableHeaderCell';
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

  const { onClick, tableStats, sortVal, sortDirection } = useSort({
    initialStats: mapStats,
  });

  return (
    <Layout filter={filter} location={location}>
      <SEO
        title="Maps"
        description={`Side by side comparisons of Age of Empires II civilizations by Map, including win rate, 
        play rate, and age timings for the ${
          Ladder[filter.ladderVal]
        } ladder across ${filter.eloVal || 'All'} ELOs.`}
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
  query($filterId: Int!, $previousFilterId: Int!) {
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
      previousFilter: deFilterById(id: $previousFilterId) {
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
