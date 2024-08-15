import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import contactsReducer from './contactSlice';

// Define a persist config for the contacts reducer
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap the contacts reducer with persistReducer
const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
  reducer: {
    allContacts: persistedContactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a persistor object to persist the store
export const persistor = persistStore(store);
