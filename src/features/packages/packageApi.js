import { apiSlice } from "@/features/api/apiSlice";

export const packageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => "/packages",
      providesTags: ["Packages"],
    }),
    getSinglePackage: builder.query({
      query: (id) => `/packages/${id}`,
    }),
    createPackage: builder.mutation({
      query: (data) => ({
        url: "/packages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Packages"],

      // Refetch the list of packages after creation
    async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      try {
        await queryFulfilled;

        // Manually refetch the packages list
        dispatch(packageApi.util.invalidateTags(["Packages"]));
      } catch (err) {
        console.log("Error from createModelTest", err);
      }
    },
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
    }),
    editPackage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    changePackageStatus: builder.mutation({
      query: ({id, data}) => ({
        url: `/packages/${id}/status`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
    useGetPackagesQuery,
    useGetSinglePackageQuery,
    useCreatePackageMutation,
    useDeletePackageMutation,
    useEditPackageMutation,
    useChangePackageStatusMutation
} = packageApi;