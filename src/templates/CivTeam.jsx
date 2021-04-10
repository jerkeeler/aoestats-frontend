import { graphql } from 'gatsby';
import React from 'react';
import CivImage from '../components/CivImage';
import CivMapRates from '../components/CivMapRates';
import Layout from '../components/Layout';
import LineGraph from '../components/LineGraph';
import Rate from '../components/Rate';
import SEO from '../components/SEO';
import H1 from '../components/typography/H1';
import HR from '../components/typography/HR';
import { Civs } from '../data';
import {
  CivSeries,
  CURRENT_PATCH,
  Ladder,
  OverTimeSeries,
  SortedOverTimeBuckets,
  SortedPatches,
} from '../defs';
import { getWinRateClass, percentage } from '../formatting';
import { createFilter, getStatsByPatch } from '../utils';

const GraphTitle = ({ children }) => (
  <h3 className="text-xl text-stats-medium mb-3 mt-3 font-bold">{children}</h3>
);

const CivTeam = ({ data, location }) => {
  const filter = createFilter(data);
  const stats = getStatsByPatch(data);

  const newSortedPatches = SortedPatches.filter((patchVal) =>
    Object.keys(stats).includes(patchVal),
  );

  const currentStats = stats[CURRENT_PATCH];
  // const previousStats = stats[PREVIOUS_PATCH];

  const winRatesOverTime =
    currentStats.series[OverTimeSeries.win_rate_over_time];
  const overTimedata = SortedOverTimeBuckets.map((bucket) =>
    percentage(winRatesOverTime[bucket].value),
  );

  const datasets = [
    {
      data: overTimedata,
      label: Civs[currentStats.civNum].name,
      color: 'rgb(36, 209, 248)',
      backgroundColor: 'rgba(36, 209, 248, 0.3)',
    },
    {
      data: Array(newSortedPatches.length).fill(50),
      label: `${filter.eloVal || 'All'} Avg`,
      color: 'rgb(220, 220, 220)',
      backgroundColor: 'rgba(220, 220, 220, 0.3)',
    },
  ];

  const winByPatch = [
    {
      data: newSortedPatches
        .map((patchVal) => stats[patchVal].winRate)
        .map(percentage),
      label: Civs[currentStats.civNum].name,
      color: 'rgb(36, 209, 248)',
      backgroundColor: 'rgba(36, 209, 248, 0.3)',
    },
    {
      data: Array(newSortedPatches.length).fill(50),
      label: `${filter.eloVal || 'All'} Avg`,
      color: 'rgb(220, 220, 220)',
      backgroundColor: 'rgba(220, 220, 220, 0.3)',
    },
  ];

  const playByPatch = [
    {
      data: newSortedPatches
        .map((patchVal) => stats[patchVal].playRate)
        .map(percentage),
      label: Civs[currentStats.civNum].name,
      color: 'rgb(36, 209, 248)',
      backgroundColor: 'rgba(36, 209, 248, 0.3)',
    },
  ];

  return (
    <Layout location={location} filter={filter}>
      <SEO
        title={Civs[currentStats.civNum].name}
        description={`Detailed data and statistics, including win rate and play rate, on the ${
          Civs[currentStats.civNum].name
        } civilization in Age of Empires II in the ${
          Ladder[filter.ladderVal]
        } ladder across ${
          filter.eloVal || 'all'
        } Elo. Current win rate: ${percentage(currentStats.winRate)}%`}
      />
      <H1>{Civs[currentStats.civNum].name}</H1>
      <HR />
      <div className="flex flex-col">
        <div className="w-full flex flex-wrap">
          <div className="w-full lg:w-3/12 flex flex-col items-center">
            <CivImage civId={currentStats.civNum} className="w-32 h-32" />
            <Rate
              title="Win Rate"
              value={percentage(currentStats.winRate)}
              games={currentStats.numWon}
              textColor={`text-${getWinRateClass(currentStats.winRate)}`}
            />
            <Rate
              title="Play Rate"
              value={percentage(currentStats.playRate)}
              games={currentStats.numPlayed}
              textColor="text-stats"
            />
          </div>
          <div className="w-full lg:w-9/12 flex flex-wrap mt-3 lg:mt-0">
            <div className="w-full flex flex-wrap">
              <div className="w-full lg:w-6/12 flex flex-col items-center">
                <GraphTitle>Win Rate vs Game Length</GraphTitle>
                <LineGraph
                  datasets={datasets}
                  labels={SortedOverTimeBuckets}
                  xAxesLabel="game length (minutes)"
                  yAxesLabel="win rate (%)"
                />
              </div>
              <div className="w-full lg:w-6/12 flex flex-col items-center">
                <GraphTitle>Win Rate by Patch</GraphTitle>
                <LineGraph
                  datasets={winByPatch}
                  labels={newSortedPatches}
                  xAxesLabel="patch"
                  yAxesLabel="win rate (%)"
                />
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-full lg:w-6/12 flex flex-col items-center">
                <GraphTitle>Play Rate by Patch</GraphTitle>
                <LineGraph
                  datasets={playByPatch}
                  labels={newSortedPatches}
                  xAxesLabel="patch"
                  yAxesLabel="play rate (%)"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-3">
          <h3 className="text-2xl mb-1">Win Rate by Map</h3>
          <CivMapRates
            filter={filter}
            mapStats={currentStats.series[CivSeries.win_rate_for_maps]}
          />
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($filterId: Int!, $eloVal: String, $ladderVal: Int!, $civNum: Int!) {
    postgres {
      filter: deFilterById(id: $filterId) {
        id
        patchVal
        ladderVal
        eloVal
        combined
      }
      allCivStats: allDeFilters(
        condition: { eloVal: $eloVal, removedAt: null, ladderVal: $ladderVal }
      ) {
        nodes {
          patchVal
          deCivilizationstatsByFilterIdList(condition: { civNum: $civNum }) {
            civNum
            playRate
            winRate
            series
            numWon
            numPlayed
            gamesAnalyzed
            position
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

export default CivTeam;
