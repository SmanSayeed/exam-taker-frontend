import { apiSlice } from "@/features/api/apiSlice";

export const examTypesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // createSection: builder.mutation({
    //   query: (data) => ({
    //     url: "/questions/sections",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Section"],
    // }),
    getExamTypes: builder.query({
      query: () => "/questions/sections",
    }),
    // deleteSection: builder.mutation({
    //   query: (sectionId) => ({
    //     url: `/questions/section/${sectionId}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const { useGetExamTypesQuery } = examTypesApi;
