import React from 'react';

import { percentage } from '../formatting';

const PercentBar = ({
  className = '',
  min = 0,
  max = 1,
  total = 1,
  current,
  tone,
}) => {
  const width = (current - min) / (max - min);
  return (
    <div
      className={`rounded w-full bg-white h-3 relative overflow-hidden ${className}`}
    >
      <div
        className={`rounded h-3 absolute top-0 left-0 z-0 ${tone}`}
        style={{ width: `${percentage(width)}%` }}
      />
      <p className="text-xxs z-10 text-center text-black relative">
        {percentage(current / total)}%
      </p>
    </div>
  );
};
export default PercentBar;
