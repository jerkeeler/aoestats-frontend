import { createContext } from 'react';

const defaultState = {
  mapStatsSortDir: -1,
  mapStatsSortVal: 'name',
  setMapStatsSortDir: () => {},
  setMapStatsSortVal: () => {},
  civStatsSortDir: -1,
  civStatsSortVal: 'name',
  setCivStatsSortDir: () => {},
  setCivStatsSortVal: () => {},
};

export const StoreContext = createContext(defaultState);
export default StoreContext;
