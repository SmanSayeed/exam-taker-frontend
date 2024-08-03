import { apiSlice } from "@/features/api/apiSlice";

export const sectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSection: builder.mutation({
      query: (data) => ({
        url: "/questions/sections",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Section"]
    }),
    getSections: builder.query({
      query: () => "/questions/sections",
    }),
  }),
});

export const { useCreateSectionMutation, useGetSectionsQuery } = sectionApi;