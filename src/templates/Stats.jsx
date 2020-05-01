import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Civs } from '../data';
import Table from '../components/typography/Table';
import TableRow from '../components/typography/TableRow';
import TableCell from '../components/typography/TableCell';
import CivImage from '../components/CivImage';
import { getCivPath } from '../urls';
import TableHeader from '../components/typography/TableHeader';
import { leftPad, getWinRateClass } from '../formatting';
import HR from '../components/typography/HR';
import H1 from '../components/typography/H1';
import { Ladder } from '../defs';
import SortIndicator from '../components/SortIndicator';
import useSort from '../hooks/useSort';
import TableHeaderCell from '../components/typography/TableHeaderCell';
import { createFilter } from '../utils';

const StatRow = ({ filter, civ }) => (
  <TableRow>
    <TableCell>
      <CivImage civId={civ.civNum} className="w-10 h-10" />{' '}
      <Link
        to={getCivPath(filter, civ.name)}
        className="ml-2 hover:text-primary"
      >
        {civ.name}
      </Link>
    </TableCell>
    <TableCell
      className={`font-mono justify-end text-${getWinRateClass(civ.winRate)}`}
    >
      {(civ.winRate * 100).toFixed(2)}%
    </TableCell>
    <TableCell className="font-mono justify-end">
      {(civ.playRate * 100).toFixed(2)}%
    </TableCell>
    <TableCell className="font-mono justify-end">
      {civ.avgGameLength.minutes}:
      {leftPad(`${civ.avgGameLength.seconds || 0}`, 2, '0')}
    </TableCell>
  </TableRow>
);

const Stats = ({ location, data }) => {
  const node = data.postgres.filter;
  const filter = createFilter(data);
  const stats = node.deCivilizationstatsByFilterId.nodes;
  stats.forEach((civStats) => {
    civStats.name = Civs[civStats.civNum].name;
    civStats.uniqueUnit = Civs[civStats.civNum].uniqueUnit;
    civStats.totalSeconds =
      civStats.avgGameLength.minutes * 60 +
      (civStats.avgGameLength.seconds || 0);
  });

  const { onClick, tableStats, sortDirection, sortVal } = useSort({
    initialStats: stats,
  });

  return (
    <Layout location={location} filter={filter}>
      <SEO
        title="Civs"
        description={`Side by side comparisons of Age of Empires II civilizations including win rate, play rate, and age timings for the ${
          Ladder[filter.ladderVal]
        } ladder across ${filter.eloVal || 'All'} ELOs.`}
      />
      <H1>Civ Stats</H1>
      <HR />
      <Table>
        <TableHeader>
          <TableHeaderCell
            className="hover:cursor-pointer"
            onClick={() => onClick('name')}
          >
            Civilization
            <SortIndicator
              className="ml-3"
              sortVal="name"
              currentSortVal={sortVal}
              sortDirection={sortDirection}
            />
          </TableHeaderCell>
          <TableHeaderCell
            className="justify-end hover:cursor-pointer"
            onClick={() => onClick('winRate')}
          >
            <SortIndicator
              className="mr-3"
              sortVal="winRate"
              currentSortVal={sortVal}
              sortDirection={sortDirection}
            />
            Win Rate
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
          {tableStats.map((civ) => (
            <StatRow key={civ.civNum} civ={civ} filter={filter} />
          ))}
        </tbody>
      </Table>
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
        deCivilizationstatsByFilterId {
          nodes {
            winRate
            playRate
            civNum
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

export default Stats;
