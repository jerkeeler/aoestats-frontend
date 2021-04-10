import { graphql, Link } from 'gatsby';
import React from 'react';
import CivImage from '../components/CivImage';
import Layout from '../components/Layout';
import MapImage from '../components/MapImage';
import Rate from '../components/Rate';
import SEO from '../components/SEO';
import SortIndicator from '../components/SortIndicator';
import H1 from '../components/typography/H1';
import HR from '../components/typography/HR';
import Table from '../components/typography/Table';
import TableCell from '../components/typography/TableCell';
import TableHeader from '../components/typography/TableHeader';
import TableHeaderCell from '../components/typography/TableHeaderCell';
import TableRow from '../components/typography/TableRow';
import { CivsByName, Maps } from '../data';
import { Ladder, MapSeries } from '../defs';
import { getWinRateClass, percentage } from '../formatting';
import useSort from '../hooks/useSort';
import useStore from '../hooks/useStore';
import { getCivPath } from '../urls';
import { createFilter } from '../utils';

const StatsRow = ({ civData, filter }) => (
  <TableRow>
    <TableCell>
      <CivImage civId={civData.id} className="w-10 h-10" />
      <Link
        to={getCivPath(filter, civData.name)}
        className="ml-2 hover:text-primary"
      >
        {civData.name}
      </Link>
    </TableCell>
    <TableCell
      className={`font-mono justify-end text-${getWinRateClass(
        civData.winRate,
      )}`}
    >
      {percentage(civData.winRate)}%
    </TableCell>
    <TableCell className="font-mono justify-end">
      {percentage(civData.playRate)}%
    </TableCell>
  </TableRow>
);

const MapPage = ({ data, location }) => {
  const filter = createFilter(data);
  const mapStats = data.postgres.stats;
  const previousMapStats = data.postgres.previousStats;
  const mapInfo = Maps[mapStats.mapNum];
  const civData = [];
  Object.entries(mapStats.series[MapSeries.win_rate_for_civs]).forEach(
    ([key, value]) => {
      civData.push({
        winRate: value.value,
        playRate: mapStats.series[MapSeries.play_rate_for_civs][key].value,
        ...CivsByName[key],
      });
    },
  );

  const storeValue = useStore();
  const { onClick, tableStats, sortDirection, sortVal } = useSort({
    initialStats: civData,
    initialSortVal: storeValue.mapCivStatsSortVal,
    initialSortDir: storeValue.mapCivStatsSortDir,
    setContextSortVal: storeValue.setMapCivStatsSortVal,
    setContextSortDir: storeValue.setMapCivStatsSortDir,
  });

  return (
    <Layout filter={filter} location={location}>
      <SEO
        title={mapInfo.displayName}
        description={`Arabia: data and statistics, including civ win rates and play rates, for the map ${
          mapInfo.displayName
        } and ladder ${Ladder[filter.ladderVal]} across ${
          filter.eloVal || 'all'
        } Elo.`}
      />
      <H1>{mapInfo.displayName}</H1>
      {previousMapStats === null && <h3>New to map pool!</h3>}
      <HR />
      <div className="flex flex-wrap">
        <div className="flex flex-col items-center w-full md:w-3/12">
          <MapImage mapNum={mapInfo.id} className="w-32 h-32 mb-3" />
          <Rate
            title="Play Rate"
            value={percentage(mapStats.playRate)}
            games={mapStats.numPlayed}
            textColor="text-stats"
          />
        </div>
        <div className="w-full md:w-9/12">
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
            </TableHeader>
            <tbody>
              {tableStats.map((data) => (
                <StatsRow key={data.id} civData={data} filter={filter} />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($filterId: Int!, $mapStatsId: Int!, $previousMapStatsId: Int!) {
    postgres {
      filter: deFilterById(id: $filterId) {
        id
        patchVal
        ladderVal
        eloVal
        combined
      }
      stats: deMapstatById(id: $mapStatsId) {
        mapNum
        playRate
        winRate
        series
        numWon
        numPlayed
        gamesAnalyzed
        avgGameLength {
          seconds
          minutes
        }
      }
      previousStats: deMapstatById(id: $previousMapStatsId) {
        mapNum
        playRate
        winRate
        series
        numWon
        numPlayed
        gamesAnalyzed
        avgGameLength {
          seconds
          minutes
        }
      }
    }
  }
`;

export default MapPage;
