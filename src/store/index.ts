import { configureStore } from '@reduxjs/toolkit';
import wifiReducer from './slices/wifiSlice';
import achievementsReducer from './slices/achievementsSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    wifi: wifiReducer,
    achievements: achievementsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;