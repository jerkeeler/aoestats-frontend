import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import H1 from '../components/typography/H1';
import HR from '../components/typography/HR';
import { Civs } from '../data';
import CivImage from '../components/CivImage';
import { getWinRateClass, percentage } from '../formatting';

const Rate = ({ title, value, textColor }) => (
  <div className="w-full px-6 py-3">
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

  return (
    <Layout location={location} filter={filter}>
      <SEO />
      <H1>{Civs[civInfo.civNum].name}</H1>
      <HR />
      <div className="flex">
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
        <div className="w-3/12"></div>
        <div className="w-6/12"></div>
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
      }
    }
  }
`;

export default Civ;
