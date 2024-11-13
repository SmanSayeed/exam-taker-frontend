import { apiSlice } from "@/features/api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => "/admins",
    }),
    getSingleAdmin: builder.query({
      query: (id) => `/admins/${id}`,
    }),
    editAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admins/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
      }),
    }),
    toggleAdminStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admins/${id}/status`,
        method: "PATCH",
        body: { active_status: status },
      }),
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useGetSingleAdminQuery,
  useEditAdminMutation,
  useDeleteAdminMutation,
  useToggleAdminStatusMutation,
} = adminApi;
