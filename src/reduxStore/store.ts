import { createStore, applyMiddleware } from 'redux';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';
import reducer from './index';

const config = {
  blacklist: []
};

const middlewares = [createStateSyncMiddleware(config)];
const store = createStore(reducer, {}, applyMiddleware(...middlewares));

initStateWithPrevTab(store);

export default store;
