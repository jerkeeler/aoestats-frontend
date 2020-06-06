import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import H1 from '../components/typography/H1';
import HR from '../components/typography/HR';

const ChangeItem = ({ children }) => <li>{children}</li>;

const DateItem = ({ date, children }) => (
  <li className="mt-6 first:mt-0">
    <p className="text-lg font-bold">{date}</p>
    <ul className="list-disc pl-6">{children}</ul>
  </li>
);

const Changelog = ({ location }) => (
  <Layout location={location}>
    <SEO title="Changelog" />
    <H1>Changelog</H1>
    <HR />
    <ul className="mt-6 list-disc pl-6">
      <DateItem date="June 6, 2020">
        <ChangeItem>
          Fixed bug where old maps were showing up in searchbar
        </ChangeItem>
      </DateItem>
      <DateItem date="June 3, 2020">
        <ChangeItem>Published preliminary results of patch 37906</ChangeItem>
        <ChangeItem>
          Merged match data from patch 37650 with 37906 (hotfix)
        </ChangeItem>
        <ChangeItem>
          Fixed a formatting bug on the Elo Picker on Chrome
        </ChangeItem>
      </DateItem>
    </ul>
  </Layout>
);

export default Changelog;
