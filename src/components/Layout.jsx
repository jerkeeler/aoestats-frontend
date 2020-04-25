import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children, filter = {} }) => {
  return (
    <div className="bg-grays-dark text-white min-h-screen flex flex-col items-center">
      <Navbar filter={filter} />
      <div className="w-full max-w-screen-lg">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
