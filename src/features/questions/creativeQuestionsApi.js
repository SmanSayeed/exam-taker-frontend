import { apiSlice } from "@/features/api/apiSlice";

export const creativeQuestionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCreativeQuestion: builder.mutation({
            query: (data) => ({
                url: "/que/creative",
                method: "POST",
                body: data,
            }),
        }),
        deleteCreativeQuestion: builder.mutation({
            query: (id) => ({
                url: `/que/delete/${id}`,
                method: "DELETE"
            }),
        }),
        editCreativeQuestion: builder.mutation({
            query: ({ id, data }) => ({
                url: `/que/update/creative/${id}`,
                method: "PUT",
                body: data
            }),
        }),
    }),
});

export const {
    useCreateCreativeQuestionMutation,
    useDeleteCreativeQuestionMutation,
    useEditCreativeQuestionMutation
} = creativeQuestionsApi;