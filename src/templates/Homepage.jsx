import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { Civs } from '../data';
import SEO from '../components/SEO';
import CivCard from '../components/CivCard';
import Hero from '../components/Hero';
import TopCivs from '../components/TopCivs';
import Info from '../components/Info';
import { createFilter } from '../utils';

const Homepage = ({ data, location }) => {
  const filter = createFilter(data);
  const previousStats = {};
  data.postgres.previousFilter.deCivilizationstatsByFilterId.nodes.forEach(
    (p) => {
      previousStats[p.civNum] = p;
    },
  );
  const node = data.postgres.filter;
  const stats = node.deCivilizationstatsByFilterId.nodes;
  stats.forEach((civStats) => {
    civStats.name = Civs[civStats.civNum].name;
    civStats.uniqueUnit = Civs[civStats.civNum].uniqueUnit;
    civStats.previous = previousStats[civStats.civNum];
  });
  const sortedStats = stats.sort((a, b) => (a.name < b.name ? -1 : 1));
  const sortedByRate = stats.concat();
  sortedByRate.sort((a, b) => (a.winRate < b.winRate ? 1 : -1));
  const top5 = sortedByRate.slice(0, 5);
  const bottom5 = sortedByRate.slice(-5);

  return (
    <Layout location={location} filter={filter}>
      <SEO />
      <Info>
        <p>
          Patch{' '}
          <a
            href="https://www.ageofempires.com/news/aoe2de-update-36906/"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            36906
          </a>{' '}
          has been released! We are gathering stats and will update this site
          when enough matches have been played.
        </p>
      </Info>
      <Hero />
      <div className="flex flex-wrap mt-3">
        <div className="w-full lg:w-1/2 lg:pr-4">
          <h3 className="text-2xl mb-1">Highest Win Rates</h3>
          <TopCivs filter={filter} civs={top5} />
        </div>
        <div className="w-full lg:w-1/2 lg:pl-4">
          <h3 className="text-2xl mb-1">Lowest Win Rates</h3>
          <TopCivs filter={filter} civs={bottom5} />
        </div>
      </div>
      <div className="flex flex-wrap">
        {sortedStats.map((civStats) => (
          <CivCard key={civStats.civNum} civStats={civStats} filter={filter} />
        ))}
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
        deCivilizationstatsByFilterId {
          nodes {
            winRate
            playRate
            civNum
            numPlayed
          }
        }
      }
      previousFilter: deFilterById(id: $previousFilterId) {
        deCivilizationstatsByFilterId {
          nodes {
            winRate
            playRate
            civNum
            numPlayed
          }
        }
      }
    }
  }
`;

export default Homepage;
