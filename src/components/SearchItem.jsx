import classnames from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import { getCivPath, getMapPath } from '../urls';
import CivImage from './CivImage';
import MapImage from './MapImage';

const SearchItem = ({ children, to, selected = false, ...rest }) => (
  <li className="text-base text-white" {...rest}>
    <Link
      to={to}
      className={classnames(
        'flex',
        'items-center',
        'hover:cursor-pointer',
        'w-full',
        'py-3',
        'px-2',
        'border-t',
        'border-white',
        {
          'bg-grays-light': !selected,
          'text-white': !selected,
          'bg-primary': selected,
          'text-gray-900': selected,
        },
      )}
    >
      {children}
    </Link>
  </li>
);

export const CivItem = ({ filter, civ, ...rest }) => {
  return (
    <SearchItem to={getCivPath(filter, civ.name)} {...rest}>
      <CivImage civId={civ.id} className="w-4 h-4 mr-2" />
      {civ.name}
    </SearchItem>
  );
};

export const MapItem = ({ filter, map, ...rest }) => (
  <SearchItem to={getMapPath(filter, map.name)} {...rest}>
    <MapImage mapNum={map.id} className="w-4 h-4 mr-2" />
    {map.displayName}
  </SearchItem>
);

export default SearchItem;
