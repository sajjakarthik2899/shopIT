import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './api/productsApi';
import { authApi } from './api/authApi';
import { usersApi } from './api/usersApi';
import  createReducer from './features/cartSlice';
import  userReducer from './features/usersSlice';
import { ordersApi } from './api/orderApi';
// Your productsApi defines:
// What to fetch (/api/v1/products)
// How to fetch it (via fetchBaseQuery)

// middleware to handle caching, invalidation, and automatic background fetching
export const store = configureStore({
    // these are listed in browser console, Redux
    // i.e Tree
    reducer: {
        auth: userReducer,
        cart: createReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
    },
    // middleware to handle caching, invalidation, and automatic background fetching
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware, authApi.middleware, usersApi.middleware, ordersApi.middleware),
});