import { apiSlice } from "@/features/api/apiSlice";

export const modelTestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getPackages: builder.query({
    //   query: () => "/packages",
    // }),
    createModelTest: builder.mutation({
      query: (data) => ({
        url: "/model-tests",
        method: "POST",
        body: data,
      }),

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
    //       console.log("err from same package ", err);
    //     }
    //   },
    }),
  }),
});

export const {
    useCreateModelTestMutation
} = modelTestApi;