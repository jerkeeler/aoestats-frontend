import React from 'react';
import classnames from 'classnames';

const NavItemRight = ({ children, className, ...rest }) => (
  <li
    {...rest}
    className={classnames(
      'md:mr-0',
      'lg:ml-3',
      'my-1',
      'lg:my-0',
      'first:ml-0',
      className,
    )}
  >
    {children}
  </li>
);

export default NavItemRight;
