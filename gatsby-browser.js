/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import ContextProvider from './src/context/ContextProvider';
import './src/styles/global.css';

export const wrapRootElement = ({ element }) => (
  <ContextProvider>{element}</ContextProvider>
);
