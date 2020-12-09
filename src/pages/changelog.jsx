import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import A from '../components/typography/A';
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
      <DateItem date="December 8, 2020">
        <ChangeItem>
          Updated stats to patch 43210 and converted all "big november patch"
          matches to patch 43210.
        </ChangeItem>
      </DateItem>
      <DateItem date="November 24, 2020">
        <ChangeItem>
          Started collecting data for the anniversary patch.
        </ChangeItem>
        <ChangeItem>
          Finally updated the site to the previous patch, 41855.
        </ChangeItem>
      </DateItem>
      <DateItem date="September 12, 2020">
        <ChangeItem>Updated stats to new patch 40220.</ChangeItem>
      </DateItem>
      <DateItem date="August 4, 2020">
        <ChangeItem>
          Updated stats to new patch 39515 and merged matches from 39284 into it
          since 39515 was a hotfix for 39284.
        </ChangeItem>
      </DateItem>
      <DateItem date="July 20, 2020">
        <ChangeItem>
          Created a dump of the raw match and player data available{' '}
          <A to="https://www.kaggle.com/jerkeeler/age-of-empires-ii-de-match-data">
            on Kaggle
          </A>
          . Data is updated monthly.
        </ChangeItem>
        <ChangeItem>
          Added maps to patch 37906 that were added mid-patch.
        </ChangeItem>
      </DateItem>
      <DateItem date="June 15, 2020">
        <ChangeItem>
          Added a developer API! It can be accessed at:{' '}
          <A to="https://api.aoestats.io/de/">api.aoestats.io/de/</A>
        </ChangeItem>
      </DateItem>
      <DateItem date="June 8, 2020">
        <ChangeItem>Added team game stats!</ChangeItem>
      </DateItem>
      <DateItem date="June 6, 2020">
        <ChangeItem>
          Fixed bug where old maps were showing up in searchbar
        </ChangeItem>
        <ChangeItem>
          Updated how stats are calculated to be more performant and more
          accurate
        </ChangeItem>
        <ChangeItem>
          Updated to only show percentage change if greater than 5%
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
