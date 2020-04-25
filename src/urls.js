const getPathFromFilter = (filter) => {
  if (filter.combined) return `/${filter.ladderVal}`;
  return `/${filter.ladderVal}/${filter.eloVal}`;
};

module.exports = { getPathFromFilter };
