import { apiSlice } from "@/features/api/apiSlice";

export const modelTestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllModelTests: builder.query({
      query: () => "/model-tests",
      providesTags: ["ModelTests"],
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
  }),
});

export const {
    useCreateModelTestMutation,
    useGetAllModelTestsQuery
} = modelTestApi;