import { apiSlice } from "../api/apiSlice";

export const quotaSubscriptionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getQuotaSubscriptions: builder.query({
        query: ({ verified } = {}) => {
          const queryString = verified !== undefined ? `?verified=${verified}` : "";
          return `manage/exam-quota-subscriptions${queryString}`;
        },
        providesTags: (result) =>
          result?.message
            ? [
                ...result.message.map(({ id }) => ({ type: "QuotaSubscription", id })),
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
    }),
  });
  
  export const {
    useGetQuotaSubscriptionsQuery,
    useVerifyQuotaSubscriptionMutation,
  } = quotaSubscriptionApi;
  