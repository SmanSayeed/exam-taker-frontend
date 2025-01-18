import { apiSlice } from "@/features/api/apiSlice";

const formatParams = (params) => {
  const formattedParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        formattedParams.append(`${key}[]`, item);
      });
    } else {
      formattedParams.append(key, value);
    }
  });

  return formattedParams.toString();
};

export const questionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (params) => {
        const queryParams = formatParams(params);  // Use the custom formatting function
        return `que/all?${queryParams}`;
      },
    }),

    getSingleQuestions: builder.query({
      query: (id) => `/que/single/${id}`,
    }),

    createQuestion: builder.mutation({
      query: (data) => {
        return {
          url: "/que/create",
          method: "POST",
          body: data
        };
      },
    }),
    

    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `que/delete-question/${id}`,
        method: "DELETE",
      }),
    }),

    editQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `que/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteMcqOption: builder.mutation({
      query: (id) => ({
        url: `/que/delete-mcq-option/${id}`,
        method: "DELETE",
      }),
    }),

    questionSearch: builder.query({
      query: (data) => ({
        url: "/que/search",
        method: "GET",
        params: data,
      }),
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetQuestionsQuery,
  useDeleteQuestionMutation,
  useEditQuestionMutation,
  useQuestionSearchQuery,
  useDeleteMcqOptionMutation,
  useGetSingleQuestionsQuery,
} = questionsApi;