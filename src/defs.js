const OverTimeBuckets = Object.freeze({
  EARLY: '<20',
  EARLY_MED: '20-30',
  MED: '30-40',
  LATE: '40+',
});

const SortedOverTimeBuckets = [
  OverTimeBuckets.EARLY,
  OverTimeBuckets.EARLY_MED,
  OverTimeBuckets.MED,
  OverTimeBuckets.LATE,
];

const CivSeries = Object.freeze({
  win_rate_vs_civs: 'win_rate_vs_civs',
  win_rate_for_maps: 'win_rate_for_maps',
});

const MapSeries = Object.freeze({
  win_rate_for_civs: 'win_rate_for_civs',
  play_rate_for_civs: 'play_rate_for_civs',
});

const OverTimeSeries = Object.freeze({
  win_rate_over_time: 'win_rate_over_time',
});

const EloBracket = Object.freeze({
  LOW: '<1000',
  MED: '1000-1250',
  HIGH_MED: '1250-1650',
  HIGH: '1650+',
});

const SortedEloBrackets = [
  EloBracket.LOW,
  EloBracket.MED,
  EloBracket.HIGH_MED,
  EloBracket.HIGH,
];

const Ladder = Object.freeze({
  0: 'Unranked',
  1: '1v1 Deathmatch',
  2: 'Team Deathmatch',
  3: '1v1 Random Map',
  4: 'Team Random Map',
});

const LadderToNum = Object.freeze({
  RM_1v1: 3,
  RM_TEAM: 4,
});

const LadderToShortname = Object.freeze({
  0: 'Unranked',
  1: 'DM_1v1',
  2: 'DM_TEAM',
  3: 'RM_1v1',
  4: 'RM_TEAM',
});

const SortedLadders = [LadderToNum.RM_1v1, LadderToNum.RM_TEAM];

const Patch = Object.freeze({
  de_47820: '47820',
  de_46295: '46295',
  de_43210: '43210',
  de_41855: '41855',
  de_40874: '40874',
  de_40220: '40220',
  de_39515: '39515',
  de_37906: '37906',
  de_36906: '36906',
  de_36202: '36202',
  de_35584: '35584',
});

const SortedPatches = [
  // Patch.de_36202,
  // Patch.de_36906,
  // Patch.de_37906,
  Patch.de_39515,
  Patch.de_40220,
  Patch.de_40874,
  Patch.de_41855,
  Patch.de_43210,
  Patch.de_46295,
  Patch.de_47820,
];

const CURRENT_PATCH = Patch.de_47820;
const PREVIOUS_PATCH = Patch.de_46295;

module.exports = {
  OverTimeBuckets,
  SortedOverTimeBuckets,
  CivSeries,
  MapSeries,
  OverTimeSeries,
  EloBracket,
  SortedEloBrackets,
  Ladder,
  LadderToShortname,
  LadderToNum,
  SortedLadders,
  Patch,
  SortedPatches,
  CURRENT_PATCH,
  PREVIOUS_PATCH,
};
