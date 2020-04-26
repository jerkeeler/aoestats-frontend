export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function leftPad(value, amount, character) {
  if (value.length >= amount) return value;
  const padNum = amount - value.length;
  let padding = '';
  for (let i = 0; i < padNum; i++) {
    padding += character;
  }
  return padding + value;
}

export function getWinRateClass(winRate) {
  if (winRate > 0.5) return 'stats-high';
  if (winRate <= 0.5 && winRate > 0.4) return 'stats-medium';
  return 'stats-low';
}

export function percentage(value) {
  return (value * 100).toFixed(2);
}
