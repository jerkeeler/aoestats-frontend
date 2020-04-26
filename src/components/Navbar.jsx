import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import Link from './Link';
import { CURRENT_PATCH, Ladder } from '../defs';
import EloPicker from './EloPicker';
import { getPathFromFilter } from '../urls';
import BuyMeACoffee from './BuyMeACoffee';

const NavItemRight = ({ className = '', children }) => (
  <li className={`ml-6 first:ml-0 ${className}`}>{children}</li>
);

const NavItemLeft = ({ className = '', children }) => (
  <li className={`mr-6 last:mr-0 ${className}`}>{children}</li>
);

const NavGroup = ({ children }) => (
  <ul className="flex items-center">{children}</ul>
);

const Navbar = ({ location, filter }) => {
  const ladderVal = filter.ladderVal ? Ladder[filter.ladderVal] : Ladder[3];
  return (
    <nav
      className="w-full flex justify-center bg-grays-light sticky h-16 top-0
  z-50 mb-6 shadow"
    >
      <div className="max-w-screen-lg w-full flex justify-between items-center">
        <NavGroup>
          <NavItemLeft>
            <GatsbyLink
              to={getPathFromFilter(filter)}
              className="text font-bold text-lg"
            >
              aoestats
            </GatsbyLink>
          </NavItemLeft>
          <NavItemLeft>
            <Link to={`/stats${getPathFromFilter(filter)}`}>Stats</Link>
          </NavItemLeft>
          <NavItemLeft>
            <Link to="/faq">FAQ</Link>
          </NavItemLeft>
        </NavGroup>
        <NavGroup>
          <NavItemRight>
            <BuyMeACoffee />
          </NavItemRight>
          <NavItemRight className="text-xs">
            Patch: {CURRENT_PATCH}
          </NavItemRight>
          <NavItemRight className="text-xs">Ladder: {ladderVal}</NavItemRight>
          <NavItemRight className="text-xs">
            <EloPicker location={location} filter={filter} />
          </NavItemRight>
        </NavGroup>
      </div>
    </nav>
  );
};

export default Navbar;
