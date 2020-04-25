import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { EloBracket } from '../defs';
import { getPathFromFilter } from '../urls';

const DropdownItem = ({ children, to }) => (
  <li className="hover:bg-gray-300">
    <Link to={to} className="w-full h-full py-1 px-2 block">
      {children}
    </Link>
  </li>
);

const Dropdown = ({ filter }) => (
  <ul
    className="absolute top-100 left-0 bg-white text-black min-w-full text-center
    mt-2 flex flex-col text-base rounded bg-gray-100"
  >
    <DropdownItem to={`/${filter.ladderVal}`}>All</DropdownItem>
    {Object.entries(EloBracket).map(([key, value]) => (
      <DropdownItem to={`/${filter.ladderVal}/${value}`} key={key}>
        {value}
      </DropdownItem>
    ))}
  </ul>
);

const EloPicker = ({ filter }) => {
  const [modal, setModal] = useState(false);
  const [timer, setTimer] = useState(null);
  useEffect(
    () => () => {
      if (timer) clearTimeout(timer);
    },
    [],
  );

  const setVal = (newVal, timeout = 500) => {
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
      <FontAwesomeIcon icon={faCaretDown} className="text-primary" />
      {modal && <Dropdown filter={filter} />}
    </span>
  );
};

export default EloPicker;
