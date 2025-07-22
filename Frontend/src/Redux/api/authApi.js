import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { usersApi } from './usersApi';

export const authApi = createApi({
    // The name of the reducer
    reducerPath: 'authApi',
    // The base URL for the API
    keepUnusedDataFor: 30, // seconds to keep unused data in cache
    baseQuery: fetchBaseQuery({ baseUrl: 'http://13.49.73.95/api/v1' }),
    endpoints: (builder) => ({
    // builder.mutuation is used for POST, PUT, DELETE requests
    // mutation can also invalidate cache data and force refetching
        register: builder.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body
            })
        }),
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    // Once above query is fulfilled, then we change the endpoint 
                    // to initiate that we type getMyProfile.initiate
                    await queryFulfilled;
                    await dispatch(usersApi.endpoints.getMyProfile.initiate(null));
                } catch (error) {
                    console.error('Failed to login:', error);
                }
            }
        }),
        logout: builder.query({
            query: () => ({
                url: '/logout'
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery} = authApi;
