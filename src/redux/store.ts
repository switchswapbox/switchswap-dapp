import { createStore } from 'redux';
import reducer from './all';

const store = createStore(reducer);

export default store;
