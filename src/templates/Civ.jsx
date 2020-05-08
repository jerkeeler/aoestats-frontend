import { graphql } from 'gatsby';
import React from 'react';
import CivImage from '../components/CivImage';
import CivMapRates from '../components/CivMapRates';
import Layout from '../components/Layout';
import LineGraph from '../components/LineGraph';
import Rate from '../components/Rate';
import SEO from '../components/SEO';
import TopCivs from '../components/TopCivs';
import H1 from '../components/typography/H1';
import HR from '../components/typography/HR';
import { Civs, CivsByName } from '../data';
import {
  CivSeries,
  Ladder,
  OverTimeSeries,
  SortedOverTimeBuckets,
  SortedPatches,
} from '../defs';
import { getWinRateClass, percentage } from '../formatting';
import { createFilter } from '../utils';

const GraphTitle = ({ children }) => (
  <h3 className="text-xl text-stats-medium mb-3 mt-3 font-bold">{children}</h3>
);

const Civ = ({ data, location }) => {
  const filter = createFilter(data);
  const civInfo = data.postgres.stats;
  const previousStats = data.postgres.previousStats;
  const civWinRates = civInfo.series[CivSeries.win_rate_vs_civs];
  const flatCivWinRates = Object.entries(civWinRates)
    .map(([key, value]) => ({
      winRate: value.value,
      name: key,
      civNum: CivsByName[key].id,
    }))
    .filter((civ) => civInfo.civNum !== civ.civNum);
  flatCivWinRates.sort((a, b) => (a.winRate < b.winRate ? 1 : -1));
  const top5 = flatCivWinRates.slice(0, 5);
  const bottom5 = flatCivWinRates.slice(-5);

  const winRatesOverTime = civInfo.series[OverTimeSeries.win_rate_over_time];
  const overTimedata = SortedOverTimeBuckets.map((bucket) =>
    percentage(winRatesOverTime[bucket].value),
  );

  const datasets = [
    {
      data: overTimedata,
      label: Civs[civInfo.civNum].name,
      color: 'rgb(36, 209, 248)',
      backgroundColor: 'rgba(36, 209, 248, 0.3)',
    },
    {
      data: Array(SortedOverTimeBuckets.length).fill(50),
      label: `${filter.eloVal || 'All'} Avg`,
      color: 'rgb(220, 220, 220)',
      backgroundColor: 'rgba(220, 220, 220, 0.3)',
    },
  ];

  const winByPatch = [
    {
      data: [previousStats.winRate, civInfo.winRate].map(percentage),
      label: Civs[civInfo.civNum].name,
      color: 'rgb(36, 209, 248)',
      backgroundColor: 'rgba(36, 209, 248, 0.3)',
    },
    {
      data: Array(SortedPatches.length).fill(50),
      label: `${filter.eloVal || 'All'} Avg`,
      color: 'rgb(220, 220, 220)',
      backgroundColor: 'rgba(220, 220, 220, 0.3)',
    },
  ];

  const playByPatch = [
    {
      data: [previousStats.playRate, civInfo.playRate].map(percentage),
      label: Civs[civInfo.civNum].name,
      color: 'rgb(36, 209, 248)',
      backgroundColor: 'rgba(36, 209, 248, 0.3)',
    },
  ];

  return (
    <Layout location={location} filter={filter}>
      <SEO
        title={Civs[civInfo.civNum].name}
        description={`Detailed statistics, including win rate and play rate, on the ${
          Civs[civInfo.civNum].name
        } civilization in Age of Empires II in the ${
          Ladder[filter.ladderVal]
        } ladder across ${
          filter.eloVal || 'All'
        } ELOs. Current win rate: ${percentage(civInfo.winRate)}%`}
      />
      <H1>{Civs[civInfo.civNum].name}</H1>
      <HR />
      <div className="flex flex-col">
        <div className="w-full flex flex-wrap">
          <div className="w-full lg:w-3/12 flex flex-col items-center">
            <CivImage civId={civInfo.civNum} className="w-32 h-32" />
            <Rate
              title="Win Rate"
              value={percentage(civInfo.winRate)}
              previousValue={percentage(previousStats.winRate)}
              games={civInfo.numWon}
              textColor={`text-${getWinRateClass(civInfo.winRate)}`}
            />
            <Rate
              title="Play Rate"
              value={percentage(civInfo.playRate)}
              previousValue={percentage(previousStats.playRate)}
              games={civInfo.numPlayed}
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
                  labels={SortedPatches}
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
                  labels={SortedPatches}
                  xAxesLabel="patch"
                  yAxesLabel="play rate (%)"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-wrap">
          <div className="w-full md:w-1/2 md:pr-4">
            <h3 className="text-2xl mb-1">Highest Win Rates Against</h3>
            <TopCivs filter={filter} civs={top5} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <h3 className="text-2xl mb-1">Lowest Win Rates Against</h3>
            <TopCivs filter={filter} civs={bottom5} />
          </div>
        </div>
        <div className="w-full mt-3">
          <h3 className="text-2xl mb-1">Win Rate by Map</h3>
          <CivMapRates
            filter={filter}
            mapStats={civInfo.series[CivSeries.win_rate_for_maps]}
          />
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($filterId: Int!, $civStatsId: Int!, $previousCivStatsId: Int!) {
    postgres {
      filter: deFilterById(id: $filterId) {
        id
        patchVal
        ladderVal
        eloVal
        combined
      }
      stats: deCivilizationstatById(id: $civStatsId) {
        civNum
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
      previousStats: deCivilizationstatById(id: $previousCivStatsId) {
        civNum
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

export default Civ;
