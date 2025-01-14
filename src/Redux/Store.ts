import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice.tsx';

// Create the Redux store with the configureStore API
const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth reducer to the store (auth state will be managed by authReducer)
  },
});

// TypeScript type for RootState, which represents the structure of the Redux store state
export type RootState = ReturnType<typeof store.getState>; // Automatically infers the state shape from the store
export default store;
