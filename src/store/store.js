import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './categories/categoriesSlice';
import productsSlice from './products/productsSlice';
import { apiSlise } from './api/apiSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    user: userSlice,
    [apiSlise.reducerPath]: apiSlise.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlise.middleware),
});
