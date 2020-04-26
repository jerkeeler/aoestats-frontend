import React from 'react';
import { graphql } from 'gatsby';
import { Line, defaults } from 'react-chartjs-2';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import H1 from '../components/typography/H1';
import HR from '../components/typography/HR';
import { Civs, CivsByName } from '../data';
import CivImage from '../components/CivImage';
import {
  getWinRateClass,
  leftPad,
  numberWithCommas,
  percentage,
} from '../formatting';
import Table from '../components/typography/Table';
import TableRow from '../components/typography/TableRow';
import TableHeader from '../components/typography/TableHeader';
import TableCell from '../components/typography/TableCell';
import { CivSeries, OverTimeSeries, SortedOverTimeBuckets } from '../defs';
import TopCivs from '../components/TopCivs';

defaults.global.animation = false;
defaults.global.defaultFontColor = '#fff';

const Rate = ({ title, value, textColor }) => (
  <div className="w-full px-6 py-3 last:pt-0">
    <div
      className="bg-grays-medium p-3 border border-white flex flex-col
      items-center"
    >
      <h3 className="text-3xl">{title}</h3>
      <p className={`text-2xl ${textColor}`}>{value}%</p>
    </div>
  </div>
);

const Civ = ({ data, location }) => {
  const node = data.postgres.filter;
  const filter = {
    combined: node.combined,
    patchVal: node.patchVal,
    eloVal: node.eloVal,
    ladderVal: node.ladderVal,
  };
  const civInfo = data.postgres.stats;
  const civWinRates = civInfo.series[CivSeries.win_rate_vs_civs];
  const flatRates = Object.entries(civWinRates)
    .map(([key, value]) => ({
      winRate: value.value,
      name: key,
      civNum: CivsByName[key].id,
    }))
    .filter((civ) => civInfo.civNum !== civ.civNum);
  flatRates.sort((a, b) => (a.winRate < b.winRate ? 1 : -1));
  const top5 = flatRates.slice(0, 5);
  const bottom5 = flatRates.slice(-5);

  const winRatesOverTime = civInfo.series[OverTimeSeries.win_rate_over_time];
  const overTimedata = SortedOverTimeBuckets.map((bucket) =>
    percentage(winRatesOverTime[bucket].value),
  );

  const graphData = {
    labels: SortedOverTimeBuckets,
    datasets: [
      {
        label: Civs[civInfo.civNum].name,
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(36, 209, 248, 0.3)',
        borderColor: 'rgb(36, 209, 248)',
        hoverBackgroundColor: 'rgb(36, 209, 248)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(36, 209, 248)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(36, 209, 248)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: overTimedata,
      },
      {
        label: `${filter.eloVal || 'All'} Avg`,
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(220, 220, 220, 0.3)',
        borderColor: 'rgb(220, 220, 220)',
        hoverBackgroundColor: 'rgb(220, 220, 220)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(220, 220, 220)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(220, 220, 220)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: Array(SortedOverTimeBuckets.length).fill(50),
      },
    ],
  };
  const graphOptions = {
    animation: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'win rate (%)',
          },
          ticks: {
            maxTicksLimit: 6,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'game length (minutes)',
          },
        },
      ],
    },
  };

  const legendOptions = {
    position: 'bottom',
    fontColor: '#fff',
  };

  return (
    <Layout location={location} filter={filter}>
      <SEO />
      <H1>{Civs[civInfo.civNum].name}</H1>
      <HR />
      <div className="flex flex-col">
        <div className="w-full flex">
          <div className="w-3/12 flex flex-col items-center">
            <CivImage civId={civInfo.civNum} className="w-32 h-32" />
            <Rate
              title="Win Rate"
              value={percentage(civInfo.winRate)}
              textColor={`text-${getWinRateClass(civInfo.winRate)}`}
            />
            <Rate
              title="Play Rate"
              value={percentage(civInfo.playRate)}
              textColor="text-stats"
            />
          </div>
          <div className="w-3/12 pr-3">
            <Table>
              <thead>
                <TableHeader>
                  <TableCell border={false}>Stat</TableCell>
                  <TableCell border={false}>Value</TableCell>
                </TableHeader>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>Game Length</TableCell>
                  <TableCell className="font-mono">
                    {civInfo.avgGameLength.minutes}:
                    {leftPad(`${civInfo.avgGameLength.seconds || 0}`, 2, '0')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Games Won</TableCell>
                  <TableCell className="font-mono">
                    {numberWithCommas(civInfo.numWon)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Games Analyzed</TableCell>
                  <TableCell className="font-mono">
                    {numberWithCommas(civInfo.gamesAnalyzed)}
                  </TableCell>
                </TableRow>
              </tbody>
            </Table>
          </div>
          <div className="w-6/12 flex flex-col items-center">
            <h3 className="text-xl text-stats-medium mb-3 font-bold">
              Win Rate vs Game Length
            </h3>
            <Line
              data={graphData}
              options={graphOptions}
              legend={legendOptions}
            />
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/2 pr-4">
            <h3 className="text-2xl mb-1">Highest Win Rates Against</h3>
            <TopCivs filter={filter} civs={top5} />
          </div>
          <div className="w-1/2 pl-4">
            <h3 className="text-2xl mb-1">Lowest Win Rates Against</h3>
            <TopCivs filter={filter} civs={bottom5} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($filterId: Int!, $civStatsId: Int!) {
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
    }
  }
`;

export default Civ;
