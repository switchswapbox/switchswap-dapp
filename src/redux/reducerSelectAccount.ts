import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface InfoAccountWallet {
  accountAddress: string;
  networkName: string;
}

const initialState: InfoAccountWallet = {
  accountAddress: 'Hello World',
  networkName: 'No wallet available'
};

export const reducerSelectAccountSlice = createSlice({
  name: 'reducerSelectAccount',
  initialState,
  reducers: {
    changeAccountWallet: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { changeAccountWallet } = reducerSelectAccountSlice.actions;

export const selectAccountAddress = (state: RootState) => state.reducerSelectAccount.accountAddress;
export const selectNetworkName = (state: RootState) => state.reducerSelectAccount.networkName;

export default reducerSelectAccountSlice.reducer;
