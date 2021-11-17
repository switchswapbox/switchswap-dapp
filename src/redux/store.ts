import { configureStore } from '@reduxjs/toolkit';
import reducerCustomizeQRCard from './reducerCustomizeQRCard';
import reducerMintingProcess from './reducerMintingProcess';
import reducerSelectAccount from './reducerSelectAccount';

export const store = configureStore({
  reducer: {
    reducerCustomizeQRCard,
    reducerMintingProcess,
    reducerSelectAccount
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
