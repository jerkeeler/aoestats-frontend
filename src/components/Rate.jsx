import React from 'react';
import { numberWithCommas } from '../formatting';
import ChangeIndicator from './ChangeIndicator';

const Rate = ({
  title,
  value,
  textColor,
  games,
  position = null,
  previousPosition = null,
}) => (
  <div className="w-full px-6 py-3 last:pt-0">
    <div
      className="bg-grays-medium p-3 border border-white flex flex-col
      items-center"
    >
      <h3 className="text-3xl">{title}</h3>
      <p className={`text-2xl ${textColor}`}>{value}%</p>
      {previousPosition && (
        <ChangeIndicator newVal={position} oldVal={previousPosition} />
      )}
      <p className="text-sm">{numberWithCommas(games)} games</p>
    </div>
  </div>
);

export default Rate;
