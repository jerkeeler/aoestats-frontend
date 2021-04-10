import { useContext } from 'react';
import StoreContext from '../context/store';

const useStore = () => useContext(StoreContext);

export default useStore;
