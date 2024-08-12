import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactSlice';

export const store = configureStore({
  reducer: {
    allContacts: contactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
