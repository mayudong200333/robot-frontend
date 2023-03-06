import { configureStore } from '@reduxjs/toolkit';
import capacityReducer from '../reducers/capacitySlice';

export const store = configureStore({
  reducer: {
    capacity: capacityReducer,
  },
});
