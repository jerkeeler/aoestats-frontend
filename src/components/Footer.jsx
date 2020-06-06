import React from 'react';

import A from './typography/A';
import { formatDate, numberWithCommas } from '../formatting';
import useLastUpdatedTime from '../hooks/useLastUpdatedTime';
import { graphql, useStaticQuery } from 'gatsby';
import Link from './Link';

const Seperator = () => <span className="mx-2">|</span>;

const Footer = () => {
  const lastUpdatedTime = useLastUpdatedTime();

  const data = useStaticQuery(graphql`
    query {
      matches: postgres {
        allDeMatches(condition: { flagged: false }) {
          totalCount
        }
      }
    }
  `);

  return (
    <footer className="flex flex-col items-center text-center pb-6">
      <hr className="my-6 w-9/12 border-gray-800" />
      <p className="mb-1">
        © aoestats 2019 <Seperator /> Made by{' '}
        <A to="https://twitter.com/jerkeeler">jerbot</A> <Seperator />{' '}
        <Link to="/changelog">Changelog</Link>
      </p>
      <p className="mb-6">
        Stats last updated: {formatDate(lastUpdatedTime)} <Seperator /> Over{' '}
        {numberWithCommas(data.matches.allDeMatches.totalCount)} matches in the
        database
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
