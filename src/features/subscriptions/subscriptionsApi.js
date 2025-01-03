import { apiSlice } from "../api/apiSlice";

export const subscriptionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllPayments: builder.query({
            query: () => "/manage/student-payments",
        }),

        getPaymentById: builder.query({
            query: (id) => `/manage/student-payments/${id}`,
        }),

        getAllSubscription: builder.query({
            query: () => "manage/subscriptions?is_active=true",
        }),

        createSubscription: builder.mutation({
            query: (data) => ({
                url: "/manage/subscriptions",
                method: "POST",
                body: data,
            }),
        }),
        
        declineSubscription: builder.mutation({
            query: ({id, data}) => ({
                url: `manage/subscriptions/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        deletePayment: builder.mutation({
            query: (id) => ({
                url: `/manage/student-payments/${id}`,
                method: "DELETE",
            }),
        }),

    }),
});

export const {
    useGetAllPaymentsQuery,
    useGetPaymentByIdQuery,
    useGetAllSubscriptionQuery,
    useDeletePaymentMutation,
    useCreateSubscriptionMutation,
    useDeclineSubscriptionMutation,
} = subscriptionsApi;
