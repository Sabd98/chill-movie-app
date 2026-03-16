import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import modalReducer from './modalSlice';
import formReducer from './formSlice';
import { api } from '../api/api';

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    form: formReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
