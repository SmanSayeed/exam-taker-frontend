import { apiSlice } from "@/features/api/apiSlice";

export const questionsCategoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuestionsCategory: builder.query({
            query: (type) => `/questions/${type}`,
            providesTags: ["Questions"],
        }),
        getSingleCategory: builder.query({
            query: ({type, id}) => `/questions/${type}/${id}`,
            providesTags: ["Questions"],
        }),
        createQuestionsCategory: builder.mutation({
            query: ({ type, data }) => ({
                url: `/questions/${type}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Questions"],
        }),
        deleteQuestionsCategory: builder.mutation({
            query: ({ type, id }) => ({
                url: `/questions/${type}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Questions"]
        }),
        editQuestionsCategory: builder.mutation({
            query: ({ type, data, id }) => ({
                url: `/questions/${type}/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Questions"],
        }),
    }),
});

export const { 
    useCreateQuestionsCategoryMutation, 
    useGetQuestionsCategoryQuery, 
    useGetSingleCategoryQuery,
    useDeleteQuestionsCategoryMutation,
    useEditQuestionsCategoryMutation 
} = questionsCategoryApi;