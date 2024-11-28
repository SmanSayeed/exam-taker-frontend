import { apiSlice } from "@/features/api/apiSlice";

export const questionsCategoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuestionsCategory: builder.query({
            query: (type) => {
                if (type === "tags") {
                    return `/tags`;
                } else {
                    return `/questions/${type}`;
                }
            },
            providesTags: ["Questions"],
        }),
        getSingleCategory: builder.query({
            query: ({ type, id }) => {
                if (type === "tags") {
                    return `/tags/${id}`;
                } else {
                    return `/questions/${type}/${id}`;
                }
            },
            providesTags: ["Questions"],
        }),
        createQuestionsCategory: builder.mutation({
            query: ({ type, data }) => {
                if (type === "tags") {
                    return {
                        url: `/tags`,
                        method: "POST",
                        body: data,
                    };
                } else {
                    return {
                        url: `/questions/${type}`,
                        method: "POST",
                        body: data,
                    };
                }
            },
            invalidatesTags: ["Questions"],
        }),
        deleteQuestionsCategory: builder.mutation({
            query: ({ type, id }) => {
                if (type === "tags") {
                    return {
                        url: `/tags/${id}`,
                        method: "DELETE",
                    };
                } else {
                    return {
                        url: `/questions/${type}/${id}`,
                        method: "DELETE",
                    };
                }
            },
            invalidatesTags: ["Questions"],
        }),
        editQuestionsCategory: builder.mutation({
            query: ({ type, data, id }) => {
                if (type === "tags") {
                    return {
                        url: `/tags/${id}`,
                        method: "PUT",
                        body: data,
                    };
                } else {
                    return {
                        url: `/questions/${type}/${id}`,
                        method: "PUT",
                        body: data,
                    };
                }
            },
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