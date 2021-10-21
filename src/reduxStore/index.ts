import { AnyAction, CombinedState, combineReducers, Reducer } from 'redux';
import { reducerCustomizeQRCard, InfoQRCard } from './reducerCustomizeQRCard';
import { reducerSelectAccount, InfoAccountWallet } from './reducerSelectAccount';
import { reducerMintingProcess, MintingProcessState } from './reducerMintingProcess';
import { withReduxStateSync } from 'redux-state-sync';

export const RESET_STATE = 'RESET_STATE';

const rootReducer: Reducer<
  CombinedState<{
    reducerCustomizeQRCard: InfoQRCard;
    reducerSelectAccount: InfoAccountWallet;
    reducerMintingProcess: MintingProcessState;
  }>,
  | {
      type: string;
      state: InfoQRCard;
    }
  | {
      type: string;
      state: InfoAccountWallet;
    }
  | {
      type: string;
      state: MintingProcessState;
    }
> = combineReducers({
  reducerCustomizeQRCard,
  reducerSelectAccount,
  reducerMintingProcess
});

export default withReduxStateSync(rootReducer as Reducer<any, AnyAction>);

export type IRootState = ReturnType<typeof rootReducer>;
