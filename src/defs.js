const OverTimeBuckets = Object.freeze({
  EARLY: '<20',
  EARLY_MED: '20-30',
  MED: '30-45',
  LATE_MED: '45-60',
  LATE: '60+',
});

const CivSeries = Object.freeze({
  win_rate_vs_civs: 'win_rate_vs_civs',
});

const OverTimeSeries = Object.freeze({
  win_rate_over_time: 'win_rate_over_time',
});

const EloBracket = Object.freeze({
  LOW: '<1000',
  LOW_MED: '1000-1100',
  MED: '1100-1300',
  HIGH_MED: '1300-1650',
  HIGH: '1650+',
});

const Ladder = Object.freeze({
  0: 'Unranked',
  1: '1v1 Deathmatch',
  2: 'Team Deathmatch',
  3: '1v1 Random Map',
  4: 'Team Random Map',
});

const Patch = Object.freeze({
  de_36202: '36202',
  de_35584: '35584',
});

const Tone = Object.freeze({
  high: '#89f5a2',
  medium: '#ffed68',
  low: '#f17d59',
  default: '#007bff',
});

const CURRENT_PATCH = Patch.de_36202;

module.exports = {
  OverTimeBuckets,
  OverTimeSeries,
  EloBracket,
  Ladder,
  Patch,
  Tone,
  CURRENT_PATCH,
};
