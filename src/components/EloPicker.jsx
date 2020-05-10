import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { KeyCode } from '../consts';
import { LadderToShortname, SortedEloBrackets } from '../defs';

const allowedPages = ['/civ', '/stats', '/maps', '/map'];

const getUrl = (location, filter, eloBracket = null) => {
  const currentPath = location.pathname;
  let start = '/';
  const sliceVal = filter.combined ? -1 : -2;
  const startsWith = allowedPages.reduce(
    (prev, cur) => prev || currentPath.startsWith(cur),
    false,
  );
  if (startsWith)
    start = currentPath
      .split('/')
      .filter((p) => p !== '')
      .slice(0, sliceVal)
      .join('/');
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

const Dropdown = ({ location, filter, ...rest }) => (
  <ul
    {...rest}
    className="absolute top-100 left-0 bg-white text-black min-w-full lg:min-w-0 text-center
    mt-2 flex flex-col text-base rounded bg-gray-100 shadow border border-gray-200"
  >
    <DropdownItem to={getUrl(location, filter)}>All</DropdownItem>
    {SortedEloBrackets.map((value) => (
      <DropdownItem to={getUrl(location, filter, value)} key={value}>
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

  const onClick = () => setVal(!modal, 0);

  const onKeyDown = (event) => {
    if (event.keyCode !== KeyCode.enter) return;
    onClick();
  };

  return (
    <div
      className="hover:cursor-pointer relative flex"
      onMouseLeave={() => setVal(false)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
    >
      Elo: <b className="ml-1">{filter.eloVal || 'All'} </b>
      <span className="inline-block w-2 h-4 ml-1 overflow-hidden">
        <FontAwesomeIcon
          icon={faCaretDown}
          className="text-primary"
          size="sm"
        />
      </span>
      {modal && (
        <Dropdown
          location={location}
          filter={filter}
          onMouseEnter={() => setVal(true, 0)}
        />
      )}
    </div>
  );
};

export default EloPicker;
