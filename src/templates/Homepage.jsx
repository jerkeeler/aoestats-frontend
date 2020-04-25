import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';

import { Civs } from '../data';
import SEO from '../components/SEO';
import CivCard from '../components/CivCard';
import Hero from '../components/Hero';
import Warning from '../components/Warning';

const Homepage = ({ data }) => {
  const node = data.postgres.allDeFilters.edges[0].node;
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
  });
  const sortedStats = stats.sort((a, b) => (a.name < b.name ? -1 : 1));

  return (
    <Layout filter={filter}>
      <SEO />
      <Warning>
        <p>
          DE stats are now live! Note that these are <u>preliminary</u> stats as
          the data is still new. These are subject to change (hopefully not
          drastically) in the near future. I need to do further validation and
          cleaning on dataset. Some features are <strong>disabled</strong> while
          I transition to DE stats.
        </p>
      </Warning>
      <Hero />
      <div className="flex flex-wrap">
        {sortedStats.map((civStats) => (
          <CivCard key={civStats.civNum} civStats={civStats} filter={filter} />
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query(
    $combined: Boolean
    $patchVal: String
    $eloVal: String
    $ladderVal: Int
  ) {
    postgres {
      allDeFilters(
        condition: {
          combined: $combined
          patchVal: $patchVal
          eloVal: $eloVal
          ladderVal: $ladderVal
        }
      ) {
        edges {
          node {
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
        }
      }
    }
  }
`;

export default Homepage;
