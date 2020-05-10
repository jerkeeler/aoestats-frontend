import { Link as GatsbyLink } from 'gatsby';
import React from 'react';
import { CURRENT_PATCH, Ladder } from '../defs';
import { getPathFromFilter } from '../urls';
import BuyMeACoffee from './BuyMeACoffee';
import EloPicker from './EloPicker';
import Link from './Link';
import MobileNav from './MobileNav';
import NavGroup from './NavGroup';
import NavItemLeft from './NavItemLeft';
import NavItemRight from './NavItemRight';
import SearchBar from './SearchBar';
import HR from './typography/HR';

const Navbar = ({ location, filter }) => {
  const ladderVal = filter.ladderVal ? Ladder[filter.ladderVal] : Ladder[3];
  return (
    <nav
      className="w-full flex justify-center bg-grays-light md:sticky min-h-16 top-0
  z-50 mb-6 shadow"
    >
      <div
        className="max-w-screen-lg w-full flex flex-wrap justify-between
      items-center px-3 lg:px-0 py-4 lg:py-0"
      >
        <NavGroup className="items-center">
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
        <MobileNav>
          <HR className="w-full lg:hidden" borderColor="border-gray-500" />
          <NavItemRight>
            <BuyMeACoffee />
          </NavItemRight>
          <NavItemRight className="md:text-xs">
            Patch: <b>{CURRENT_PATCH}</b>
          </NavItemRight>
          <NavItemRight className="md:text-xs">
            Ladder: <b>{ladderVal}</b>
          </NavItemRight>
          <NavItemRight className="w-full lg:w-auto md:text-xs">
            <EloPicker location={location} filter={filter} />
          </NavItemRight>
          <NavItemRight className="w-full lg:w-auto">
            <SearchBar filter={filter} />
          </NavItemRight>
        </MobileNav>
      </div>
    </nav>
  );
};

export default Navbar;
