import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import A from './typography/A';
import { formatDate } from '../formatting';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      siteBuildMetadata {
        buildTime
      }
    }
  `);
  const buildTime = new Date(data.siteBuildMetadata.buildTime);
  return (
    <footer className="flex flex-col items-center text-center pb-6">
      <hr className="my-6 w-9/12 border-gray-800" />
      <p className="mb-6">
        © aoestats 2019 | Made by{' '}
        <A to="https://twitter.com/jerkeeler">jerbot</A> | Stats last updated:{' '}
        {formatDate(buildTime)}
      </p>
      <p className="text-xs">
        aoestats isn't endorsed by Microsoft Inc.x. and doesn't reflect the
        views or opinions of Microsoft Inc. or anyone officially involved in
        producing or managing Age of Empires II and its various expansions. Age
        of Empires II, and its various expansions, are trademarks or registered
        trademarks of Microsoft, Inc.
      </p>
    </footer>
  );
};

export default Footer;
