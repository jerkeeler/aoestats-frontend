import React from 'react';

const PercentBar = ({ className = '', max, total, current, tone }) => {
  return (
    <div
      className={`rounded w-full bg-white h-3 relative overflow-hidden ${className}`}
    >
      <div
        className="rounded h-3 absolute top-0 left-0 z-0"
        style={{ width: `${(current / max) * 100}%`, backgroundColor: tone }}
      />
      <p className="text-xxs z-10 text-center text-black relative">
        {Math.round((current / total) * 100)}%
      </p>
    </div>
  );
};
export default PercentBar;
