import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const PositiveIndicator = () => (
  <span className="inline-block w-2 h-4 mr-1 pt-xsm overflow-hidden">
    <FontAwesomeIcon icon={faCaretUp} className="text-stats-high" size="sm" />
  </span>
);

const NegativeIndicator = () => (
  <span className="inline-block w-2 h-4 mr-1 pt-xsm overflow-hidden">
    <FontAwesomeIcon icon={faCaretDown} className="text-stats-low" size="sm" />
  </span>
);

const ChangeIndicator = ({ oldVal, newVal, className = '' }) => {
  const change = oldVal - newVal;
  let content = '-';
  let indicator = '';
  if (change !== 0) {
    content = `${Math.abs(change)}`;
    indicator = change < 0 ? <NegativeIndicator /> : <PositiveIndicator />;
  }

  return (
    <div className={`font-mono text-xs text-white ${className}`}>
      {indicator}
      {content}
    </div>
  );
};

export default ChangeIndicator;
