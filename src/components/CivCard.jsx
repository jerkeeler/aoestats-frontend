import React from 'react';
import { Link } from 'gatsby';
import CivImage from './CivImage';
import PercentBar from './PercentBar';
import { Tone } from '../defs';
import { getPathFromFilter } from '../urls';

const CivCard = ({ civStats, filter }) => (
  <div className="p-3 w-full md:w-1/3">
    <Link
      to={`/civ/${civStats.name}${getPathFromFilter(filter)}`}
      className="w-full flex flex-col border border-white p-2
      bg-grays-medium hover:text-primary hover:border-primary hover:cursor-pointer"
    >
      <div className="flex">
        <CivImage civId={civStats.civNum} className="w-16 h-16" />
        <div className="flex flex-col flex-grow pl-2 text-white">
          <p className="text-xxs">Win Rate</p>
          <PercentBar
            total={1}
            max={1}
            current={civStats.winRate}
            tone={Tone.high}
          />
          <p className="mt-2 text-xxs">Play Rate</p>
          <PercentBar
            total={1}
            max={0.18}
            current={civStats.playRate}
            tone={Tone.default}
          />
        </div>
      </div>
      <div className="mt-2 flex justify-between items-end">
        <p className="text-lg">{civStats.name}</p>
        <p className="text-sm text-white">
          Games Analyzed: {civStats.numPlayed}
        </p>
      </div>
    </Link>
  </div>
);

export default CivCard;
