import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import Link from './Link';
import { CURRENT_PATCH, Ladder } from '../defs';
import EloPicker from './EloPicker';
import { getPathFromFilter } from '../urls';
import BuyMeACoffee from './BuyMeACoffee';

const NavItemRight = ({ className = '', children }) => (
  <li className={`mr-3 md:mr-0 md:ml-3 my-1 md:my-0 first:ml-0 ${className}`}>
    {children}
  </li>
);

const NavItemLeft = ({ className = '', children }) => (
  <li className={`mr-6 my-1 md:my-0 last:mr-0 ${className}`}>{children}</li>
);

const NavGroup = ({ children }) => (
  <ul className="flex items-center flex-wrap">{children}</ul>
);

const Navbar = ({ location, filter }) => {
  const ladderVal = filter.ladderVal ? Ladder[filter.ladderVal] : Ladder[3];
  return (
    <nav
      className="w-full flex justify-center bg-grays-light md:sticky md:h-16 top-0
  z-50 mb-6 shadow"
    >
      <div
        className="max-w-screen-lg w-full flex flex-wrap md:justify-between
      items-center px-3 lg:px-0 py-3 md:py-0"
      >
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
            <Link to={`/stats${getPathFromFilter(filter)}`}>Civs</Link>
          </NavItemLeft>
          <NavItemLeft>
            <Link to={`/maps${getPathFromFilter(filter)}`}>Maps</Link>
          </NavItemLeft>
          <NavItemLeft>
            <Link to="/faq">FAQ</Link>
          </NavItemLeft>
        </NavGroup>
        <NavGroup>
          <NavItemRight>
            <BuyMeACoffee />
          </NavItemRight>
          <NavItemRight className="md:text-xs">
            Patch: <b>{CURRENT_PATCH}</b>
          </NavItemRight>
          <NavItemRight className="md:text-xs">
            Ladder: <b>{ladderVal}</b>
          </NavItemRight>
          <NavItemRight className="md:text-xs">
            <EloPicker location={location} filter={filter} />
          </NavItemRight>
        </NavGroup>
      </div>
    </nav>
  );
};

export default Navbar;
