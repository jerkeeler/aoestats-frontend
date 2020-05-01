import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const SortIndicator = ({
  sortVal,
  currentSortVal,
  sortDirection,
  className = '',
}) => {
  const icon = sortDirection === 1 ? faCaretUp : faCaretDown;
  if (sortVal !== currentSortVal) return null;
  return <FontAwesomeIcon icon={icon} size="sm" className={className} />;
};

export default SortIndicator;
