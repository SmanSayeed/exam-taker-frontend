import { apiSlice } from "@/features/api/apiSlice";

export const sectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSection: builder.mutation({
      query: (data) => ({
        url: "/questions/sections",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateSectionMutation } = sectionApi;