import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

const Link = ({ to, children }) => (
  <GatsbyLink to={to} className="text-primary hover:text-primary-dark">
    {children}
  </GatsbyLink>
);

export default Link;
