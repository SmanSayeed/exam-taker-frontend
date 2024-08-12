import { apiSlice } from "@/features/api/apiSlice";

export const mcqQuestionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMcqOption: builder.mutation({
            query: (data) => ({
                url: "/que/mcq",
                method: "POST",
                body: data,
            }),
        }),
        deleteMcqOption: builder.mutation({
            query: (id) => ({
                url: `/que/delete/${id}`,
                method: "DELETE"
            }),
        }),
    }),
});

export const { useCreateMcqOptionMutation, useDeleteMcqOptionMutation } = mcqQuestionsApi;