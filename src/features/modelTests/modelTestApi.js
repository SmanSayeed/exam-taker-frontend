import { apiSlice } from "@/features/api/apiSlice";

export const modelTestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllModelTests: builder.query({
      query: () => "/model-tests",
      providesTags: ["ModelTests"],
    }),
    getSingleModelTest: builder.query({
      query: (id) => `/model-tests/${id}`,
    }),
    createModelTest: builder.mutation({
      query: (data) => ({
        url: "/model-tests",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ModelTests"],

    // Refetch the list of model tests after creation
    async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      try {
        await queryFulfilled;

        // Manually refetch the model tests list
        dispatch(modelTestApi.util.invalidateTags(["ModelTests"]));
      } catch (err) {
        console.log("Error from createModelTest", err);
      }
    },
    }),
    deleteModelTest: builder.mutation({
      query: (id) => ({
        url: `/model-tests/${id}`,
        method: "DELETE",
      }),
    }),

    editModelTest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/model-tests/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    
    changeModelTestStatus: builder.mutation({
      query: ({id, data}) => ({
        url: `/model-tests/${id}/status`,
        method: "PATCH",
        body: data,
      }),
    }),

    createMTExam: builder.mutation({
      query: ({id, data}) => ({
        url: `exam/create/${id}`,
        method: "POST",
        body: data,
      }),
    }),

    getAllMTExams: builder.query({
      query: (id) => `/model-test-exams/${id}`,
    }),

  }),
});

export const {
    useCreateModelTestMutation,
    useGetSingleModelTestQuery,
    useGetAllModelTestsQuery,
    useDeleteModelTestMutation,
    useChangeModelTestStatusMutation,
    useCreateMTExamMutation,
    useGetAllMTExamsQuery,
    useEditModelTestMutation
} = modelTestApi;