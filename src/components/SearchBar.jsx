import { navigate } from 'gatsby';
import React, { useEffect, useRef, useState } from 'react';
import { KeyCode } from '../consts';
import { CivsByName, MapsByName } from '../data';
import { getCivPath, getMapPath } from '../urls';
import { CivItem, MapItem } from './SearchItem';

const allCivs = Object.entries(CivsByName).map(([_, value]) => value);
const allMaps = Object.entries(MapsByName)
  .map(([_, value]) => value)
  .filter((m) => m.active);

const SearchBar = ({ filter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsVisible, setItemsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [civList, setCivList] = useState([]);
  const [mapList, setMapList] = useState([]);
  const inputRef = useRef();
  const timerRef = useRef();

  const handleKeyPress = (event) => {
    if (event.key !== '/') return;
    event.preventDefault();
    inputRef.current.focus();
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress, true);
    return () => {
      document.removeEventListener('keypress', handleKeyPress, true);
    };
  }, [inputRef]);

  const onChange = (event) => {
    const newTerm = event.target.value.toLowerCase();
    setItemsVisible(!!newTerm);
    setSearchTerm(newTerm);
    setSelectedItem(newTerm ? 0 : -1);
    setCivList(
      allCivs.filter((c) => c.name.toLowerCase().includes(newTerm)).slice(0, 4),
    );
    setMapList(
      allMaps
        .filter((m) => m.displayName.toLowerCase().includes(newTerm))
        .slice(0, 4),
    );
  };

  const inputEvents = (event) => {
    const { keyCode } = event;
    if (
      !new Set([KeyCode.arrowUp, KeyCode.arrowDown, KeyCode.enter]).has(keyCode)
    )
      return;
    event.preventDefault();
    switch (keyCode) {
      case KeyCode.arrowUp:
        setSelectedItem(Math.max(selectedItem - 1, 0));
        break;
      case KeyCode.arrowDown:
        setSelectedItem(
          Math.min(selectedItem + 1, civList.length + mapList.length - 1),
        );
        break;
      case KeyCode.enter:
        if (selectedItem === -1) return;
        if (selectedItem < civList.length) {
          navigate(getCivPath(filter, civList[selectedItem].name));
        } else {
          navigate(
            getMapPath(filter, mapList[selectedItem - civList.length].name),
          );
        }
        break;
      default:
    }
  };

  const onBlur = () => {
    timerRef.current = setTimeout(() => {
      setItemsVisible(false);
      timerRef.current = null;
    }, 300);
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [timerRef],
  );

  return (
    <div className="w-full lg:w-40 h-8 inline-block relative">
      <input
        className="w-full text-gray-900 rounded py-2 px-3 focus:shadow-outline
        border-gray-300 leading-5 focus:outline-none"
        placeholder='Search... "/" to focus'
        onChange={onChange}
        ref={inputRef}
        onBlur={onBlur}
        onFocus={() => setItemsVisible(true)}
        onKeyDown={inputEvents}
      />
      {searchTerm && itemsVisible && (
        <div
          className="absolute top-100 mt-3 left-0 w-full bg-white
          text-gray-900 shadow-lg"
        >
          <ul>
            {civList.map((c, idx) => (
              <CivItem
                filter={filter}
                key={c.id}
                civ={c}
                onMouseEnter={() => setSelectedItem(idx)}
                selected={idx === selectedItem}
              />
            ))}
            {mapList.map((m, idx) => (
              <MapItem
                filter={filter}
                key={m.id}
                map={m}
                onMouseEnter={() => setSelectedItem(idx + civList.length)}
                selected={idx + civList.length === selectedItem}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
