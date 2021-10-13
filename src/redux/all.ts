import { CombinedState, combineReducers, Reducer } from 'redux';
import { InfoQRCard, qrCardReducer } from './reducerCustomizeQRCard';
import { accountReducer, InfoAccountWallet } from './reducerSelectAccount';

const rootReducers: Reducer<
  CombinedState<{
    qrCardReducer: InfoQRCard;
    accountReducer: InfoAccountWallet;
  }>,
  | {
      type: string;
      infoQRCard: InfoQRCard;
    }
  | {
      type: string;
      infoAccountWallet: InfoAccountWallet;
    }
> = combineReducers({
  qrCardReducer,
  accountReducer
});

export default rootReducers;

export type IRootState = ReturnType<typeof rootReducers>;
