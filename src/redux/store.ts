import { createStore } from 'redux';
import { accountReducer } from './reducer';

const store = createStore(accountReducer);

export default store;
