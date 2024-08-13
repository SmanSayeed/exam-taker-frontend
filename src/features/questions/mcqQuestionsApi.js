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
        editMcqOption: builder.mutation({
            query: ({ id, data }) => ({
                url: `/que/update/mcq/${id}`,
                method: "PUT",
                body: data
            }),
        }),
    }),
});

export const { useCreateMcqOptionMutation, useDeleteMcqOptionMutation, useEditMcqOptionMutation } = mcqQuestionsApi;