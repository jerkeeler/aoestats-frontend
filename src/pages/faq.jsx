import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import HR from '../components/typography/HR';
import H1 from '../components/typography/H1';

const Faq = ({ location }) => (
  <Layout location={location}>
    <SEO title="FAQ" />
    <H1>FAQ</H1>
    <HR />
  </Layout>
);

export default Faq;
