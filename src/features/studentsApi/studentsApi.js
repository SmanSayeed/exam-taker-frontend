import { apiSlice } from "@/features/api/apiSlice";

export const studentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (page = 1) => `/students?page=${page}`,
      providesTags: ['Students'],
      transformResponse: (response) => {
        return {
          data: response.data,
          message: response.message,
          status: response.status
        };
      },
    }),

    getSingleStudent: builder.query({
      query: (id) => `/students/${id}`,
      providesTags: (result, error, id) => [{ type: 'Students', id }],
    }),

    createStudent: builder.mutation({
      query: (data) => ({
        url: "/students",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Students'],
    }),

    editStudent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Students'],
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Students'],
    }),

    changeStudentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/students/${id}/status`,
        method: "PATCH",
        body: { active_status: status },
      }),
      invalidatesTags: ['Students'],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetSingleStudentQuery,
  useCreateStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
  useChangeStudentStatusMutation,
} = studentsApi;