import React from 'react';

const A = ({ to, children }) => (
  <a
    rel="noopener noreferrer"
    href={to}
    className="text-primary hover:text-primary-dark"
  >
    {children}
  </a>
);

export default A;
