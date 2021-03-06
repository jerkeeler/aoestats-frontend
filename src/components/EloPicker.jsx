import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import Dropdown, { DropdownItem } from './Dropdown';
import { KeyCode } from '../consts';
import { SortedEloBrackets } from '../defs';
import { getPickerUrl } from '../urls';

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
        >
          <DropdownItem to={getPickerUrl(location, filter)}>All</DropdownItem>
          {SortedEloBrackets.map((value) => (
            <DropdownItem
              to={getPickerUrl(location, filter, value)}
              key={value}
            >
              {value}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </div>
  );
};

export default EloPicker;
