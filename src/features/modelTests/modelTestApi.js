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
    // editModelTest: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/packages/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),

    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled;

    //       dispatch(
    //         savePackage({
    //           id: result.data.data.id,
    //           name: result.data.data.name,
    //           description: result.data.data.description,
    //           duration_days: result.data.data.duration_days,
    //           is_active: result.data.data.is_active,
    //         })
    //       );
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   },
    // }),
    changeModelTestStatus: builder.mutation({
      query: ({id, data}) => ({
        url: `/model-tests/${id}/status`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
    useCreateModelTestMutation,
    useGetSingleModelTestQuery,
    useGetAllModelTestsQuery,
    useDeleteModelTestMutation,
    useChangeModelTestStatusMutation
} = modelTestApi;