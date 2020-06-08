const { LadderToShortname } = require('./defs');

const allowedPages = ['/civ', '/stats', '/maps', '/map'];

const getPathFromFilter = (filter) => {
  if (filter.combined || !('combined' in filter))
    return `/${LadderToShortname[filter.ladderVal || 3]}`;
  return `/${LadderToShortname[filter.ladderVal]}/${filter.eloVal}`;
};

const getCivPath = (filter, civName) => {
  return `/civ/${civName}${getPathFromFilter(filter)}`;
};

const getMapPath = (filter, mapName) => {
  return `/map/${mapName}${getPathFromFilter(filter)}`;
};

const getPickerUrl = (
  location,
  filter,
  eloBracket = null,
  newLadder = null,
) => {
  const currentPath = location.pathname;
  let ladder = LadderToShortname[newLadder ? newLadder : filter.ladderVal];
  ladder = ladder ? ladder : LadderToShortname[3];
  let start = '/';
  const sliceVal = filter.combined ? -1 : -2;
  const startsWith = allowedPages.reduce(
    (prev, cur) => prev || currentPath.startsWith(cur),
    false,
  );
  if (startsWith)
    start = currentPath
      .split('/')
      .filter((p) => p !== '')
      .slice(0, sliceVal)
      .join('/');
  const baseUrl = `${start}/${ladder}`;
  if (!eloBracket) return baseUrl;
  return `${baseUrl}/${eloBracket}`;
};

module.exports = { getPathFromFilter, getCivPath, getMapPath, getPickerUrl };
