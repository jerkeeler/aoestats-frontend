import React from 'react';
import Layout from '../components/Layout';
import Link from '../components/Link';
import SEO from '../components/SEO';
import A from '../components/typography/A';
import H1 from '../components/typography/H1';
import HR from '../components/typography/HR';
import { formatDate } from '../formatting';
import useLastUpdatedTime from '../hooks/useLastUpdatedTime';

const Item = ({ question, children }) => (
  <div className="w-full md:w-1/2 p-6 text-gray-900 flex">
    <div className="shadow bg-gray-100 border p-6 rounded flex-grow">
      <h3 className="font-bold text-lg mb-1">Q: {question}</h3>
      <hr className="mb-3" />
      {children}
    </div>
  </div>
);

const Faq = ({ location }) => {
  const lastUpdatedTime = useLastUpdatedTime();

  return (
    <Layout location={location}>
      <SEO title="FAQ" />
      <H1>FAQ</H1>
      <HR />
      <div className="flex flex-wrap">
        <Item question="Where do these stats come from?">
          <p>
            These stats are derived from the developer APIs provided by{' '}
            <A to="https://aoe2.net">aoe2.net</A>. I would highly suggest
            checking out that website and supporting it! It is an awesome source
            of data! None of this would be possible without it.
          </p>
        </Item>
        <Item question="How frequently are these stats updated?">
          <p>
            Due to the way the new apis work, these stats will updated{' '}
            <u>daily</u>.
          </p>
          <p>
            Stats last updated:{' '}
            <span className="font-bold">{formatDate(lastUpdatedTime)}</span>
          </p>
        </Item>
        <Item question="How can I support you?">
          <p>
            Awwwww thanks!{' '}
            <span role="img" aria-label="smiley face">
              😊
            </span>{' '}
            You can support me by{' '}
            <A to="https://www.buymeacoffee.com/jerbot">buying me a "coffee"</A>
            ! Any donations will go strictly toward hosting costs. Right now I'm
            paying ~$20 a month to maintain this website and update stats.
          </p>
        </Item>
        <Item question="Why do some stats look funky for 1650+?">
          <p>
            1650+ has a very limited number of games played. Thus the stats may
            look funky, especially when comparing win rate of one civ vs
            another. Short answer, not enough games! But I still wanted that
            bracket to look at high level stats.
          </p>
        </Item>
        <Item question="Where should I report bugs?">
          <p>
            Please report any bugs by creating an issue on{' '}
            <A to="https://github.com/jerkeeler/aoestats-frontend/">
              this GitHub Repo
            </A>
            .
          </p>
        </Item>
        <Item question="What are the small percentage numbers everywhere?">
          Those values indicate how much a certain value has changed since the
          last patch. These indicate the <i>percentage change</i> of the value
          since that last patch. A 1% change of a 50% win rate{' '}
          <b>does not mean</b> the value went from 50% win rate to 51% win rate.
          It means it went from 50% to 50.5%.
        </Item>
        <Item question="What happened to the Voobly stats?">
          <p>
            Don't worry! The Voobly stats are still around! I'm still working on
            the best way for those stats to live in harmony with DE stats.
          </p>
        </Item>
        <Item question="How can I access the raw dataset?">
          <p>
            I'm working on a way to provide access to the raw data. Please stay
            tuned! I know I have gotten a lot of requests for this in the past.
          </p>
        </Item>
        <Item question="What has changed on the site recently?">
          <p>
            Check out my <Link to="/changelog">changelog</Link> page to view a
            list of notable changes and when the occurred.
          </p>
        </Item>
      </div>
    </Layout>
  );
};

export default Faq;
