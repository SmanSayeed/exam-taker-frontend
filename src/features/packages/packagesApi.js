import { apiSlice } from "@/features/api/apiSlice";
import { savePackage } from "./packageSlice";

export const packageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => `/packages`
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

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            savePackage({
              name: result.data.data.name,
              description: result.data.data.description,
              duration_days: result.data.data.duration_days,
              is_active: result.data.data.is_active,
              price: result.data.data.price,
              category: {
                section_id: result.data.data.category.section_id,
                exam_type_id: result.data.data.category.exam_type_id,
                exam_sub_type_id: result.data.data.category.exam_sub_type_id,
              },
            })
          );
        } catch (err) {
          console.log("err from same package ", err);
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

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            savePackage({
              id: result.data.data.id,
              name: result.data.data.name,
              description: result.data.data.description,
              duration_days: result.data.data.duration_days,
              is_active: result.data.data.is_active,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
    useGetPackagesQuery,
    useGetSinglePackageQuery,
    useCreatePackageMutation,
    useDeletePackageMutation,
    useEditPackageMutation
} = packageApi;