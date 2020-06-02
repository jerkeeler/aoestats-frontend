export function createFilter(data) {
  const node = data.postgres.filter;
  return {
    combined: node.combined,
    patchVal: node.patchVal,
    eloVal: node.eloVal,
    ladderVal: node.ladderVal,
  };
}

export function getStatsByPatch(data) {
  const listOfLists = data.postgres.allCivStats.nodes.reduce(
    (acc, curr) =>
      acc.concat(
        curr.deCivilizationstatsByFilterIdList.map((i) => ({
          ...i,
          patchVal: curr.patchVal,
        })),
      ),
    [],
  );
  const statsByPatch = {};
  listOfLists.forEach((s) => (statsByPatch[s.patchVal] = s));
  return statsByPatch;
}
