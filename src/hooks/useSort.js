import { useState } from 'react';

const useSort = ({
  initialStats,
  initialSortVal = 'name',
  initialSortDir = -1,
  setContextSortVal = () => {},
  setContextSortDir = () => {},
}) => {
  const init = initialStats.concat();
  init.sort((a, b) =>
    a[initialSortVal] > b[initialSortVal]
      ? -1 * initialSortDir
      : initialSortDir,
  );
  const [tableStats, setTableStats] = useState(init);
  const [sortDirection, setSortDirection] = useState(initialSortDir);
  const [sortVal, setSortVal] = useState(initialSortVal);

  const onClick = (newSortVal) => {
    let newSortDirection = sortDirection;
    if (newSortVal !== sortVal) newSortDirection = 1;
    else newSortDirection *= -1;
    setSortVal(newSortVal);
    setContextSortVal(newSortVal);
    setSortDirection(newSortDirection);
    setContextSortDir(newSortDirection);

    tableStats.sort((a, b) =>
      a[newSortVal] < b[newSortVal] ? newSortDirection : -1 * newSortDirection,
    );
    setTableStats(tableStats.concat());
  };

  return {
    onClick,
    tableStats,
    sortDirection,
    sortVal,
  };
};

export default useSort;
