import React, { useState } from 'react';
import StoreContext from './store';

const ContextProvider = ({ children }) => {
  const [mapStatsSortDir, setMapStatsSortDir] = useState(-1);
  const [mapStatsSortVal, setMapStatsSortVal] = useState('name');
  const [civStatsSortDir, setCivStatsSortDir] = useState(-1);
  const [civStatsSortVal, setCivStatsSortVal] = useState('name');

  return (
    <StoreContext.Provider
      value={{
        mapStatsSortDir: mapStatsSortDir,
        mapStatsSortVal: mapStatsSortVal,
        setMapStatsSortDir: setMapStatsSortDir,
        setMapStatsSortVal: setMapStatsSortVal,
        civStatsSortDir: civStatsSortDir,
        civStatsSortVal: civStatsSortVal,
        setCivStatsSortDir: setCivStatsSortDir,
        setCivStatsSortVal: setCivStatsSortVal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default ContextProvider;
