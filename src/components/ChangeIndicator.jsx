import React from 'react';
import { ChangeIndicatorAmount } from '../consts';
import { percentage } from '../formatting';

const ChangeIndicator = ({ oldVal, newVal, className = '' }) => {
  const percentChange = Math.round(percentage((newVal - oldVal) / oldVal));
  let content = '-';
  if (percentChange >= ChangeIndicatorAmount) content = `+${percentChange}%`;
  else if (percentChange <= -ChangeIndicatorAmount)
    content = `${percentChange}%`;

  return (
    <div className={`font-mono text-xs text-white ${className}`}>{content}</div>
  );
};

export default ChangeIndicator;
