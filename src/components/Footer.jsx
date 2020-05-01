import React from 'react';

import A from './typography/A';
import { formatDate } from '../formatting';
import useLastUpdatedTime from '../hooks/useLastUpdatedTime';

const Seperator = () => <span className="mx-2">|</span>;

const Footer = () => {
  const lastUpdatedTime = useLastUpdatedTime();

  return (
    <footer className="flex flex-col items-center text-center pb-6">
      <hr className="my-6 w-9/12 border-gray-800" />
      <p className="mb-6">
        © aoestats 2019 <Seperator /> Made by{' '}
        <A to="https://twitter.com/jerkeeler">jerbot</A> <Seperator /> Stats
        last updated: {formatDate(lastUpdatedTime)}
      </p>
      <p className="text-xs">
        aoestats isn't endorsed by Microsoft Inc. and doesn't reflect the views
        or opinions of Microsoft Inc. or anyone officially involved in producing
        or managing Age of Empires II DE. Age of Empires II DE, and its various
        expansions, are trademarks or registered trademarks of Microsoft, Inc.
      </p>
    </footer>
  );
};

export default Footer;
