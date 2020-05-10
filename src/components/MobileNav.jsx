import React, { useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import NavGroup from './NavGroup';
import NavItemRight from './NavItemRight';

const MobileNav = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <NavGroup className="items-center flex lg:hidden">
        {!mobileOpen && (
          <NavItemRight
            className="hover:cursor-pointer"
            onClick={() => setMobileOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </NavItemRight>
        )}
        {mobileOpen && (
          <NavItemRight
            className="hover:cursor-pointer"
            onClick={() => setMobileOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </NavItemRight>
        )}
      </NavGroup>
      <NavGroup
        className={classnames(
          {
            hidden: !mobileOpen,
          },
          'mt-3',
          'lg:mt-0',
          'items-start',
          'lg:items-center',
          'w-full',
          'lg:flex',
          'lg:w-auto',
          'flex-col',
          'lg:flex-row',
        )}
      >
        {children}
      </NavGroup>
    </>
  );
};

export default MobileNav;
