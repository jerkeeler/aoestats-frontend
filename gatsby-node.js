const path = require(`path`);

const { civilizations } = require('./src/data/civilizations.json');
const { maps } = require('./src/data/maps.json');
const { CURRENT_PATCH, PREVIOUS_PATCH } = require('./src/defs');
const { getPathFromFilter } = require('./src/urls');

const mapsById = {};
maps.forEach((m) => (mapsById[m.id] = m));

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      postgres {
        currentFilters: allDeFilters(condition: {patchVal: "${CURRENT_PATCH}"}) {
          nodes {
            id
            patchVal
            ladderVal
            eloVal
            combined
            deCivilizationstatsByFilterId {
              nodes {
                id
                civNum
              }
            }
            deMapstatsByFilterId {
              nodes {
                id
                mapNum
              }
            }
          }
        }
        previousFilters: allDeFilters(condition: {patchVal: "${PREVIOUS_PATCH}"}) {
          nodes {
            id
            patchVal
            ladderVal
            eloVal
            combined
            deCivilizationstatsByFilterId {
              nodes {
                id
                civNum
              }
            }
            deMapstatsByFilterId {
              nodes {
                id
                mapNum
              }
            }
          }
        }
      }
    }
  `);

  const filters = result.data.postgres.currentFilters.nodes;
  const previousFilters = result.data.postgres.previousFilters.nodes;
  filters.forEach((filter) => {
    const filteredPreviousFilters = previousFilters.filter(
      (f) =>
        f.ladderVal === filter.ladderVal &&
        f.eloVal === filter.eloVal &&
        f.combined === filter.combined,
    );
    if (filteredPreviousFilters.length !== 1)
      throw new Error(`Could not find previous filter to match ${filter.id}`);
    const previousFilter = filteredPreviousFilters[0];
    const context = {
      patchVal: filter.patchVal,
      ladderVal: filter.ladderVal,
      eloVal: filter.eloVal,
      combined: filter.combined,
      filterId: filter.id,
      previousFilterId: previousFilter.id,
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

    createPage({
      path: `/maps${pagePath}`,
      component: path.resolve('./src/templates/MapStats.jsx'),
      context,
    });

    civilizations.forEach((civ) => {
      const filteredStats = filter.deCivilizationstatsByFilterId.nodes.filter(
        (stats) => stats.civNum === civ.id,
      );
      if (filteredStats.length !== 1)
        throw new Error('Multiple civ stats for filter!');

      createPage({
        path: `/civ/${civ.name}${pagePath}`,
        component: path.resolve('./src/templates/Civ.jsx'),
        context: {
          ...context,
          civNum: civ.id,
        },
      });
    });

    filter.deMapstatsByFilterId.nodes.forEach((mapStat) => {
      const previousMapStats = previousFilter.deMapstatsByFilterId.nodes.filter(
        (stats) => stats.mapNum === mapStat.mapNum,
      );
      if (previousMapStats.length > 1)
        throw new Error('Multiple previous map stats found!');
      const previousMapStatsId =
        previousMapStats.length === 1 ? previousMapStats[0].id : -1;

      createPage({
        path: `/map/${mapsById[mapStat.mapNum].name}${pagePath}`,
        component: path.resolve('./src/templates/Map.jsx'),
        context: { ...context, mapStatsId: mapStat.id, previousMapStatsId },
      });
    });
  });
};
