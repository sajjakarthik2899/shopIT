import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    keepUnusedDataFor: 30, 
    baseQuery: fetchBaseQuery({ baseUrl: 'http://13.49.73.95/api/v1' }),
    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
            query: (orderData) => ({
                url: '/order/create',
                method: 'POST',
                body: orderData,
            }),
        }),
        stripeCheckoutSession: builder.mutation({
            query: (body) => ({
                url: '/payment/checkout_session',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useCreateNewOrderMutation,useStripeCheckoutSessionMutation } = ordersApi;
