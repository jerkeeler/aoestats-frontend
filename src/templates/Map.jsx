import React from 'react';
import { graphql } from 'gatsby';

import { Maps } from '../data';
import Layout from '../components/Layout';

const MapPage = ({ data, filter }) => (
  <Layout filter={filter}>
    <h1>{Maps[data.postgres.stats.mapNum]}</h1>
  </Layout>
);

export const query = graphql`
  query($filterId: Int!, $mapStatsId: Int!) {
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
    }
  }
`;

export default MapPage;
