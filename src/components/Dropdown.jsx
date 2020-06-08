import { Link } from 'gatsby';
import React from 'react';

export const DropdownItem = ({ children, to }) => (
  <li className="hover:bg-gray-300 whitespace-no-wrap">
    <Link to={to} className="w-full h-full py-1 px-2 block">
      {children}
    </Link>
  </li>
);

const Dropdown = ({ location, filter, children, ...rest }) => (
  <ul
    {...rest}
    className="absolute top-100 left-0 bg-white text-black min-w-full lg:min-w-0 text-center
    mt-2 flex flex-col text-base rounded bg-gray-100 shadow border border-gray-200 z-10"
  >
    {children}
  </ul>
);

export default Dropdown;
