import React from 'react';

import { percentage } from '../formatting';

const ChangeIndicator = ({ oldVal, newVal, className = '' }) => {
  const percentChange = Math.round(percentage((newVal - oldVal) / oldVal));
  let content = '-';
  if (percentChange >= 5) content = `+${percentChange}%`;
  else if (percentChange <= -5) content = `${percentChange}%`;

  return (
    <div className={`font-mono text-xs text-white ${className}`}>{content}</div>
  );
};

export default ChangeIndicator;
