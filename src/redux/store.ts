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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
