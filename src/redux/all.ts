import { combineReducers } from 'redux';
import { InfoQRCard, qrCardReducer } from './reducerCustomizeQRCard';
import { accountReducer, InfoAccountWallet } from './reducerSelectAccount';

const rootReducers: any = combineReducers({
  qrCardReducer,
  accountReducer
});

export default rootReducers;
