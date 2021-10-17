import { CombinedState, combineReducers, Reducer } from 'redux';
import { reducerCustomizeQRCard, InfoQRCard } from './reducerCustomizeQRCard';
import { reducerSelectAccount, InfoAccountWallet } from './reducerSelectAccount';
import { reducerMintingProcess, MintingProcessState } from './reducerMintingProcess';

const rootReducers: Reducer<
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

export default rootReducers;

export type IRootState = ReturnType<typeof rootReducers>;
