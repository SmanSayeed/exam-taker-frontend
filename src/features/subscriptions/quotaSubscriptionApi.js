import { apiSlice } from "../api/apiSlice";

export const quotaSubscriptionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuotaSubscriptions: builder.query({
      query: ({ verified } = {}) => {
        const queryString =
          verified !== undefined ? `?verified=${verified}` : "";
        return `manage/exam-quota-subscriptions${queryString}`;
      },
      providesTags: (result) =>
        result?.message
          ? [
              ...result.message.map(({ id }) => ({
                type: "QuotaSubscription",
                id,
              })),
              { type: "QuotaSubscription", id: "LIST" },
            ]
          : [{ type: "QuotaSubscription", id: "LIST" }],
    }),
    verifyQuotaSubscription: builder.mutation({
      query: (id) => ({
        url: `manage/exam-quota-subscriptions/${id}/verify`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "QuotaSubscription", id: "LIST" }],
    }),
    // New endpoint for updating quota
    updateQuota: builder.mutation({
      query: ({ id, data }) => ({
        url: `manage/${id}/update-quota`, // The endpoint URL
        method: "PUT", // Or use PUT if it's meant to replace existing quota data
        body: data, // The updated quota data sent in the request body
      }),
      // Optionally invalidate or refetch tags to ensure the cache is updated
      invalidatesTags: [{ type: "QuotaSubscription", id: "LIST" }],
    }),
  }),
});

export const {
  useGetQuotaSubscriptionsQuery,
  useVerifyQuotaSubscriptionMutation,
  useUpdateQuotaMutation,
} = quotaSubscriptionApi;
