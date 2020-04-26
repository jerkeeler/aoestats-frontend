import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { EloBracket, LadderToShortname } from '../defs';

const getUrl = (location, filter, eloBracket = null) => {
  const currentPath = location.pathname;
  let start = '';
  const sliceVal = filter.combined ? -1 : -2;
  if (currentPath.startsWith('/civ') || currentPath.startsWith('/stats'))
    start = currentPath.split('/').slice(0, sliceVal).join('/');
  if (!('combined' in filter) && !eloBracket)
    return `${start}/${LadderToShortname[3]}`;
  if (!('combined' in filter) && eloBracket)
    return `${start}/${LadderToShortname[3]}/${eloBracket}`;
  if ('combined' in filter && !eloBracket)
    return `${start}/${LadderToShortname[filter.ladderVal]}`;
  return `${start}/${LadderToShortname[filter.ladderVal]}/${eloBracket}`;
};

const DropdownItem = ({ children, to }) => (
  <li className="hover:bg-gray-300">
    <Link to={to} className="w-full h-full py-1 px-2 block">
      {children}
    </Link>
  </li>
);

const Dropdown = ({ location, filter }) => (
  <ul
    className="absolute top-100 left-0 bg-white text-black min-w-full text-center
    mt-2 flex flex-col text-base rounded bg-gray-100 shadow border border-gray-200"
  >
    <DropdownItem to={getUrl(location, filter)}>All</DropdownItem>
    {Object.entries(EloBracket).map(([key, value]) => (
      <DropdownItem to={getUrl(location, filter, value)} key={key}>
        {value}
      </DropdownItem>
    ))}
  </ul>
);

const EloPicker = ({ location, filter }) => {
  const [modal, setModal] = useState(false);
  const [timer, setTimer] = useState(null);
  useEffect(
    () => () => {
      if (timer) clearTimeout(timer);
    },
    [timer],
  );

  const setVal = (newVal, timeout = 300) => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => setModal(newVal), timeout);
    setTimer(newTimer);
  };
  return (
    <span
      className="hover:cursor-pointer relative"
      onMouseEnter={() => setVal(true, 0)}
      onMouseLeave={() => setVal(false)}
      onClick={() => setVal(!modal, 0)}
    >
      Elo: {filter.eloVal || 'All'}{' '}
      <span className="w-4 overflow-hidden">
        <FontAwesomeIcon
          icon={faCaretDown}
          className="text-primary"
          size="sm"
        />
      </span>
      {modal && <Dropdown location={location} filter={filter} />}
    </span>
  );
};

export default EloPicker;
