import { CombinedState, combineReducers, Reducer } from 'redux';
import { reducerCustomizeQRCard, InfoQRCard } from './reducerCustomizeQRCard';
import { reducerSelectAccount, InfoAccountWallet } from './reducerSelectAccount';
import { reducerMintingProcess, MintingProcessState } from './reducerMintingProcess';

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

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;
