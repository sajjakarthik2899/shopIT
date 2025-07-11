import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    // The name of the reducer
    reducerPath: 'productsApi',
    // The base URL for the API
    keepUnusedDataFor: 30, // seconds to keep unused data in cache
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    endpoints: (builder) => ({
        // builder.query is used for GET requests
        getProducts: builder.query({
            query: (params) => ({
                url: '/products'
            })
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `/products/${id}`
            })
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApi;
