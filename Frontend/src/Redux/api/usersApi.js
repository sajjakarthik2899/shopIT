// Updating profile, Updating user, Updating Password, Forgot Password, Reset Password, Delete User
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setUser } from '../features/usersSlice';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    keepUnusedDataFor: 30, 
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => ({
                url: `/myprofile`,
            }),
            // transformResponse runs after the response is received
            //{
            // "status": "success",
            // "user": {
            //     "id": 101,
            //     "name": "Karthik",
            //     "email": "karthik@example.com"
            // }
            // }
            // then it extracts the user object from the response as it is the main data we want to work with
            transformResponse: (response) => {
                return response.user; 
            },
            // This runs early, and `await queryFulfilled` will give transformed result
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data)); 
                    dispatch(setIsAuthenticated(true));
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                }
            }
        }),
        updatePassword: builder.mutation({
            query: (body) => ({
                url: `/password/update`,
                method: 'PUT',
                body,
            }),
        }),
        forgotPassword: builder.mutation({
            query: (body) => ({
                url: `/password/forgot`,
                method: 'POST',
                body 
            }),
        }),
    })
});

export const { useGetMyProfileQuery, useUpdatePasswordMutation, useForgotPasswordMutation } = usersApi;
