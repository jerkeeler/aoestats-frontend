const { LadderToShortname } = require('./defs');

const getPathFromFilter = (filter) => {
  if (!('combined' in filter)) return `/${LadderToShortname[3]}`;
  if (filter.combined) return `/${LadderToShortname[filter.ladderVal]}`;
  return `/${LadderToShortname[filter.ladderVal]}/${filter.eloVal}`;
};

const getCivPath = (filter, civName) => {
  return `/civ/${civName}${getPathFromFilter(filter)}`;
};

const getMapPath = (filter, mapName) => {
  return `/map/${mapName}${getPathFromFilter(filter)}`;
};

module.exports = { getPathFromFilter, getCivPath, getMapPath };
