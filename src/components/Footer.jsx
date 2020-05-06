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
        Age of Empires II DE © Microsoft Corporation. aoestats.io was created
        under Microsoft's{' '}
        <A to="https://www.xbox.com/en-us/developers/rules">
          "Game Content Usage Rules"
        </A>{' '}
        using assets from Age of Empires II DE, and it is not endorsed by or
        affiliated with Microsoft.
      </p>
    </footer>
  );
};

export default Footer;
