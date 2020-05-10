import React from 'react';
import classnames from 'classnames';

const NavItemLeft = ({ children, className, ...rest }) => (
  <li
    {...rest}
    className={classnames('mr-6', 'my-1', 'md:my-0', 'last:mr-0', className)}
  >
    {children}
  </li>
);

export default NavItemLeft;
