import { apiSlice } from "@/features/api/apiSlice";

export const questionsCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuestionsCategory: builder.mutation({
      query: ({ data, questionsCategoryEndPoint }) => ({
        url: `/questions/${questionsCategoryEndPoint}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Section"],
    }),
    get_questionsCategory: builder.query({
      query: (questionsCategoryEndPoint) =>
        `/questions/${questionsCategoryEndPoint}`,
    }),
    delete_questionsCategory: builder.mutation({
      query: ({ sectionId, questionsCategoryEndPoint }) => ({
        url: `/questions/${questionsCategoryEndPoint}/${sectionId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {useCreateQuestionsCategoryMutation , useGet_questionsCategoryQuery, useDelete_questionsCategoryMutation, } = questionsCategoryApi;