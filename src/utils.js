export function createFilter(data) {
  const node = data.postgres.filter;
  return {
    combined: node.combined,
    patchVal: node.patchVal,
    eloVal: node.eloVal,
    ladderVal: node.ladderVal,
  };
}
