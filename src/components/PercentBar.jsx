import React from 'react';

const PercentBar = ({ className = '', max, total, current, tone }) => {
  return (
    <div
      className={`rounded w-full bg-white h-3 relative overflow-hidden ${className}`}
    >
      <div
        className={`rounded h-3 absolute top-0 left-0 z-0 ${tone}`}
        style={{ width: `${(current / max) * 100}%` }}
      />
      <p className="text-xxs z-10 text-center text-black relative">
        {((current / total) * 100).toFixed(2)}%
      </p>
    </div>
  );
};
export default PercentBar;
