import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

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

const SortIndicator = ({
  sortVal,
  currentSortVal,
  sortDirection,
  className = '',
}) => {
  const icon = sortDirection === 1 ? faCaretUp : faCaretDown;
  if (sortVal !== currentSortVal) return null;
  return <FontAwesomeIcon icon={icon} size="sm" className={className} />;
};

const Stats = ({ location, data }) => {
  const node = data.postgres.filter;
  const filter = {
    combined: node.combined,
    patchVal: node.patchVal,
    eloVal: node.eloVal,
    ladderVal: node.ladderVal,
  };
  const stats = node.deCivilizationstatsByFilterId.nodes;
  stats.forEach((civStats) => {
    civStats.name = Civs[civStats.civNum].name;
    civStats.uniqueUnit = Civs[civStats.civNum].uniqueUnit;
    civStats.totalSeconds =
      civStats.avgGameLength.minutes * 60 +
      (civStats.avgGameLength.seconds || 0);
  });
  stats.sort((a, b) => (a.name < b.name ? -1 : 1));

  const [tableStats, setTableStats] = useState(stats.concat());
  const [sortDirection, setSortDirection] = useState(-1);
  const [sortVal, setSortVal] = useState('name');

  const onClick = (newSortVal) => {
    let newSortDirection = sortDirection;
    if (newSortVal !== sortVal) newSortDirection = 1;
    else newSortDirection *= -1;
    setSortVal(newSortVal);
    setSortDirection(newSortDirection);

    tableStats.sort((a, b) =>
      a[newSortVal] < b[newSortVal] ? newSortDirection : -1 * newSortDirection,
    );
    setTableStats(tableStats.concat());
  };

  return (
    <Layout location={location} filter={filter}>
      <SEO
        title="Stats"
        description={`Side by side comparisons of Age of Empires II civilizations including win rate, play rate, and age timings for the ${
          Ladder[filter.ladderVal]
        } ladder across ${filter.eloVal || 'All'} ELOs.`}
      />
      <H1>Aggregate Civ Stats</H1>
      <HR />
      <Table>
        <thead className="font-bold">
          <TableHeader>
            <TableCell
              className="hover:cursor-pointer"
              border={false}
              onClick={() => onClick('name')}
            >
              Civilization
              <SortIndicator
                className="ml-3"
                sortVal="name"
                currentSortVal={sortVal}
                sortDirection={sortDirection}
              />
            </TableCell>
            <TableCell
              className="justify-end hover:cursor-pointer"
              border={false}
              onClick={() => onClick('winRate')}
            >
              <SortIndicator
                className="mr-3"
                sortVal="winRate"
                currentSortVal={sortVal}
                sortDirection={sortDirection}
              />
              Win Rate
            </TableCell>
            <TableCell
              className="justify-end hover:cursor-pointer"
              border={false}
              onClick={() => onClick('playRate')}
            >
              <SortIndicator
                className="mr-3"
                sortVal="playRate"
                currentSortVal={sortVal}
                sortDirection={sortDirection}
              />
              Play Rate
            </TableCell>
            <TableCell
              className="justify-end hover:cursor-pointer"
              border={false}
              onClick={() => onClick('totalSeconds')}
            >
              <SortIndicator
                className="mr-3"
                sortVal="totalSeconds"
                currentSortVal={sortVal}
                sortDirection={sortDirection}
              />
              Game Length
            </TableCell>
          </TableHeader>
        </thead>
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
