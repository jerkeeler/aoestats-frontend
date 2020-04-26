const path = require(`path`);

const { civilizations } = require('./src/data/civilizations.json');
const { CURRENT_PATCH } = require('./src/defs');
const { getPathFromFilter } = require('./src/urls');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      postgres {
        allDeFilters {
          nodes {
            id
            patchVal
            ladderVal
            eloVal
            combined
            deCivilizationstatsByFilterId {
              nodes {
                id
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
  `);

  const filters = result.data.postgres.allDeFilters.nodes;
  filters.forEach((filter) => {
    const context = {
      patchVal: filter.patchVal,
      ladderVal: filter.ladderVal,
      eloVal: filter.eloVal,
      combined: filter.combined,
      filterId: filter.id,
    };
    const pagePath = getPathFromFilter(filter);
    console.log(`Creating page ${pagePath}`);
    createPage({
      path: pagePath,
      component: path.resolve('./src/templates/Homepage.jsx'),
      context,
    });

    if (
      filter.combined &&
      filter.patchVal === CURRENT_PATCH &&
      filter.ladderVal === 3 &&
      filter.eloVal === null
    ) {
      createPage({
        path: '/',
        component: path.resolve('./src/templates/Homepage.jsx'),
        context,
      });
    }

    createPage({
      path: `/stats${pagePath}`,
      component: path.resolve('./src/templates/Stats.jsx'),
      context,
    });

    civilizations.forEach((civ) => {
      const filteredStats = filter.deCivilizationstatsByFilterId.nodes.filter(
        (stats) => stats.civNum === civ.id,
      );
      if (filteredStats.length !== 1)
        throw new Error('Multiple civ stats for filter!');
      const filterStats = filteredStats[0];

      createPage({
        path: `/civ/${civ.name}${pagePath}`,
        component: path.resolve('./src/templates/Civ.jsx'),
        context: { ...context, civStatsId: filterStats.id },
      });
    });
  });
};
