const path = require(`path`);

const { CURRENT_PATCH, Ladder } = require('./src/defs');
const { getPathFromFilter } = require('./src/urls');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      postgres {
        allDeFilters {
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
                  series
                }
              }
            }
          }
        }
      }
    }
  `);

  const filters = result.data.postgres.allDeFilters.edges.map(
    (node) => node.node,
  );
  filters.forEach((filter) => {
    const pagePath = getPathFromFilter(filter);
    console.log(`Creating page ${pagePath}`);
    createPage({
      path: pagePath,
      component: path.resolve('./src/templates/Homepage.jsx'),
      context: {
        patchVal: filter.patchVal,
        ladderVal: filter.ladderVal,
        eloVal: filter.eloVal,
        combined: filter.combined,
      },
    });
  });
  createPage({
    path: '/',
    component: path.resolve('./src/templates/Homepage.jsx'),
    context: {
      patchVal: CURRENT_PATCH,
      ladderVal: 3,
      eloVal: null,
      combined: true,
    },
  });
};
