import React from 'react';
import { Link } from 'gatsby';

import { getMapPath } from '../urls';
import MapImage from './MapImage';
import PercentBar from './PercentBar';

const MapCard = ({ mapInfo, filter }) => {
  return (
    <Link
      to={getMapPath(filter, mapInfo.name)}
      className="hover:text-primary flex mb-6 mx-3"
    >
      <MapImage mapNum={mapInfo.id} className="w-32 h-32" />
      <div className="flex flex-col ml-3 justify-center flex-grow">
        <p className="text-xl mb-1">{mapInfo.displayName}</p>
        <p className="text-xs text-white">Play Rate:</p>
        <PercentBar current={mapInfo.playRate} tone="bg-stats" max={0.3} />
      </div>
    </Link>
  );
};

export default MapCard;
