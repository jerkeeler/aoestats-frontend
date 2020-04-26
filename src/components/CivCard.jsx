import React from 'react';
import { Link } from 'gatsby';

import CivImage from './CivImage';
import PercentBar from './PercentBar';
import { getCivPath } from '../urls';
import { getWinRateClass, numberWithCommas } from '../formatting';

const CivCard = ({ civStats, filter }) => (
  <div className="p-3 w-full md:w-1/3">
    <Link
      to={getCivPath(filter, civStats.name)}
      className="w-full flex flex-col border border-white p-2
      bg-grays-medium hover:text-primary hover:border-primary hover:cursor-pointer"
    >
      <div className="flex">
        <CivImage civId={civStats.civNum} className="w-16 h-16" />
        <div className="flex flex-col flex-grow pl-2 text-white">
          <p className="text-xxs">Win Rate</p>
          <PercentBar
            min={0.3}
            max={0.7}
            current={civStats.winRate}
            tone={`bg-${getWinRateClass(civStats.winRate)}`}
          />
          <p className="mt-2 text-xxs">Play Rate</p>
          <PercentBar max={0.15} current={civStats.playRate} tone="bg-stats" />
        </div>
      </div>
      <div className="mt-2 flex justify-between items-end">
        <p className="text-lg">{civStats.name}</p>
        <p className="text-sm text-white">
          Games Analyzed: {numberWithCommas(civStats.numPlayed)}
        </p>
      </div>
    </Link>
  </div>
);

export default CivCard;
