import React from 'react';
import classnames from 'classnames';

const NavGroup = ({ children, className, ...rest }) => (
  <ul {...rest} className={classnames('flex', 'flex-wrap', className)}>
    {children}
  </ul>
);

export default NavGroup;
